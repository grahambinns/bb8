var Cylon = require('cylon');

var colour = 0x000000,
    colourChange = 0xFF;

function drawASquare(bb8, heading, callback) {
    if (heading === 360) {
        // We're done.
        console.log("Square finished.");
        if (callback) {
            console.log("Calling callback " + callback);
            callback(bb8);
        }
        return;
    } else if (!heading) {
        heading = 0;
    }

    console.log("Rolling 2000ms at heading " + heading);
    bb8.roll(128, heading, 1);
    after(2000, function () {
        console.log("Stopping");
        bb8.stop(function() {
            console.log("Recursing");
            drawASquare(bb8, heading + 90);
        });
    });
}

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

            drawASquare(my.ollie);
        });
    }
}).start();
