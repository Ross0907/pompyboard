import { AH49HSC } from "@/imports/AH49HSC/AH49HSC"
import { CD74HC4067SM96 } from "@/imports/CD74HC4067SM96/CD74HC4067SM96"

export function SensorArray({
    rows,
    columns,
    pcbXOffset,
    pcbYOffset,
}: {
    rows: number
    columns: number
    pcbXOffset: number
    pcbYOffset: number
}) {
    const ROW_SPACING_MM = 10
    const COL_SPACING_MM = 10

    const MUX_HORIZONTAL_OFFSET_MM = 5
    const MUX_STAGGERING_MM = 10
    const MUX_SENSOR_GAP_MM = 9

    return Array.from({ length: columns }, (_, col) => {
        const x = (col - (columns - 1) / 2) * COL_SPACING_MM

        return [
            // MUX
            <CD74HC4067SM96
                key={`mux-${col}`}
                name={`MUX_${col + 1}`}
                pcbRotation={270}
                pcbX={`${pcbXOffset + MUX_HORIZONTAL_OFFSET_MM + x}mm`}
                pcbY={`${
                    pcbYOffset +
                    (col % 2 === 0 ? MUX_SENSOR_GAP_MM + MUX_STAGGERING_MM : MUX_SENSOR_GAP_MM) +
                    ((rows - 1) / 2) * ROW_SPACING_MM
                }mm`}
                schX={x}
                schY={((rows - 1) / 2) * ROW_SPACING_MM - 14}
            />,

            // Sensor column
            ...Array.from({ length: rows }, (_, row) => {
                const y = ((rows - 1) / 2 - row) * ROW_SPACING_MM

                return (
                    <AH49HSC
                        key={`sensor-${row}-${col}`}
                        name={`Sensor_${row * columns + col + 1}`}
                        pcbRotation={90}
                        pcbX={`${pcbXOffset + x}mm`}
                        pcbY={`${pcbYOffset + y}mm`}
                        schX={x}
                        schY={y}
                    />
                )
            }),
        ]
    })
}
