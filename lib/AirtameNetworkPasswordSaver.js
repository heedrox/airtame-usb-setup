
var AirtameNetworkPasswordSaver =  { } ;

AirtameNetworkPasswordSaver.getPassword = function(ssid, password, callback) {
    var exec = require('child_process').exec;
    var command="php php/wpa2psk.php \""+ssid+"\" \""+password+"\"";
    exec(command, function(err, stdout, stderr) {
        if (err) {
            console.log("Error getting password with wpa2psk.php (do you have php installed?) => "+stderr);
            callback(null);
        }

        callback(stdout);
    });

};

module.exports = AirtameNetworkPasswordSaver;