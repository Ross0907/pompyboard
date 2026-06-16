#![allow(static_mut_refs)]
#![no_main]
#![no_std]

use defmt_rtt as _;
// See https://defmt.ferrous-systems.com/global-logger for more information
use panic_probe as _; // Print panic message to probe console
use stm32f4xx_hal::{
    adc::{Adc, config::AdcConfig},
    otg_fs::USB,
    pac::Peripherals,
    prelude::*,
};

mod sensor;
mod tablet;
mod usb;

#[cortex_m_rt::entry]
fn main() -> ! {
    let dp = Peripherals::take().unwrap(); // device peripheral
    let rcc = dp.RCC.constrain();
    let clocks = rcc
        .cfgr
        .sysclk(48.MHz())
        .pclk1(24.MHz())
        .require_pll48clk()
        .freeze();

    let gpioa = dp.GPIOA.split();
    let gpioc = dp.GPIOC.split();
    let gpioe = dp.GPIOE.split();
    let gpiof = dp.GPIOF.split();

    let mut sensor = sensor::Sensor::new(
        Adc::adc2(dp.ADC2, true, AdcConfig::default()),
        Adc::adc3(dp.ADC3, true, AdcConfig::default()),
        gpioe.pe6.into_push_pull_output(),
        gpioe.pe5.into_push_pull_output(),
        gpioe.pe4.into_push_pull_output(),
        gpioe.pe3.into_push_pull_output(),
        gpiof.pf3.into_analog(),
        gpiof.pf4.into_analog(),
        gpiof.pf5.into_analog(),
        gpiof.pf6.into_analog(),
        gpiof.pf7.into_analog(),
        gpiof.pf8.into_analog(),
        gpiof.pf9.into_analog(),
        gpiof.pf10.into_analog(),
        gpioc.pc1.into_analog(),
        gpioc.pc2.into_analog(),
        gpioc.pc3.into_analog(),
        gpioa.pa1.into_analog(),
        gpioa.pa2.into_analog(),
        gpioa.pa3.into_analog(),
        gpioa.pa4.into_analog(),
        gpioa.pa6.into_analog(),
        gpioa.pa7.into_analog(),
        gpioc.pc4.into_analog(),
        gpioc.pc5.into_analog(),
    );

    usb::setup(USB {
        usb_global: dp.OTG_FS_GLOBAL,
        usb_device: dp.OTG_FS_DEVICE,
        usb_pwrclk: dp.OTG_FS_PWRCLK,
        pin_dm: gpioa.pa11.into(),
        pin_dp: gpioa.pa12.into(),
        hclk: clocks.hclk(),
    });

    let mut report = tablet::Report::default();

    // let button_pin = gpioe.pe2.into_pull_up_input();

    loop {
        let (x, y) = sensor.scan();
        report.x = x;
        report.y = y;

        usb::poll();
        usb::push(report).ok().unwrap_or(0);
    }
}
