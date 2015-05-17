# airtame-usb-setup #

Setup your AIRTAME wifi properties through the USB connection.

Only for linux (dependencies on iwconfig).

**Use this under your own responsability**

## Installation

1. Download files into a folder of your computer
2. Make sure you have nodejs installed
3. Make sure you have php installed (sorry for that)

## Usage

 - Plug Airtame to your USB. This will create a wired connection in which your Airtame can be reached through 169.254.13.37 IP.
 - Make sure you are connected to the WIFI you want the Airtame connect to.
 - Execute:
 
```
node . WIFI_INTERFACE WIFI_PASS
```

Example:

```
node . wlan0 mywifipassword
```

This will write your wifi settings to Airtame.

 - Unplug the Airtame and connect it to any TV in which the network connection is reachable.
 - Voila!

## Why PHP
There is a wpa2psk function that airtame uses that I was too lazy to decode and rewrite to nodejs. Go ahead if you want to.

## Warning
This comes with no warranty. If you break the airtame doing this, sorry for that, but don't blame me.

As AIRTAME software is still in development, probably this software will stop working in the future.

**Do this under your own responsability.**
