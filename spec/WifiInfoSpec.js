var wifiInfo=require("../lib/WifiInfo");

describe("WifiInfo is a library to get the frequency and the SSID of your wifi", function() {
   it("must be able to parse correctly information of the iwconfig command", function() {
       var content='wlan0     IEEE 802.11abgn  ESSID:"AirPort TC GSR" \r\n\
       Mode:Managed  Frequency:2.437 GHz  Access Point: CC:C0:CF:C5:CA:C4 \r\n\
       Bit Rate=65 Mb/s   Tx-Power=15 dBm \r\n\
       Retry short limit:7   RTS thr:off   Fragment thr:off\r\n\
       Encryption key:off\r\n\
       Power Management:on\r\n\
       Link Quality=57/70  Signal level=-53 dBm\r\n\
       Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0\r\n\
       Tx excessive retries:0  Invalid misc:661   Missed beacon:0\r\n\
       ';
       var data=wifiInfo._parseData(content);
       expect(data.network).toBe("AirPort TC GSR");
       expect(data.frequency).toBe("2437");
   });
});
