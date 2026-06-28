# Wonkle Firmware

## Must read

- https://probe.rs
- https://github.com/stm32-rs/stm32f4xx-hal
- https://github.com/rust-embedded/cortex-m
- https://defmt.ferrous-systems.com
- https://docs.rust-embedded.org/book
- [`pcb/lib/st-stm32f429/README.md`](../pcb/lib/st-stm32f429/README.md)
- (optional) also check
  - https://github.com/rust-lang/rustlings
  - https://www.youtube.com/@therustybits/videos
  - https://doc.rust-lang.org/stable/book

## Setting up

1. Setup development environment with [mise](https://mise.jdx.dev/getting-started.html) and [nix](https://nix.dev/install-nix.html)
   - [IDE integration](https://mise.jdx.dev/ide-integration.html)

## Commands

### Flash and run

See https://probe.rs/docs/tools/probe-rs/ for more information.
See [`./Cargo.toml`](./Cargo.toml) to see available devices.

Pick a device with `-p <package>`:

```bash
cargo run --release -p wonkleboard-mk1-pro
```

Or from inside a device crate:

```bash
cd device/board/mk1/pro
cargo run --release
```

### List USB devices

```bash
lsusb
```

### Show device descriptor

```bash
lsusb -v -d 1209:02d7 # (vid:pid)
```

### Show HID descriptor

You can use https://eleccelerator.com/usbdescreqparser/ to parse the output.

```bash
usbhid-dump -m 1209:02d7 # (vid:pid)
```
