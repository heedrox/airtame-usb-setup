
var WifiInfo =  { } ;

WifiInfo._parseData = function(content) {
    var lines = content.split(/\r\n|\r|\n/);

    lines.forEach(function(line) {
        if (line.indexOf('ESSID') !== -1) {
            networkAddress = line.match(/ESSID:(.*)/)[1] || null;
            networkAddress =networkAddress.trim().replace(/^\"/,'');
            networkAddress =networkAddress.trim().replace(/\"$/,'');
        }
        if (line.indexOf("Frequency:") !== -1) {
            frequency=line.match(/Frequency:([0-9\\.]*) G/)[1] || null;
            frequency=frequency.replace(".","");
            frequency=frequency.replace(",","");
        }
    });

    return { network: networkAddress, frequency: frequency};
};

WifiInfo.get = function(interface, callback){
    var exec = require('child_process').exec;
    var command="sudo iwconfig "+interface;
    exec(command, function(err, stdout, stderr) {
        if (err) {
            console.log("Error getting wireless devices information => "+stderr);
            callback(null);
        }

        var networkInfo=WifiInfo._parseData(stdout.toString());
        callback(networkInfo);
    });
};

module.exports = WifiInfo;