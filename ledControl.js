// const { exec2 } = require("child_process");

// turn on the STA LED -RED-
function staRedLedOn()
{
    exec("echo 255 > /sys/class/leds/usr_led1/brightness"); // Permission changed in udev rules
}

// turn off the STA LED -RED-
function staRedLedOff()
{
    exec("echo 0 > /sys/class/leds/usr_led1/brightness"); // Permission changed in udev rules
}

// turn on the STA LED -GREEN-
function staGreenLedOn()
{
    exec("echo 255 > /sys/class/leds/usr_led2/brightness"); // Permission changed in udev rules
}

// turn off the STA LED -RED-
function staGreenLedOff()
{
    exec("echo 0 > /sys/class/leds/usr_led2/brightness"); // Permission changed in udev rules
}

// turn on and off the STA LED -RED-
function staRedLed(sec)
{
    staRedLedOn();
    // sec秒後に停止
    setTimeout(function() {
        staRedLedOff();
    }, sec * 1000);
}

// turn on and off the STA LED -GREEN-
function staGreenLed(sec)
{
    staGreenLedOn();
    // sec秒後に停止
    setTimeout(function() {
        staGreenLedOff();
    }, sec * 1000);
}
