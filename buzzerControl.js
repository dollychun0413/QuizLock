const { exec } = require("child_process");

// turn on the buzzer
function buzzerOn()
{
    exec("echo 1 > /sys/class/leds/usr_buzzer/brightness"); // Permission changed in udev rules
}

// turn off the buzzer
function buzzerOff()
{
    exec("echo 0 > /sys/class/leds/usr_buzzer/brightness"); // Permission changed in udev rules
}

// turn on and off the buzzer
function okBuzzer(sec)
{
    buzzerOn();
    // sec秒後に停止
    setTimeout(function() {
        buzzerOff();
    }, sec * 1000);
}

// NG音を鳴らす
function ngBuzzer()
{
    buzzerOn();
    buzzerOff();
}