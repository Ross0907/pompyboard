import { Processor } from "@/lib/Processor"
import { SensorArray } from "@/lib/SensorArray"

export default () => (
    <board width="200mm" height="170mm">
        <Processor name="MCU" pcbX={-75} pcbY={65} schX={-45} schY={10} />
        <SensorArray rows={11} columns={19} pcbXOffset={0} pcbYOffset={-30} />
    </board>
)
