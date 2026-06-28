import type { ChipProps } from "@tscircuit/props"

// See Table 10, STM32F427xx and STM32F429xx pin and ball definitions of the datasheet (page 53).
// STM32F429IGT6 uses LQFP176 packaging.
const pinLabels = {
    pin1: ["PE2"],
    pin2: ["PE3"],
    pin3: ["PE4"],
    pin4: ["PE5"],
    pin5: ["PE6"],
    pin6: ["VBAT"],
    pin7: ["PI8"],
    pin8: ["PC13"],
    pin9: ["PC14", "OSC32_IN"],
    pin10: ["PC15", "OSC32_OUT"],
    pin11: ["PI9"],
    pin12: ["PI10"],
    pin13: ["PI11"],
    pin14: ["VSS"],
    pin15: ["VDD"],
    pin16: ["PF0"],
    pin17: ["PF1"],
    pin18: ["PF2"],
    pin19: ["PF3"],
    pin20: ["PF4"],
    pin21: ["PF5"],
    pin22: ["VSS"],
    pin23: ["VDD"],
    pin24: ["PF6"],
    pin25: ["PF7"],
    pin26: ["PF8"],
    pin27: ["PF9"],
    pin28: ["PF10"],
    pin29: ["PH0", "OSC_IN"],
    pin30: ["PH1", "OSC_OUT"],
    pin31: ["NRST"],
    pin32: ["PC0"],
    pin33: ["PC1"],
    pin34: ["PC2"],
    pin35: ["PC3"],
    pin36: ["VDD"],
    pin37: ["VSSA"],
    pin38: ["VREFpos"],
    pin39: ["VDDA"],
    pin40: ["PA0", "WKUP"],
    pin41: ["PA1"],
    pin42: ["PA2"],
    pin43: ["PH2"],
    pin44: ["PH3"],
    pin45: ["PH4"],
    pin46: ["PH5"],
    pin47: ["PA3"],
    pin48: ["BYPASS_REG"],
    pin49: ["VDD"],
    pin50: ["PA4"],
    pin51: ["PA5"],
    pin52: ["PA6"],
    pin53: ["PA7"],
    pin54: ["PC4"],
    pin55: ["PC5"],
    pin56: ["PB0"],
    pin57: ["PB1"],
    pin58: ["PB2", "BOOT1"],
    pin59: ["PF11"],
    pin60: ["PF12"],
    pin61: ["VSS"],
    pin62: ["VDD"],
    pin63: ["PF13"],
    pin64: ["PF14"],
    pin65: ["PF15"],
    pin66: ["PG0"],
    pin67: ["PG1"],
    pin68: ["PE7"],
    pin69: ["PE8"],
    pin70: ["PE9"],
    pin71: ["VSS"],
    pin72: ["VDD"],
    pin73: ["PE10"],
    pin74: ["PE11"],
    pin75: ["PE12"],
    pin76: ["PE13"],
    pin77: ["PE14"],
    pin78: ["PE15"],
    pin79: ["PB10"],
    pin80: ["PB11"],
    pin81: ["VCAP_1"],
    pin82: ["VDD"],
    pin83: ["PH6"],
    pin84: ["PH7"],
    pin85: ["PH8"],
    pin86: ["PH9"],
    pin87: ["PH10"],
    pin88: ["PH11"],
    pin89: ["PH12"],
    pin90: ["VSS"],
    pin91: ["VDD"],
    pin92: ["PB12"],
    pin93: ["PB13"],
    pin94: ["PB14"],
    pin95: ["PB15"],
    pin96: ["PD8"],
    pin97: ["PD9"],
    pin98: ["PD10"],
    pin99: ["PD11"],
    pin100: ["PD12"],
    pin101: ["PD13"],
    pin102: ["VSS"],
    pin103: ["VDD"],
    pin104: ["PD14"],
    pin105: ["PD15"],
    pin106: ["PG2"],
    pin107: ["PG3"],
    pin108: ["PG4"],
    pin109: ["PG5"],
    pin110: ["PG6"],
    pin111: ["PG7"],
    pin112: ["PG8"],
    pin113: ["VSS"],
    pin114: ["VDD"],
    pin115: ["PC6"],
    pin116: ["PC7"],
    pin117: ["PC8"],
    pin118: ["PC9"],
    pin119: ["PA8"],
    pin120: ["PA9"],
    pin121: ["PA10"],
    pin122: ["PA11"],
    pin123: ["PA12"],
    pin124: ["PA13", "JTMS_SWDIO"],
    pin125: ["VCAP_2"],
    pin126: ["VSS"],
    pin127: ["VDD"],
    pin128: ["PH13"],
    pin129: ["PH14"],
    pin130: ["PH15"],
    pin131: ["PI0"],
    pin132: ["PI1"],
    pin133: ["PI2"],
    pin134: ["PI3"],
    pin135: ["VSS"],
    pin136: ["VDD"],
    pin137: ["PA14", "JTCK_SWCLK"],
    pin138: ["PA15", "JTDI"],
    pin139: ["PC10"],
    pin140: ["PC11"],
    pin141: ["PC12"],
    pin142: ["PD0"],
    pin143: ["PD1"],
    pin144: ["PD2"],
    pin145: ["PD3"],
    pin146: ["PD4"],
    pin147: ["PD5"],
    pin148: ["VSS"],
    pin149: ["VDD"],
    pin150: ["PD6"],
    pin151: ["PD7"],
    pin152: ["PG9"],
    pin153: ["PG10"],
    pin154: ["PG11"],
    pin155: ["PG12"],
    pin156: ["PG13"],
    pin157: ["PG14"],
    pin158: ["VSS"],
    pin159: ["VDD"],
    pin160: ["PG15"],
    pin161: ["PB3", "JTDO_TRACESWO"],
    pin162: ["PB4", "NJTRST"],
    pin163: ["PB5"],
    pin164: ["PB6"],
    pin165: ["PB7"],
    pin166: ["BOOT0"],
    pin167: ["PB8"],
    pin168: ["PB9"],
    pin169: ["PE0"],
    pin170: ["PE1"],
    pin171: ["PDR_ON"],
    pin172: ["VDD"],
    pin173: ["PI4"],
    pin174: ["PI5"],
    pin175: ["PI6"],
    pin176: ["PI7"],
} as const

function filterPins(...patterns: RegExp[]): (keyof typeof pinLabels)[] {
    return Object.entries(pinLabels)
        .filter(([, labels]) =>
            (labels as readonly string[]).some((label) =>
                patterns.some((pattern) => pattern.test(label)),
            ),
        )
        .sort(([, aLabels], [, bLabels]) =>
            (aLabels as readonly string[])[0].localeCompare(
                (bLabels as readonly string[])[0],
                undefined,
                { numeric: true },
            ),
        )
        .map(([pinName]) => pinName as keyof typeof pinLabels)
}

export const STM32F429IGT6 = (props: ChipProps<typeof pinLabels>) => {
    return (
        <chip
            pinLabels={pinLabels}
            pinAttributes={{
                VDD: { requiresPower: true },
                VDDA: { requiresPower: true },
                VBAT: { requiresPower: true },
                VREFpos: { requiresPower: true },
                VSS: { requiresGround: true },
                VSSA: { requiresGround: true },
            }}
            supplierPartNumbers={{
                jlcpcb: ["C54328"],
            }}
            manufacturerPartNumber="STM32F429IGT6"
            schWidth={5}
            schHeight={19}
            schPinArrangement={{
                topSide: {
                    direction: "left-to-right",
                    pins: ["VBAT", ...filterPins(/^VDD$/), "VDDA"],
                },
                leftSide: {
                    direction: "top-to-bottom",
                    pins: [
                        "BYPASS_REG",
                        "NRST",
                        "PDR_ON",
                        "BOOT0",
                        "VREFpos",
                        ...filterPins(/^PI\d\d?$/),
                        ...filterPins(/^PH\d\d?$/),
                        ...filterPins(/^PG\d\d?$/),
                        ...filterPins(/^PF\d\d?$/),
                        "VCAP_1",
                        "VCAP_2",
                    ],
                },
                rightSide: {
                    direction: "top-to-bottom",
                    pins: [
                        ...filterPins(/^PA\d\d?$/),
                        ...filterPins(/^PB\d\d?$/),
                        ...filterPins(/^PC\d\d?$/),
                        ...filterPins(/^PD\d\d?$/),
                        ...filterPins(/^PE\d\d?$/),
                    ],
                },
                bottomSide: {
                    direction: "left-to-right",
                    pins: ["VSS", "VSSA"],
                },
            }}
            schPinStyle={{
                PI0: { topMargin: 0.4 },
                PH0: { topMargin: 0.4 },
                PC0: { topMargin: 0.4 },
                PD0: { topMargin: 0.4 },
                PA0: { topMargin: 0.4 },
                PB0: { topMargin: 0.4 },
                PE0: { topMargin: 0.4 },
                PF0: { topMargin: 0.4 },
                PG0: { topMargin: 0.4 },
                VCAP_1: { topMargin: 0.4 },
            }}
            footprint={
                <footprint>
                    <smtpad
                        portHints={["pin1"]}
                        pcbX="-10.750042mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin2"]}
                        pcbX="-10.249916mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin3"]}
                        pcbX="-9.750044mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin4"]}
                        pcbX="-9.249918mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin5"]}
                        pcbX="-8.750046mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin6"]}
                        pcbX="-8.24992mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin7"]}
                        pcbX="-7.750048mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin8"]}
                        pcbX="-7.249922mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin9"]}
                        pcbX="-6.75005mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin10"]}
                        pcbX="-6.249924mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin11"]}
                        pcbX="-5.750052mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin12"]}
                        pcbX="-5.249926mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin13"]}
                        pcbX="-4.750054mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin14"]}
                        pcbX="-4.249928mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin15"]}
                        pcbX="-3.750056mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin16"]}
                        pcbX="-3.24993mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin17"]}
                        pcbX="-2.750058mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin18"]}
                        pcbX="-2.249932mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin19"]}
                        pcbX="-1.75006mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin20"]}
                        pcbX="-1.249934mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin21"]}
                        pcbX="-0.750062mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin22"]}
                        pcbX="-0.249936mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin23"]}
                        pcbX="0.249936mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin24"]}
                        pcbX="0.750062mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin25"]}
                        pcbX="1.249934mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin26"]}
                        pcbX="1.75006mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin27"]}
                        pcbX="2.249932mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin28"]}
                        pcbX="2.750058mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin29"]}
                        pcbX="3.24993mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin30"]}
                        pcbX="3.750056mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin31"]}
                        pcbX="4.249928mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin32"]}
                        pcbX="4.750054mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin33"]}
                        pcbX="5.249926mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin34"]}
                        pcbX="5.750052mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin35"]}
                        pcbX="6.249924mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin36"]}
                        pcbX="6.75005mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin37"]}
                        pcbX="7.249922mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin38"]}
                        pcbX="7.750048mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin39"]}
                        pcbX="8.24992mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin40"]}
                        pcbX="8.750046mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin41"]}
                        pcbX="9.249918mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin42"]}
                        pcbX="9.750044mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin43"]}
                        pcbX="10.249916mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin44"]}
                        pcbX="10.750042mm"
                        pcbY="-12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin45"]}
                        pcbX="12.549886mm"
                        pcbY="-10.750042mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin46"]}
                        pcbX="12.549886mm"
                        pcbY="-10.249916mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin47"]}
                        pcbX="12.549886mm"
                        pcbY="-9.750044mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin48"]}
                        pcbX="12.549886mm"
                        pcbY="-9.249918mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin49"]}
                        pcbX="12.549886mm"
                        pcbY="-8.750046mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin50"]}
                        pcbX="12.549886mm"
                        pcbY="-8.24992mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin51"]}
                        pcbX="12.549886mm"
                        pcbY="-7.750048mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin52"]}
                        pcbX="12.549886mm"
                        pcbY="-7.249922mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin53"]}
                        pcbX="12.549886mm"
                        pcbY="-6.75005mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin54"]}
                        pcbX="12.549886mm"
                        pcbY="-6.249924mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin55"]}
                        pcbX="12.549886mm"
                        pcbY="-5.750052mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin56"]}
                        pcbX="12.549886mm"
                        pcbY="-5.249926mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin57"]}
                        pcbX="12.549886mm"
                        pcbY="-4.750054mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin58"]}
                        pcbX="12.549886mm"
                        pcbY="-4.249928mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin59"]}
                        pcbX="12.549886mm"
                        pcbY="-3.750056mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin60"]}
                        pcbX="12.549886mm"
                        pcbY="-3.24993mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin61"]}
                        pcbX="12.549886mm"
                        pcbY="-2.750058mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin62"]}
                        pcbX="12.549886mm"
                        pcbY="-2.249932mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin63"]}
                        pcbX="12.549886mm"
                        pcbY="-1.75006mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin64"]}
                        pcbX="12.549886mm"
                        pcbY="-1.249934mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin65"]}
                        pcbX="12.549886mm"
                        pcbY="-0.750062mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin66"]}
                        pcbX="12.549886mm"
                        pcbY="-0.249936mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin67"]}
                        pcbX="12.549886mm"
                        pcbY="0.249936mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin68"]}
                        pcbX="12.549886mm"
                        pcbY="0.750062mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin69"]}
                        pcbX="12.549886mm"
                        pcbY="1.249934mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin70"]}
                        pcbX="12.549886mm"
                        pcbY="1.75006mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin71"]}
                        pcbX="12.549886mm"
                        pcbY="2.249932mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin72"]}
                        pcbX="12.549886mm"
                        pcbY="2.750058mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin73"]}
                        pcbX="12.549886mm"
                        pcbY="3.24993mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin74"]}
                        pcbX="12.549886mm"
                        pcbY="3.750056mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin75"]}
                        pcbX="12.549886mm"
                        pcbY="4.249928mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin76"]}
                        pcbX="12.549886mm"
                        pcbY="4.750054mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin77"]}
                        pcbX="12.549886mm"
                        pcbY="5.249926mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin78"]}
                        pcbX="12.549886mm"
                        pcbY="5.750052mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin79"]}
                        pcbX="12.549886mm"
                        pcbY="6.249924mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin80"]}
                        pcbX="12.549886mm"
                        pcbY="6.75005mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin81"]}
                        pcbX="12.549886mm"
                        pcbY="7.249922mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin82"]}
                        pcbX="12.549886mm"
                        pcbY="7.750048mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin83"]}
                        pcbX="12.549886mm"
                        pcbY="8.24992mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin84"]}
                        pcbX="12.549886mm"
                        pcbY="8.750046mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin85"]}
                        pcbX="12.549886mm"
                        pcbY="9.249918mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin86"]}
                        pcbX="12.549886mm"
                        pcbY="9.750044mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin87"]}
                        pcbX="12.549886mm"
                        pcbY="10.249916mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin88"]}
                        pcbX="12.549886mm"
                        pcbY="10.750042mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin89"]}
                        pcbX="10.750042mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin90"]}
                        pcbX="10.249916mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin91"]}
                        pcbX="9.750044mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin92"]}
                        pcbX="9.249918mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin93"]}
                        pcbX="8.750046mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin94"]}
                        pcbX="8.24992mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin95"]}
                        pcbX="7.750048mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin96"]}
                        pcbX="7.249922mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin97"]}
                        pcbX="6.75005mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin98"]}
                        pcbX="6.249924mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin99"]}
                        pcbX="5.750052mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin100"]}
                        pcbX="5.249926mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin101"]}
                        pcbX="4.750054mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin102"]}
                        pcbX="4.249928mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin103"]}
                        pcbX="3.750056mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin104"]}
                        pcbX="3.24993mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin105"]}
                        pcbX="2.750058mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin106"]}
                        pcbX="2.249932mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin107"]}
                        pcbX="1.75006mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin108"]}
                        pcbX="1.249934mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin109"]}
                        pcbX="0.750062mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin110"]}
                        pcbX="0.249936mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin111"]}
                        pcbX="-0.249936mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin112"]}
                        pcbX="-0.750062mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin113"]}
                        pcbX="-1.249934mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin114"]}
                        pcbX="-1.75006mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin115"]}
                        pcbX="-2.249932mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin116"]}
                        pcbX="-2.750058mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin117"]}
                        pcbX="-3.24993mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin118"]}
                        pcbX="-3.750056mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin119"]}
                        pcbX="-4.249928mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin120"]}
                        pcbX="-4.750054mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin121"]}
                        pcbX="-5.249926mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin122"]}
                        pcbX="-5.750052mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin123"]}
                        pcbX="-6.249924mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin124"]}
                        pcbX="-6.75005mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin125"]}
                        pcbX="-7.249922mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin126"]}
                        pcbX="-7.750048mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin127"]}
                        pcbX="-8.24992mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin128"]}
                        pcbX="-8.750046mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin129"]}
                        pcbX="-9.249918mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin130"]}
                        pcbX="-9.750044mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin131"]}
                        pcbX="-10.249916mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin132"]}
                        pcbX="-10.750042mm"
                        pcbY="12.549886mm"
                        width="0.2800096mm"
                        height="1.7999964mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin133"]}
                        pcbX="-12.549886mm"
                        pcbY="10.750042mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin134"]}
                        pcbX="-12.549886mm"
                        pcbY="10.249916mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin135"]}
                        pcbX="-12.549886mm"
                        pcbY="9.750044mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin136"]}
                        pcbX="-12.549886mm"
                        pcbY="9.249918mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin137"]}
                        pcbX="-12.549886mm"
                        pcbY="8.750046mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin138"]}
                        pcbX="-12.549886mm"
                        pcbY="8.24992mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin139"]}
                        pcbX="-12.549886mm"
                        pcbY="7.750048mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin140"]}
                        pcbX="-12.549886mm"
                        pcbY="7.249922mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin141"]}
                        pcbX="-12.549886mm"
                        pcbY="6.75005mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin142"]}
                        pcbX="-12.549886mm"
                        pcbY="6.249924mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin143"]}
                        pcbX="-12.549886mm"
                        pcbY="5.750052mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin144"]}
                        pcbX="-12.549886mm"
                        pcbY="5.249926mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin145"]}
                        pcbX="-12.549886mm"
                        pcbY="4.750054mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin146"]}
                        pcbX="-12.549886mm"
                        pcbY="4.249928mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin147"]}
                        pcbX="-12.549886mm"
                        pcbY="3.750056mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin148"]}
                        pcbX="-12.549886mm"
                        pcbY="3.24993mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin149"]}
                        pcbX="-12.549886mm"
                        pcbY="2.750058mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin150"]}
                        pcbX="-12.549886mm"
                        pcbY="2.249932mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin151"]}
                        pcbX="-12.549886mm"
                        pcbY="1.75006mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin152"]}
                        pcbX="-12.549886mm"
                        pcbY="1.249934mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin153"]}
                        pcbX="-12.549886mm"
                        pcbY="0.750062mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin154"]}
                        pcbX="-12.549886mm"
                        pcbY="0.249936mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin155"]}
                        pcbX="-12.549886mm"
                        pcbY="-0.249936mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin156"]}
                        pcbX="-12.549886mm"
                        pcbY="-0.750062mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin157"]}
                        pcbX="-12.549886mm"
                        pcbY="-1.249934mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin158"]}
                        pcbX="-12.549886mm"
                        pcbY="-1.75006mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin159"]}
                        pcbX="-12.549886mm"
                        pcbY="-2.249932mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin160"]}
                        pcbX="-12.549886mm"
                        pcbY="-2.750058mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin161"]}
                        pcbX="-12.549886mm"
                        pcbY="-3.24993mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin162"]}
                        pcbX="-12.549886mm"
                        pcbY="-3.750056mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin163"]}
                        pcbX="-12.549886mm"
                        pcbY="-4.249928mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin164"]}
                        pcbX="-12.549886mm"
                        pcbY="-4.750054mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin165"]}
                        pcbX="-12.549886mm"
                        pcbY="-5.249926mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin166"]}
                        pcbX="-12.549886mm"
                        pcbY="-5.750052mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin167"]}
                        pcbX="-12.549886mm"
                        pcbY="-6.249924mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin168"]}
                        pcbX="-12.549886mm"
                        pcbY="-6.75005mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin169"]}
                        pcbX="-12.549886mm"
                        pcbY="-7.249922mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin170"]}
                        pcbX="-12.549886mm"
                        pcbY="-7.750048mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin171"]}
                        pcbX="-12.549886mm"
                        pcbY="-8.24992mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin172"]}
                        pcbX="-12.549886mm"
                        pcbY="-8.750046mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin173"]}
                        pcbX="-12.549886mm"
                        pcbY="-9.249918mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin174"]}
                        pcbX="-12.549886mm"
                        pcbY="-9.750044mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin175"]}
                        pcbX="-12.549886mm"
                        pcbY="-10.249916mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin176"]}
                        pcbX="-12.549886mm"
                        pcbY="-10.750042mm"
                        width="1.7999964mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <silkscreenpath
                        route={[
                            { x: -11.249990200000006, y: 11.249990199999985 },
                            { x: 11.250015599999998, y: 11.249990199999985 },
                            { x: 11.250015599999998, y: -11.249990200000013 },
                            { x: -11.249990200000006, y: -11.249990200000013 },
                            { x: -11.249990200000006, y: 11.249990199999985 },
                        ]}
                    />
                    <silkscreenpath
                        route={[
                            { x: -11.42492, y: -12.725400000000008 },
                            { x: -11.573661055997668, y: -12.574757970296076 },
                            { x: -11.423650000000002, y: -12.425380575985272 },
                            { x: -11.273638944002343, y: -12.574757970296076 },
                            { x: -11.422380000000004, y: -12.725400000000008 },
                        ]}
                    />
                    <silkscreenpath
                        route={[
                            { x: -10.248900000000006, y: -9.949180000000005 },
                            { x: -10.459834378607901, y: -9.859971640570059 },
                            { x: -10.546356711767743, y: -9.647921341500577 },
                            { x: -10.458042117039064, y: -9.436611200170844 },
                            { x: -10.246360000000003, y: -9.34919195288088 },
                            { x: -10.034677882960942, y: -9.436611200170844 },
                            { x: -9.94636328823227, y: -9.647921341500577 },
                            { x: -10.032885621392111, y: -9.859971640570059 },
                            { x: -10.243820000000007, y: -9.949180000000005 },
                        ]}
                    />
                    <silkscreentext
                        text="{NAME}"
                        pcbX="-0mm"
                        pcbY="14.3096mm"
                        anchorAlignment="center"
                        fontSize="1mm"
                    />
                    <courtyardoutline
                        outline={[
                            { x: -13.559600000000003, y: 13.559599999999989 },
                            { x: 13.559599999999989, y: 13.559599999999989 },
                            { x: 13.559599999999989, y: -14.118400000000015 },
                            { x: -13.559600000000003, y: -14.118400000000015 },
                            { x: -13.559600000000003, y: 13.559599999999989 },
                        ]}
                    />
                </footprint>
            }
            cadModel={{
                objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C54328.obj?uuid=ed243f44b572449a85d344e6cb281595",
                stepUrl:
                    "https://modelcdn.tscircuit.com/easyeda_models/assets/C54328.step?uuid=ed243f44b572449a85d344e6cb281595",
                pcbRotationOffset: 90,
                modelOriginPosition: { x: 0, y: 0, z: -0.8 },
            }}
            {...props}
        />
    )
}
