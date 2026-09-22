#!/bin/bash
# Watermarks every jpg/jpeg in images/ with "MaksMacro" bottom-right, then
# resizes/compresses for web. Re-run any time you add new photos.
# Originals go to images-full/ (skipped if already backed up there).
set -e
cd "$(dirname "$0")/images"
FONT="C\:/WINDOWS/Fonts/arial.ttf"

for f in *.jpg *.jpeg *.JPG *.JPEG; do
  [ -e "$f" ] || continue
  [ -f "../images-full/$f" ] || cp "$f" "../images-full/$f"
  ffmpeg -y -i "../images-full/$f" -vf "
    scale='min(1800,iw)':-2,
    drawtext=fontfile='$FONT':text='MaksMacro':fontcolor=white@0.65:fontsize=28:
    x=w-tw-24:y=h-th-20:shadowcolor=black@0.6:shadowx=1:shadowy=1
  " -q:v 4 "$f.tmp.jpg" -hide_banner -loglevel error
  mv "$f.tmp.jpg" "$f"
  echo "watermarked: $f"
done
