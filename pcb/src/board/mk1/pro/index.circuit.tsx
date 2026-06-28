import { USB4085_GF_A } from "@/imports/USB4085_GF_A/USB4085_GF_A"
import { Processor } from "@/lib/Processor"
import { SensorArray } from "@/lib/SensorArray"

const BOARD_WIDTH_MM = 200
const BOARD_HEIGHT_MM = 170

export default () => (
    <board width={BOARD_WIDTH_MM} height={BOARD_HEIGHT_MM}>
        <USB4085_GF_A
            name="J1"
            pcbRotation={180}
            pcbX={2.975} // offset to compensate for the fact that origin is at pin1
            pcbY={BOARD_HEIGHT_MM / 2 - 7}
            schX={0}
            schY={16}
        />
        <Processor name="MCU" pcbX={-75} pcbY={65} schX={-45} schY={10} />
        <SensorArray rows={11} columns={19} pcbXOffset={0} pcbYOffset={-30} />
    </board>
)
