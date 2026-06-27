import { STM32F429IGT6 } from "@/imports/STM32F429IGT6/STM32F429IGT6"
import { SensorArray } from "@/lib/SensorArray"

export default () => (
    <board width="200mm" height="170mm">
        <STM32F429IGT6 name="MCU" pcbX={-70} pcbY={65} />
        <SensorArray rows={11} columns={19} pcbXOffset={0} pcbYOffset={-30} />
    </board>
)
