#!/bin/bash

# Define an associative array mapping LilyPond pitch commands to filenames
# This covers naturals, sharps (is), and flats (es) across the octave
declare -A note_map=(
    ["c'"]="c4"
    ["cis'"]="cis4"
    ["des'"]="des4"
    ["d'"]="d4"
    ["dis'"]="dis4"
    ["ees'"]="ees4"
    ["e'"]="e4"
    ["fes'"]="fes4"
    ["f'"]="f4"
    ["fis'"]="fis4"
    ["ges'"]="ges4"
    ["g'"]="g4"
    ["gis'"]="gis4"
    ["aes'"]="aes4"
    ["a'"]="a4"
    ["ais'"]="ais4"
    ["bes'"]="bes4"
    ["b'"]="b4"
    ["c''"]="c5"
)

echo "Generating natural, sharp, and flat note PNGs..."

for note in "${!note_map[@]}"; do
    name="${note_map[$note]}"
    
    # Create temporary LilyPond file for the specific note and accidental
    cat << EOF > temp.ly
\version "2.24.0"

\header {
  tagline = ##f
}

\score {
  \new Staff \with {
    \remove "Time_signature_engraver"
  } {
    \clef treble
    \override Staff.Clef.break-visibility = #all-visible
    $note
  }
  \layout {
    indent = 0\mm
    ragged-right = ##t
  }
}
EOF

    # Compile to high-res PNG
    lilypond -dbackend=eps -dno-point-and-click -dresolution=300 --png -o "note_$name" temp.ly
    
    # Trim whitespace
    convert -trim "note_$name.png" "note_$name.png"
    
    echo "Generated & Trimmed: note_$name.png"
done

# Cleanup temporary files
rm -f temp.ly note_*.eps note_*.pdf

echo "Done! All note variations generated successfully."
