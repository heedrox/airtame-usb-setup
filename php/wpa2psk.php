<?
/** Code from /opt/airtame-web/www/bin/save_settings.php (c) AIRTAME **/
function wpa2psk($ssid, $password)
{
        $output="";
        for ($i=1; $i<=2; $i++) {
                $last = $ssid.pack("N", $i);
                $last = $xorsum = hash_hmac("sha1", $last, $password, true);
                for ($j=1; $j<4096; $j++) {
                        $xorsum ^= ($last = hash_hmac("sha1", $last, $password, true));
                }
                $output .= $xorsum;
        }
        return bin2hex(substr($output, 0, 32));
}

echo wpa2psk($argv[1], $argv[2]);
