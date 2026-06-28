import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
    pin1: ["A5"],
    pin2: ["A1"],
    pin3: ["A4"],
    pin4: ["A6"],
    pin5: ["A7"],
    pin6: ["A8"],
    pin7: ["A9"],
    pin8: ["A12"],
    pin9: ["B12"],
    pin10: ["B9"],
    pin11: ["B8"],
    pin12: ["B7"],
    pin13: ["B6"],
    pin14: ["B5"],
    pin15: ["B4"],
    pin16: ["B1"],
    pin17: ["S11"],
    pin18: ["S12"],
    pin19: ["S13"],
    pin20: ["S14"],
} as const

export const USB4085_GF_A = (props: ChipProps<typeof pinLabels>) => {
    return (
        <chip
            pinLabels={pinLabels}
            supplierPartNumbers={{
                jlcpcb: ["C7095263"],
            }}
            manufacturerPartNumber="USB4085_GF_A"
            footprint="kicad:Connector_USB/USB_C_Receptacle_GCT_USB4085"
            cadModel={{
                objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7095263.obj?uuid=93a4c9e821b34e2aa62f203849b72926",
                stepUrl:
                    "https://modelcdn.tscircuit.com/easyeda_models/assets/C7095263.step?uuid=93a4c9e821b34e2aa62f203849b72926",
                pcbRotationOffset: 0,
                modelOriginPosition: { x: 0, y: 1.962384899999961, z: 0.09999559999999974 },
            }}
            {...props}
        />
    )
}
