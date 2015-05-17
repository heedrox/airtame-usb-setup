var client=require('scp2');
var fs = require('fs');
var wifiInfo=require("./lib/WifiInfo");
var AirtameNetworkPasswordSaver=require("./lib/AirtameNetworkPasswordSaver.js");

var DIRECTORY_DESTINY = './tmp';
var AIRTAME_CONSTANTS = {
    HOST : '169.254.13.37',
    USERNAME : 'root',
    PASSWORD : '1234',
    PATH : '/etc/airtame-manager.json'
};
var ARG_WIFI_INTERFACE=null;
var ARG_WIFI_PASSWORD=null;

function createFileDirectoryIfNotExists() {
    if (!fs.existsSync(DIRECTORY_DESTINY)){
        fs.mkdirSync(DIRECTORY_DESTINY);
    }
}

function getAirtameManagerJsonFile(callback) {

    createFileDirectoryIfNotExists();

    var destinyFile=DIRECTORY_DESTINY+"/airtame-manager.json";

    client.scp( {
        host: AIRTAME_CONSTANTS.HOST,
        username: AIRTAME_CONSTANTS.USERNAME,
        password: AIRTAME_CONSTANTS.PASSWORD,
        path: AIRTAME_CONSTANTS.PATH
    }, destinyFile , function(err) {
        client.close();
        if (err) {
            console.log('Error recovering file!' +err);
            process.exit(1);
        } else {
            callback(destinyFile);
        }
    });


}

function getAirtameManagerJsonObject(filename, callback) {
    console.info("Reading file: "+filename);
    fs.readFile(filename, 'utf8', function (err,data) {
        if (err) {
            console.log('Error!');
            console.log(err);
            callback(null);
        }
        callback(JSON.parse(data));
    });

}

function updateAirtameManagerJsonObject(originalJson, networkObject, encryptedPassword) {
    /* "networks": [
     {
     "network": "AirPort TC GSR",
     "freq": "2437",
     "password": "dbfd52a7d5fd02543d3826735ff5572db37807ee4847ac89f03256347ebaeaa0",
     "priority": 1
     }
     ],
     */
    originalJson.networks=[ {
        network: networkObject.network,
        freq: networkObject.frequency,
        password: encryptedPassword,
        priority:1
    } ];
    return originalJson;
}

function saveAirtameManagerJsonFile(json, callback) {
    fs.writeFile(DIRECTORY_DESTINY+"/airtame-manager-out.json", JSON.stringify(json,null,4), function(err) {
        if (err) {
            console.log("ERROR WRTITING FILE: "+err);
            process.exit(1);
        }
        callback();
    });

}

function uploadAirtameManagerJsonFile(callback) {
    client.scp(DIRECTORY_DESTINY+"/airtame-manager-out.json", AIRTAME_CONSTANTS.USERNAME+':'+AIRTAME_CONSTANTS.PASSWORD+'@'+AIRTAME_CONSTANTS.HOST+':'+AIRTAME_CONSTANTS.PATH , function(err) {
        if (err) {
            console.log("Cannout upload file to airtame!");
            process.exit(1);
        }
        callback();
    })
}

function parseArguments() {
    ARG_WIFI_INTERFACE=process.argv[2];
    ARG_WIFI_PASSWORD=process.argv[3];
    console.log("Argument for WIFI INTERFACE: "+ARG_WIFI_INTERFACE);
    console.log("Argument for WIFI PASSWORD: "+ARG_WIFI_PASSWORD);
    if (!ARG_WIFI_INTERFACE || !ARG_WIFI_PASSWORD) {
        process.stdout.write("Usage: node . WIFI_INTERFACE WIFI_PASSWORD\n");
        process.exit(1);
    }
}

parseArguments();
getAirtameManagerJsonFile(function(destinyFile) {
    getAirtameManagerJsonObject(destinyFile, function(airtameJson) {
        if (airtameJson!=null) {
            console.log(airtameJson.networks);
            wifiInfo.get(ARG_WIFI_INTERFACE, function(network) {
                AirtameNetworkPasswordSaver.getPassword(network.network, ARG_WIFI_PASSWORD, function(encryptedPassword) {
                    var json=updateAirtameManagerJsonObject(airtameJson, network, encryptedPassword);
                    saveAirtameManagerJsonFile(json, function() {
                        uploadAirtameManagerJsonFile(function() {
                            console.log("Everything done! <3")
                            process.exit(0);
                        });
                    });
                });
            });



        }
    });
});
