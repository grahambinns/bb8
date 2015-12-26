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
        }
    },

    work: function(my) {
        my.ollie.wake(function(err, data) {
            console.log("wake");

            after(200, function() {
                my.ollie.setRGB(0x00FFFF);
            });

            after(500, function() {
                my.ollie.setRGB(0xFF0000);
                my.ollie.roll(60, 0, 1);

                after(10000, function() {
                    my.ollie.roll(60, 180, 1);

                    after(1000, function() {
                        my.ollie.stop();
                    });
                });
            });
        });
    }
}).start();
