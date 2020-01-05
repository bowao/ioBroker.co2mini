#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Based on code by Hendryk Ploetz
# https://hackaday.io/project/5301-reverse-engineering-a-low-cost-usb-co-monitor/log/17909-all-your-base-are-belong-to-us
#
# The user who starts this udp-client must have write permission to the hidraw device node.
# Unfortunately by default only root has this permission. So you must add a udev-rule like :
#
# SUBSYSTEMS=="usb", KERNEL=="hidraw*", ATTRS{idVendor}=="04d9", ATTRS{idProduct}=="a052", GROUP="plugdev", SYMLINK+="co2mini"
#


import sys, fcntl, time
import socket
import os.path

if len(sys.argv) > 1:
    if sys.argv[1] == "--config":
        config = True
    else:
        print "\n" + sys.argv[1], " --->" + "	is not a valid argument\n\nValid Arguments:\n--config          reconfigure IP-Address and Port\n"
        sys.exit()
else:
    config = False

if os.path.isfile("co2mini_udp-client.conf") == False or config == True:
    f = open("co2mini_udp-client.conf","w+")
    iobroker_ip_address = raw_input("Enter the ioBroker IP-Address: ")
    f.write(iobroker_ip_address)
    f.write(":")
    iobroker_adapter_port = input("Enter the ioBroker Adapter Port: ")
    f.write(str(iobroker_adapter_port))
    f.close()
else:
    f = open("co2mini_udp-client.conf","r")
    if f.mode == 'r':
        iobroker_conf = f.read()
        iobroker_ip_address = iobroker_conf.split(':')[0]
        iobroker_adapter_port = int(iobroker_conf.split(':')[1])
        f.close()

co2_device_path = "/dev/co2mini"

# Open UDP-Socket
addr = (iobroker_ip_address, iobroker_adapter_port)
UDPSock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
print "Open UDP-Socket to", iobroker_ip_address, "on port", iobroker_adapter_port

co2Old = ''
tempOld = ''

def decrypt(key,  data):
    cstate = [0x48,  0x74,  0x65,  0x6D,  0x70,  0x39,  0x39,  0x65]
    shuffle = [2, 4, 0, 7, 1, 6, 5, 3]

    phase1 = [0] * 8
    for i, o in enumerate(shuffle):
        phase1[o] = data[i]

    phase2 = [0] * 8
    for i in range(8):
        phase2[i] = phase1[i] ^ key[i]

    phase3 = [0] * 8
    for i in range(8):
        phase3[i] = ( (phase2[i] >> 3) | (phase2[ (i-1+8)%8 ] << 5) ) & 0xff

    ctmp = [0] * 8
    for i in range(8):
        ctmp[i] = ( (cstate[i] >> 4) | (cstate[i]<<4) ) & 0xff

    out = [0] * 8
    for i in range(8):
        out[i] = (0x100 + phase3[i] - ctmp[i]) & 0xff

    return out

def hd(d):
    return " ".join("%02X" % e for e in d)


if __name__ == "__main__":
    # Key retrieved from /dev/random, guaranteed to be random ;)
    key = [0xc4, 0xc6, 0xc0, 0x92, 0x40, 0x23, 0xdc, 0x96]

    fp = open(co2_device_path, "a+b",  0)

    HIDIOCSFEATURE_9 = 0xC0094806
    set_report = "\x00" + "".join(chr(e) for e in key)
    fcntl.ioctl(fp, HIDIOCSFEATURE_9, set_report)

    values = {}

    while True:
        data = list(ord(e) for e in fp.read(8))
        decrypted = decrypt(key, data)
        if decrypted[4] != 0x0d or (sum(decrypted[:3]) & 0xff) != decrypted[3]:
            print hd(data), " => ", hd(decrypted),  "Checksum error"
        else:
            op = decrypted[0]
            val = decrypted[1] << 8 | decrypted[2]

            values[op] = val

            ## From http://www.co2meters.com/Documentation/AppNotes/AN135-CO2mini-usb-protocol.pdf
            if 0x50 in values:
                co2New = values[0x50]
                if co2New != co2Old:
                    co2Old = co2New
                    co2 = "CO2=%i" % values[0x50]
                    UDPSock.sendto(co2, addr)
                    print co2
            if 0x42 in values:
                tempNew = values[0x42]
                if tempNew != tempOld:
                    tempOld = tempNew
                    temp = "T=%.2f" % (values[0x42]/16.0-273.15)
                    UDPSock.sendto(temp, addr)
                    print temp
