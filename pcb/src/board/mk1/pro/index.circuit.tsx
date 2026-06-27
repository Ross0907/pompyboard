import { STM32F429IGT6 } from "@imports/STM32F429IGT6/STM32F429IGT6"

export default () => (
    <board width="200mm" height="170mm">
        <resistor resistance="1k" footprint="0402" name="R1" />
        <capacitor capacitance="1000pF" footprint="0402" name="C1" />
        <trace from=".R1 > .pin1" to=".C1 > .pin1" />
        <STM32F429IGT6 name="U1" />
    </board>
)
