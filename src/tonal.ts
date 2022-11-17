import { detect } from "@tonaljs/chord-detect";
import {isKeyBlack} from "./app";

const flatsAndSharps = new Map<string, string>([
        ['DB', 'C#'],
        ['EB', 'D#'],
        ['GB', 'F#'],
        ['AB', 'G#'],
        ['BB', 'A#'],
    ]
)

function noteAsSharp(note: string) {
    return flatsAndSharps.get(note);
}

function cleanUpNote(note: string) {
    return `${note.toUpperCase().replace(/[0-9]/g, '')}`;
}

// Intake array and process it into format that can be interpreted by Tonal.js
function cleanChord(chord: Array<String>) {
    let cleanedChord = Array();
    cleanedChord = chord.map((note) => {
        if(isKeyBlack(note)) {
            return noteAsSharp(cleanUpNote(String(note)));
        } else {
            return cleanUpNote(String(note));
        }
    })
    console.log('cleanedChordarray = ' + cleanedChord);
    return cleanedChord;
}

export function getChord(chord: Array<String>){
    return detect(cleanChord(chord));
} 


