import type { ChipProps } from "@tscircuit/props"

// See "Pin Configuration and Functions" section of the datasheet (page 3)
const pinLabels = {
    pin1: ["SW1"],
    pin2: ["SW2"],
    pin3: ["SW3"],
    pin4: ["PG"],
    pin5: ["FB"],
    pin6: ["AGND"],
    pin7: ["FSW"],
    pin8: ["DEF"],
    pin9: ["SS_TR"],
    pin10: ["AVIN"],
    pin11: ["PVIN1"],
    pin12: ["PVIN2"],
    pin13: ["EN"],
    pin14: ["VOS"],
    pin15: ["PGND1"],
    pin16: ["PGND2"],
    pin17: ["EP"],
} as const

export const TPS62152RGTR = (props: ChipProps<typeof pinLabels>) => {
    return (
        <chip
            pinLabels={pinLabels}
            supplierPartNumbers={{
                jlcpcb: ["C2070611"],
            }}
            manufacturerPartNumber="TPS62152RGTR"
            footprint={
                <footprint>
                    <smtpad
                        portHints={["pin1"]}
                        pcbX="-1.499997mm"
                        pcbY="0.750189mm"
                        width="0.7999984mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin2"]}
                        pcbX="-1.499997mm"
                        pcbY="0.250063mm"
                        width="0.7999984mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin3"]}
                        pcbX="-1.499997mm"
                        pcbY="-0.249809mm"
                        width="0.7999984mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin4"]}
                        pcbX="-1.499997mm"
                        pcbY="-0.749935mm"
                        width="0.7999984mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin5"]}
                        pcbX="-0.749935mm"
                        pcbY="-1.499997mm"
                        width="0.2800096mm"
                        height="0.7999984mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin6"]}
                        pcbX="-0.249809mm"
                        pcbY="-1.499997mm"
                        width="0.2800096mm"
                        height="0.7999984mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin7"]}
                        pcbX="0.250063mm"
                        pcbY="-1.499997mm"
                        width="0.2800096mm"
                        height="0.7999984mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin8"]}
                        pcbX="0.750189mm"
                        pcbY="-1.499997mm"
                        width="0.2800096mm"
                        height="0.7999984mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin9"]}
                        pcbX="1.499997mm"
                        pcbY="-0.749935mm"
                        width="0.7999984mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin10"]}
                        pcbX="1.499997mm"
                        pcbY="-0.249809mm"
                        width="0.7999984mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin11"]}
                        pcbX="1.499997mm"
                        pcbY="0.250063mm"
                        width="0.7999984mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin12"]}
                        pcbX="1.499997mm"
                        pcbY="0.750189mm"
                        width="0.7999984mm"
                        height="0.2800096mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin13"]}
                        pcbX="0.750189mm"
                        pcbY="1.499997mm"
                        width="0.2800096mm"
                        height="0.7999984mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin14"]}
                        pcbX="0.250063mm"
                        pcbY="1.499997mm"
                        width="0.2800096mm"
                        height="0.7999984mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin15"]}
                        pcbX="-0.249809mm"
                        pcbY="1.499997mm"
                        width="0.2800096mm"
                        height="0.7999984mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin16"]}
                        pcbX="-0.749935mm"
                        pcbY="1.499997mm"
                        width="0.2800096mm"
                        height="0.7999984mm"
                        radius="0.1400048mm"
                        shape="pill"
                    />
                    <smtpad
                        portHints={["pin17"]}
                        pcbX="0.000127mm"
                        pcbY="0.000127mm"
                        width="1.6999966mm"
                        height="1.6999966mm"
                        shape="rect"
                    />
                    <silkscreenpath
                        route={[
                            { x: 1.2751308000000137, y: -1.7247107999999969 },
                            { x: 1.7249648000000093, y: -1.7247107999999969 },
                            { x: 1.7249648000000093, y: -1.2748768000000013 },
                        ]}
                    />
                    <silkscreenpath
                        route={[
                            { x: 1.2751308000000137, y: 1.7251172000000068 },
                            { x: 1.7249648000000093, y: 1.7251172000000068 },
                            { x: 1.7249648000000093, y: 1.2752832000000112 },
                        ]}
                    />
                    <silkscreenpath
                        route={[
                            { x: -1.7248631999999873, y: 1.2752832000000112 },
                            { x: -1.7248631999999873, y: 1.7251172000000068 },
                            { x: -1.2750291999999916, y: 1.7251172000000068 },
                        ]}
                    />
                    <silkscreenpath
                        route={[
                            { x: -1.2750291999999916, y: -1.7247107999999969 },
                            { x: -1.7248631999999873, y: -1.7247107999999969 },
                            { x: -1.7248631999999873, y: -1.2748768000000013 },
                        ]}
                    />
                    <silkscreenpath
                        route={[
                            { x: -2.075129199999992, y: 1.5242032000000023 },
                            { x: -1.9244871702960609, y: 1.6729442559976633 },
                            { x: -1.7751097759852428, y: 1.5229332000000042 },
                            { x: -1.9244871702960609, y: 1.3729221440023451 },
                            { x: -2.075129199999992, y: 1.521663200000006 },
                        ]}
                    />
                    <silkscreentext
                        text="{NAME}"
                        pcbX="-0.244475mm"
                        pcbY="2.895475mm"
                        anchorAlignment="center"
                        fontSize="1mm"
                    />
                    <courtyardoutline
                        outline={[
                            { x: -2.6280749999999813, y: 2.1454750000000047 },
                            { x: 2.1391250000000213, y: 2.1454750000000047 },
                            { x: 2.1391250000000213, y: -2.1645249999999905 },
                            { x: -2.6280749999999813, y: -2.1645249999999905 },
                            { x: -2.6280749999999813, y: 2.1454750000000047 },
                        ]}
                    />
                </footprint>
            }
            cadModel={{
                objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2070611.obj?uuid=a0552310018448b5b966868abf063451",
                stepUrl:
                    "https://modelcdn.tscircuit.com/easyeda_models/assets/C2070611.step?uuid=a0552310018448b5b966868abf063451",
                pcbRotationOffset: 0,
                modelOriginPosition: { x: -0.000012700000013410317, y: 0, z: -0.01 },
            }}
            {...props}
        />
    )
}
