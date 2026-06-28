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

    const SCHEMATIC_ROW_SPACING = 2
    const SCHEMATIC_COL_SPACING = 4

    const SCHEMATIC_X_OFFSET = 0
    const SCHEMATIC_Y_OFFSET = 0

    return Array.from({ length: columns }, (_, col) => {
        const x = col - (columns - 1) / 2

        return [
            // MUX
            <CD74HC4067SM96
                key={`mux-${col}`}
                name={`MUX_${col + 1}`}
                noConnect={["I11", "I12", "I13", "I14", "I15"]}
                pcbRotation={270}
                pcbX={pcbXOffset + MUX_HORIZONTAL_OFFSET_MM + x * COL_SPACING_MM}
                pcbY={
                    pcbYOffset +
                    (col % 2 === 0 ? MUX_SENSOR_GAP_MM + MUX_STAGGERING_MM : MUX_SENSOR_GAP_MM) +
                    ((rows - 1) / 2) * ROW_SPACING_MM
                }
                schX={SCHEMATIC_X_OFFSET + x * SCHEMATIC_COL_SPACING}
                schY={SCHEMATIC_Y_OFFSET + 4}
            />,

            // Sensor column
            ...Array.from({ length: rows }, (_, row) => {
                const y = -row

                return (
                    <AH49HSC
                        key={`sensor-${row}-${col}`}
                        name={`Sensor_${row * columns + col + 1}`}
                        pcbRotation={90}
                        pcbX={pcbXOffset + x * COL_SPACING_MM}
                        pcbY={pcbYOffset + ((rows - 1) / 2 + y) * ROW_SPACING_MM}
                        schX={SCHEMATIC_X_OFFSET + x * SCHEMATIC_COL_SPACING}
                        schY={SCHEMATIC_Y_OFFSET + y * SCHEMATIC_ROW_SPACING}
                    />
                )
            }),
        ]
    })
}
