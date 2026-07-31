# Structural animations (mechanism-forward MOA reel)

Source: `origin/agent/ak-case-structural` (`fcbcd16`, `65a8fe0`).
Canonical tree also lives at `structural/manuscripts/{gifs,stills}/`.

## Morphs (apo→holo)
- `gifs/M12_S1_KRAS_G12C_switch_collapse_MOA.gif`
- `gifs/M12_S5_PIK3CA_H1047R_activation_MOA.gif`
- `gifs/M00_S2_PARP1_HD_clamp_MOA.gif`

## Guided reveals
- `gifs/M12_S4_EGFR_L858R_reveal_MOA.gif`
- `gifs/M12_S3_BACE1_reveal_MOA.gif`
- `gifs/M12_S6_TP53_DNA_contact.gif` (unchanged contact story)

## Also included (manuscript pack)
- M00_A1–A4 MBD4 / PARP / ceralasertib series
- M12_B1 / B3 / B4 panels

Receipts: `moa_animation_receipts.json`.

## MP4s (`mp4/`)

The branch shipped GIF + PNG stills only. MP4s here were encoded from those GIFs with ffmpeg (libx264, yuv420p, CRF 18) for video players. GIFs remain authoritative.

Worker `MOA_morphs/` package (native MP4 + `MOA_reel_manifest.json`, WRN/PD-1) was not on any reachable remote or disk — not pulled.
