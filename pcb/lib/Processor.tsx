import { STM32F429IGT6 } from "@/imports/STM32F429IGT6/STM32F429IGT6"

export function Processor({
    name,
    pcbX,
    pcbY,
    schX,
    schY,
}: {
    name: string
    pcbX: number | string
    pcbY: number | string
    schX?: Parameters<typeof STM32F429IGT6>["0"]["schX"]
    schY?: Parameters<typeof STM32F429IGT6>["0"]["schY"]
}) {
    return (
        <>
            <STM32F429IGT6
                name={name}
                pcbX={pcbX}
                pcbY={pcbY}
                schX={schX}
                schY={schY}
                noConnect={[
                    "BYPASS_REG",
                    "NRST",
                    "PDR_ON",
                    "PI0",
                    "PI1",
                    "PI2",
                    "PI3",
                    "PI4",
                    "PI5",
                    "PI6",
                    "PI7",
                    "PI8",
                    "PI9",
                    "PI10",
                    "PI11",
                ]}
            />

            {/* VBAT should be connected to VDD when no backup battery is used. */}
            {/* See STM32F429 datasheet Section 3.16 (page 26). */}
            <trace from={`.${name} > .VBAT`} to={`.${name} > .VDD`} />
        </>
    )
}
