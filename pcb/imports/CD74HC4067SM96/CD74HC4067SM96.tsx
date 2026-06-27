import type { ChipProps } from "@tscircuit/props"

// See "Pinout" section of the datasheet (page 1)
const pinLabels = {
    pin1: ["COMMON_INPUT_OUTPUT"],
    pin2: ["I7"],
    pin3: ["I6"],
    pin4: ["I5"],
    pin5: ["I4"],
    pin6: ["I3"],
    pin7: ["I2"],
    pin8: ["I1"],
    pin9: ["I0"],
    pin10: ["S0"],
    pin11: ["S1"],
    pin12: ["GND"],
    pin13: ["S3"],
    pin14: ["S2"],
    pin15: ["E"],
    pin16: ["I15"],
    pin17: ["I14"],
    pin18: ["I13"],
    pin19: ["I12"],
    pin20: ["I11"],
    pin21: ["I10"],
    pin22: ["I9"],
    pin23: ["I8"],
    pin24: ["VCC"],
} as const

export const CD74HC4067SM96 = (props: ChipProps<typeof pinLabels>) => {
    return (
        <chip
            pinLabels={pinLabels}
            pinAttributes={{
                VCC: { requiresPower: true },
                GND: { requiresGround: true },
            }}
            supplierPartNumbers={{
                jlcpcb: ["C98457"],
            }}
            manufacturerPartNumber="CD74HC4067SM96"
            footprint={
                <footprint>
                    <smtpad
                        portHints={["pin1"]}
                        pcbX="-3.57505mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin2"]}
                        pcbX="-2.925064mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin3"]}
                        pcbX="-2.275078mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin4"]}
                        pcbX="-1.625092mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin5"]}
                        pcbX="-0.975106mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin6"]}
                        pcbX="-0.324866mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin7"]}
                        pcbX="0.32512mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin8"]}
                        pcbX="0.975106mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin9"]}
                        pcbX="1.625092mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin10"]}
                        pcbX="2.275078mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin11"]}
                        pcbX="2.925064mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin12"]}
                        pcbX="3.57505mm"
                        pcbY="-3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin24"]}
                        pcbX="-3.57505mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin23"]}
                        pcbX="-2.925064mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin22"]}
                        pcbX="-2.275078mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin21"]}
                        pcbX="-1.625092mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin20"]}
                        pcbX="-0.975106mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin19"]}
                        pcbX="-0.324866mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin18"]}
                        pcbX="0.32512mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin17"]}
                        pcbX="0.975106mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin16"]}
                        pcbX="1.625092mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin15"]}
                        pcbX="2.275078mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin14"]}
                        pcbX="2.925064mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin13"]}
                        pcbX="3.57505mm"
                        pcbY="3.562096mm"
                        width="0.3080004mm"
                        height="1.3240004mm"
                        radius="0.1540002mm"
                        shape="pill"
                    />
                    <silkscreenpath
                        route={[
                            { x: -3.976192200000014, y: -2.5713943999999174 },
                            { x: -3.976192200000014, y: 2.571394400000031 },
                            { x: 3.976192200000014, y: 2.571394400000031 },
                            { x: 3.976192200000014, y: -2.5713943999999174 },
                            { x: -3.976192200000014, y: -2.5713943999999174 },
                        ]}
                    />
                    <silkscreenpath
                        route={[
                            { x: -3.4249360000000024, y: -1.8188939999998865 },
                            { x: -3.430051010512557, y: -1.857746362136595 },
                            { x: -3.445047462536195, y: -1.8939510000000155 },
                            { x: -3.4689033726488105, y: -1.9250406273509952 },
                            { x: -3.4999930000000177, y: -1.948896537463611 },
                            { x: -3.536197637863438, y: -1.9638929894874764 },
                            { x: -3.5750499999999192, y: -1.9690080000000307 },
                            { x: -3.613902362136514, y: -1.9638929894874764 },
                            { x: -3.650107000000048, y: -1.948896537463611 },
                            { x: -3.681196627351028, y: -1.9250406273509952 },
                            { x: -3.7050525374636436, y: -1.8939510000000155 },
                            { x: -3.720048989487509, y: -1.857746362136595 },
                            { x: -3.7251639999999497, y: -1.8188939999998865 },
                            { x: -3.720048989487509, y: -1.7800416378634054 },
                            { x: -3.7050525374636436, y: -1.743836999999985 },
                            { x: -3.681196627351028, y: -1.7127473726490052 },
                            { x: -3.650107000000048, y: -1.6888914625363896 },
                            { x: -3.613902362136514, y: -1.673895010512524 },
                            { x: -3.5750499999999192, y: -1.6687799999999697 },
                            { x: -3.536197637863438, y: -1.673895010512524 },
                            { x: -3.4999930000000177, y: -1.6888914625363896 },
                            { x: -3.4689033726488105, y: -1.7127473726490052 },
                            { x: -3.445047462536195, y: -1.743836999999985 },
                            { x: -3.430051010512557, y: -1.7800416378634054 },
                            { x: -3.4249360000000024, y: -1.8188939999998865 },
                        ]}
                    />
                    <silkscreenpath
                        route={[
                            { x: -4.03123400000004, y: -3.562095999999883 },
                            { x: -4.036349010512595, y: -3.600948362136478 },
                            { x: -4.0513454625363465, y: -3.637153000000012 },
                            { x: -4.075201372648962, y: -3.668242627350992 },
                            { x: -4.106291000000056, y: -3.6920985374636075 },
                            { x: -4.142495637863476, y: -3.707094989487473 },
                            { x: -4.181348000000071, y: -3.7122099999999136 },
                            { x: -4.220200362136552, y: -3.707094989487473 },
                            { x: -4.256405000000086, y: -3.6920985374636075 },
                            { x: -4.287494627351066, y: -3.668242627350992 },
                            { x: -4.311350537463795, y: -3.637153000000012 },
                            { x: -4.326346989487547, y: -3.600948362136478 },
                            { x: -4.331461999999988, y: -3.562095999999883 },
                            { x: -4.326346989487547, y: -3.523243637863402 },
                            { x: -4.311350537463795, y: -3.487038999999868 },
                            { x: -4.287494627351066, y: -3.455949372649002 },
                            { x: -4.256405000000086, y: -3.4320934625361588 },
                            { x: -4.220200362136552, y: -3.417097010512407 },
                            { x: -4.181348000000071, y: -3.4119819999999663 },
                            { x: -4.142495637863476, y: -3.417097010512407 },
                            { x: -4.106291000000056, y: -3.4320934625361588 },
                            { x: -4.075201372648962, y: -3.455949372649002 },
                            { x: -4.0513454625363465, y: -3.487038999999868 },
                            { x: -4.036349010512595, y: -3.523243637863402 },
                            { x: -4.03123400000004, y: -3.562095999999883 },
                        ]}
                    />
                    <silkscreentext
                        text="{NAME}"
                        pcbX="-0.127mm"
                        pcbY="5.064mm"
                        anchorAlignment="center"
                        fontSize="1mm"
                    />
                    <courtyardoutline
                        outline={[
                            { x: -4.593399999999974, y: 4.314000000000078 },
                            { x: 4.339399999999955, y: 4.314000000000078 },
                            { x: 4.339399999999955, y: -4.593399999999974 },
                            { x: -4.593399999999974, y: -4.593399999999974 },
                            { x: -4.593399999999974, y: 4.314000000000078 },
                        ]}
                    />
                </footprint>
            }
            cadModel={{
                objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C98457.obj?uuid=44cbf0bf34924619a9a3f811509fb70e",
                stepUrl:
                    "https://modelcdn.tscircuit.com/easyeda_models/assets/C98457.step?uuid=44cbf0bf34924619a9a3f811509fb70e",
                pcbRotationOffset: 0,
                modelOriginPosition: { x: 0, y: 0, z: 0 },
            }}
            {...props}
        />
    )
}
