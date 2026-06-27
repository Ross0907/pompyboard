import { STM32F429IGT6 } from "@/imports/STM32F429IGT6/STM32F429IGT6"

export function Processor({
    name,
    pcbX,
    pcbY,
}: {
    name: string
    pcbX: number | string
    pcbY: number | string
}) {
    return (
        <>
            <STM32F429IGT6 name={name} pcbX={pcbX} pcbY={pcbY} />

            {/* VBAT should be connected to VDD when no backup battery is used. */}
            {/* See STM32F429 datasheet Section 3.16 (page 26). */}
            <trace from={`.${name} > .VBAT`} to={`.${name} > .VDD`} />
        </>
    )
}
