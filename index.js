var client=require('scp2');
var fs = require('fs');
var DIRECTORY_DESTINY = './tmp';


function createFileDirectoryIfNotExists() {
    if (!fs.existsSync(DIRECTORY_DESTINY)){
        fs.mkdirSync(DIRECTORY_DESTINY);
    }
}

function getAirtameManagerJson(callback) {

    createFileDirectoryIfNotExists();
    client.scp( {
        host: '169.254.13.37',
        username: 'root',
        password: '1234',
        path: '/etc/airtame-manager.json'
    }, DIRECTORY_DESTINY+"/airtame-manager.json", function(err) {
        client.close();
        if (err!=null) {
            console.log('Error recovering file!' +err);
        } else {
            callback();
        }
    });


}

getAirtameManagerJson(function() {

    console.log('done!');
    process.exit(0);
});
