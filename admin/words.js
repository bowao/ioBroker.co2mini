/*global systemDictionary:true */
'use strict';

systemDictionary = {
    'airco2ntrol adapter settings': {
        'en': 'Adapter settings for Co2mini',
        'de': 'Adaptereinstellungen für Co2mini',
        'ru': 'Настройки адаптера для Co2mini',
        'pt': 'Configurações do adaptador para Co2mini',
        'nl': 'Adapterinstellingen voor Co2mini',
        'fr': "Paramètres d'adaptateur pour C02mini",
        'it': "Impostazioni dell'adattatore per Co2mini",
        'es': 'Ajustes del adaptador para Co2mini',
        'pl': 'Ustawienia adaptera dla Co2mini',
        'zh-cn': 'Co2mini的适配器设置'
    },
    "usb": {
        "en": "Co2mini connected directly via USB",
        "de": "Co2mini direkt über usb angeschlossen",
        "ru": "Co2mini подключен напрямую через USB",
        "pt": "Co2mini conectado diretamente via USB",
        "nl": "Co2mini rechtstreeks aangesloten via USB",
        "fr": "Co2mini connecté directement via USB",
        "it": "Co2mini collegato direttamente tramite USB",
        "es": "Co2mini conectado directamente a través de USB",
        "pl": "Co2mini podłączony bezpośrednio przez USB",
        "zh-cn": "通过USB直接连接Co2mini"
    },
    "server": {
        "en": "Co2mini connected via udp-client",
        "de": "Co2mini über udp-client verbunden",
        "ru": "Co2mini подключается через udp-клиент",
        "pt": "Co2mini conectado via udp-client",
        "nl": "Co2mini verbonden via udp-client",
        "fr": "Co2mini connecté via udp-client",
        "it": "Co2mini collegato tramite udp-client",
        "es": "Co2mini conectado a través de udp-client",
        "pl": "Co2mini połączone za pośrednictwem klienta udp",
        "zh-cn": "通过udp客户端连接的Co2mini"
    },
    "ip": {
        "en": "IP address of the iobroker server to which the udp server should listen (default: 0.0.0.0 = all available)",
        "de": "IP-Adresse des iobroker-Servers, den der udp-Server abhören soll (Standard: 0.0.0.0 = alle verfügbaren)",
        "ru": "IP-адрес сервера iobroker, который должен прослушивать сервер udp (по умолчанию: 0.0.0.0 = все доступно)",
        "pt": "Endereço IP do servidor iobroker no qual o servidor udp deve escutar (padrão: 0.0.0.0 = todos disponíveis)",
        "nl": "IP-adres van de iobroker-server waarnaar de udp-server moet luisteren (standaard: 0.0.0.0 = alles beschikbaar)",
        "fr": "Adresse IP du serveur iobroker à laquelle le serveur udp doit écouter (par défaut: 0.0.0.0 = tous disponibles)",
        "it": "Indirizzo IP del server iobroker su cui dovrebbe ascoltare il server udp (impostazione predefinita: 0.0.0.0 = tutti disponibili)",
        "es": "Dirección IP del servidor iobroker al que debe escuchar el servidor udp (predeterminado: 0.0.0.0 = todo disponible)",
        "pl": "Adres IP serwera iobroker, na który powinien nasłuchiwać serwer udp (domyślnie: 0.0.0.0 = wszystkie dostępne)",
        "zh-cn": "udp服务器应侦听的iobroker服务器的IP地址（默认值：0.0.0.0 =全部可用）"
    },
    "port": {
        "en": "Udp-port to which the udp server should listen (default: 33333)",
        "de": "Udp-port auf den der udp server lauschen soll (Standard: 33333)",
        "ru": "UDP-порт, который должен прослушивать UDP-сервер (по умолчанию: 33333)",
        "pt": "Porta UDP na qual o servidor UDP deve escutar (padrão: 33333)",
        "nl": "UDP-poort waarnaar de UDP-server moet luisteren (standaard: 33333)",
        "fr": "Udp-port auquel le serveur udp doit écouter (par défaut: 33333)",
        "it": "Porta Udp su cui dovrebbe ascoltare il server udp (impostazione predefinita: 33333)",
        "es": "Puerto udp al que debe escuchar el servidor udp (predeterminado: 33333)",
        "pl": "Port Udp, do którego powinien nasłuchiwać serwer Udp (domyślnie: 33333)",
        "zh-cn": "udp服务器应侦听的udp端口（默认值：33333）"
    },
    "note": {
        "en": "If the sensor is connected directly to the iobroker-server via USB, the user iobroker must have the rights to access the USB device. For more information see README.md",
        "de": "Wenn der Sensor über USB direkt mit dem iobroker-Server verbunden ist, muss der Benutzer iobroker die Rechte haben, auf das USB-Gerät zuzugreifen. Weitere Informationen finden Sie in README.md",
        "ru": "Если датчик подключен напрямую к iobroker-серверу через USB, пользователь iobroker должен иметь права на доступ к USB-устройству. Для получения дополнительной информации см. README.md",
        "pt": "Se o sensor estiver conectado diretamente ao iobroker-server via USB, o usuário iobroker deverá ter os direitos para acessar o dispositivo USB. Para mais informações, consulte README.md",
        "nl": "Als de sensor via USB rechtstreeks op de iobroker-server is aangesloten, moet de gebruiker iobroker de rechten hebben om toegang te krijgen tot het USB-apparaat. Zie README.md voor meer informatie",
        "fr": "Si le capteur est connecté directement au serveur iobroker via USB, l'utilisateur iobroker doit disposer des droits pour accéder au périphérique USB. Pour plus d'informations, consultez le fichier README.md.",
        "it": "Se il sensore è collegato direttamente al server iobroker tramite USB, l'utente iobroker deve disporre dei diritti per accedere al dispositivo USB. Per ulteriori informazioni, consultare README.md",
        "es": "Si el sensor está conectado directamente al servidor iobroker a través de USB, el usuario iobroker debe tener los derechos para acceder al dispositivo USB. Para más información ver README.md",
        "pl": "Jeśli czujnik jest podłączony bezpośrednio do serwera iobroker przez USB, użytkownik iobroker musi mieć prawa dostępu do urządzenia USB. Aby uzyskać więcej informacji, zobacz README.md",
        "zh-cn": "如果传感器通过USB直接连接到iobroker-server，则iobroker用户必须有权访问USB设备。有关更多信息，请参见README.md"
    }
};
