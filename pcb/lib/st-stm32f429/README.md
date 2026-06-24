# STM32F429

In case the links have expired, you can search the documents by their id (in parenthesis) at
[st.com](https://www.st.com/).

The specific model used by wonkle products is STM32F429**IGT6**. Difference between it and other
variants can be found in page 225 part numbering section of the datasheet.

- [datasheet (DS9405)][datasheet]
  - page 13 - what the document is
  - page 19 - board design
  - page 20 - block diagram
  - page 26 - power supply
  - page 41 - USB
  - page 42 - GPIO & ADC
  - page 48 - pinout diagram
  - page 53 - pinout definitions table
  - page 86 - memory mapping
  - page 93 - max ranges
  - page 95 - operating conditions
  - page 101 - supply current
  - page 118 - external clock
  - page 122 - internal clock
  - page 129 - memory
  - page 131 - electromagnetic safety
  - page 135 - IO ports
  - page 152 - USB OTG HS
  - page 158 - ADC
  - page 163 - PCB design guideline
  - page 165 - reference voltage
  - page 209 - LQFP176 package
  - page 224 - thermal
  - page 225 - part numbering
  - page 229 - USB OTG HS
- [reference manual (RM0090)][ref]
  - page 390 - ADC
  - page 1369 - USB
- [ADC application note][adc]

## ADC pins

ADC-capable GPIO pins taken from datasheet Table 10, pages 53-59.

| Pin  | ADC1 | ADC2 | ADC3 | IN  |
| ---- | :--: | :--: | :--: | :-- |
| PA0  |  ✅  |  ✅  |  ✅  | 0   |
| PA1  |  ✅  |  ✅  |  ✅  | 1   |
| PA2  |  ✅  |  ✅  |  ✅  | 2   |
| PA3  |  ✅  |  ✅  |  ✅  | 3   |
| PA4  |  ✅  |  ✅  |      | 4   |
| PA5  |  ✅  |  ✅  |      | 5   |
| PA6  |  ✅  |  ✅  |      | 6   |
| PA7  |  ✅  |  ✅  |      | 7   |
| PB0  |  ✅  |  ✅  |      | 8   |
| PB1  |  ✅  |  ✅  |      | 9   |
| PC0  |  ✅  |  ✅  |  ✅  | 10  |
| PC1  |  ✅  |  ✅  |  ✅  | 11  |
| PC2  |  ✅  |  ✅  |  ✅  | 12  |
| PC3  |  ✅  |  ✅  |  ✅  | 13  |
| PC4  |  ✅  |  ✅  |      | 14  |
| PC5  |  ✅  |  ✅  |      | 15  |
| PF3  |      |      |  ✅  | 9   |
| PF4  |      |      |  ✅  | 14  |
| PF5  |      |      |  ✅  | 15  |
| PF6  |      |      |  ✅  | 4   |
| PF7  |      |      |  ✅  | 5   |
| PF8  |      |      |  ✅  | 6   |
| PF9  |      |      |  ✅  | 7   |
| PF10 |      |      |  ✅  | 8   |

[datasheet]: https://www.st.com/content/ccc/resource/technical/document/datasheet/03/b4/b2/36/4c/72/49/29/DM00071990.pdf/files/DM00071990.pdf/jcr:content/translations/en.DM00071990.pdf
[ref]: https://www.st.com/content/ccc/resource/technical/document/reference_manual/3d/6d/5a/66/b4/99/40/d4/DM00031020.pdf/files/DM00031020.pdf/jcr:content/translations/en.DM00031020.pdf
[adc]: https://www.st.com/resource/en/application_note/an2834-how-to-optimize-the-adc-accuracy-in-the-stm32-mcus-stmicroelectronics.pdf
