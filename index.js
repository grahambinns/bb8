var Cylon = require('cylon');

Cylon.robot({
    connections: {
        bluetooth: {
            adaptor: 'central',
            uuid: '4035611a8e9f44d8bb391947776895be',
            module: 'cylon-ble'
        }
    },

    devices: {
        ollie: {
            driver: 'ollie'
        },
    },

    display: function(err, data) {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log("Data: ", data);
        }
    },

    work: function(my) {
        my.ollie.wake(function(err, data) {
            console.log("wake");

            after(200, function() {
                console.log("Colour -> 0x00FFFF");
                my.ollie.setRGB(0x00FFFF);

                after(500, function() {
                    console.log("Colour -> 0x0000FF");
                    my.ollie.setRGB(0x0000FF);

                    after(500, function() {
                        console.log("Colour -> 0xFF0000");
                        my.ollie.setRGB(0xFF0000);
                    });
                });

                after(200, function() {
                    console.log("Raw motor");
                    //my.ollie.setRawMotorValues(2, 100, 2, 100);

                    after(1000, function() {
                        my.ollie.setStabilization(2);
                    });
                });
            });
        });
    }
}).start();
