function L () {
    pins.analogWritePin(PWM_1, PWM * 0.5)
    pins.analogWritePin(PWM_2, PWM)
}
function Gohead () {
    pins.analogWritePin(PWM_1, PWM)
    pins.analogWritePin(PWM_2, PWM)
}
function InitTurning () {
    pins.analogSetPeriod(AnalogPin.P13, 20000)
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.analogSetPeriod(AnalogPin.P15, 20000)
    pins.digitalWritePin(DigitalPin.P16, 0)
    PWM_1 = DigitalPin.P13
    PWM_2 = DigitalPin.P15
}
function R2 () {
    pins.analogWritePin(PWM_1, PWM)
    pins.analogWritePin(PWM_2, 0)
}
function L2 () {
    pins.analogWritePin(PWM_1, PWM * 0.4)
    pins.analogWritePin(PWM_2, PWM)
}
function R () {
    pins.analogWritePin(PWM_1, PWM)
    pins.analogWritePin(PWM_2, PWM * 0.5)
}
function Goback () {
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.analogSetPeriod(AnalogPin.P14, 20000)
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.analogSetPeriod(AnalogPin.P16, 20000)
    PWM_1 = DigitalPin.P14
    PWM_2 = DigitalPin.P16
    pins.analogWritePin(PWM_1, PWM)
    pins.analogWritePin(PWM_2, PWM)
}
let V1 = 0
let ADC1 = 0
let LDls = 0
let Dls = 0
let V0 = 0
let ADC0 = 0
let PWM_2 = 0
let PWM_1 = 0
let PWM = 0
InitTurning()
PWM = 512
basic.forever(function () {
    ADC0 = pins.analogReadPin(AnalogPin.P0)
    V0 = 350 * ADC0 / 1023
    Dls = V0 * 3 / 2
})
basic.forever(function () {
    if (LDls > 30) {
        L2()
    } else if (LDls <= 10 && Dls > 20) {
        R()
    } else if (Dls > 20) {
        Gohead()
    } else {
        R2()
    }
})
basic.forever(function () {
    ADC1 = pins.analogReadPin(AnalogReadWritePin.P1)
    V1 = 350 * ADC1 / 1023
    LDls = V1 * 3 / 2
})
