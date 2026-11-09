#!/bin/bash

# Define the LilyPond note pitches and corresponding filenames
notes=("c'" "d'" "e'" "f'" "g'" "a'" "b'" "c''")
names=("c4" "d4" "e4" "f4" "g4" "a4" "b4" "c5")

echo "Generating music note PNGs..."

for i in "${!notes[@]}"; do
    note="${notes[$i]}"
    name="${names[$i]}"
    
    # Create a temporary LilyPond file for the single note
    cat << EOF > temp.ly
\version "2.24.0"

\header {
  tagline = ##f % Removes the LilyPond footer text
}

\score {
  \new Staff \with {
    \remove "Time_signature_engraver" % Removes time signature for clean asset look
  } {
    \clef treble
    \override Staff.Clef.break-visibility = #all-visible
    $note\1
  }
  \layout {
    indent = 0\mm
    ragged-right = ##t
  }
}
EOF

    # Compile to PNG at 300 DPI (high resolution for retina displays)
    lilypond -dbackend=eps -dno-point-and-click -dresolution=300 --png -o "note_$name" temp.ly
    
    echo "Created: note_$name.png"
done

# Cleanup temporary files
rm -f temp.ly note_*.eps note_*.pdf

echo "Done! All note PNGs generated successfully."
