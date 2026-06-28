/*
See https://docs.rs/cortex-m-rt/latest/cortex_m_rt/#memoryx
See https://jlcpcb.com/api/file/downloadByFileSystemAccessId/8586176342744576000 page 76
*/

MEMORY
{
  /* K = 1024 bytes */
  /* M = 1024K */
     RAM(rwx): ORIGIN = 0x20000000, LENGTH = 192K
  CCMRAM(rwx): ORIGIN = 0x10000000, LENGTH = 64K
   FLASH(rx ): ORIGIN = 0x08000000, LENGTH = 1M
}

_stack_start = ORIGIN(RAM) + LENGTH(RAM);
