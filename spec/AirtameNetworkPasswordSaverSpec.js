var wifiInfo=require("../lib/AirtameNetworkPasswordSaver");

describe("AirtameNetworkPasswordSaver is a library to get the encrypted string in which Airtame saves the network password", function() {
   it("must be able to encrypt the password based on SSID and PASSWORD", function(done) {
       var data=wifiInfo.getPassword("AirPort TC GSR", "123456789", function(result) {
           expect(result).toBe("c2784e0fcbc0a5d9e71eb5199ff9c61dacc7b5061efd30d46ec6e0f6b4daca41");
           done();
       });
   });
});
