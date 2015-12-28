var Cylon = require('cylon');

var colour = 0x000000,
    colourChange = 0xFF;

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

            every(5000, function() {
                colour = colour + colourChange;
                console.log("Changing colour to: " + colour);
                my.ollie.setRGB(colour);
            });

            after(200, function() {
                console.log("Rolling...");
                my.ollie.roll(128, 270, 1, this.display);

                after(2000, function() {
                    console.log("Stopping...");
                    my.ollie.stop();

                    after(200, function() {
                        my.ollie.roll(128, 0, 1, this.display);
                        after(2000, my.ollie.stop);

                        after(200, function() {
                            my.ollie.roll(128, 90, 1, this.display);
                            after(2000, my.ollie.stop);

                            after(200, function() {
                                my.ollie.roll(128, 360, 1, this.display);
                                after(2000, my.ollie.stop);
                            });
                        });
                    });
                });
            });
        });
    }
}).start();
