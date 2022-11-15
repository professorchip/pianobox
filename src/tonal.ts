import { detect } from "@tonaljs/chord-detect";

// To be continued to convert sharps to flats as the detect function doesn't take flats
// const flats = {
//     'DB' : 'C#',
//     'EB' : 'D#',
//     'GB' : 'F#',
//     'AB' : 'G#',
//     'BB' : 'A#',
// }

// function flatsToSharps() {
    
// }

export function getChord(chord: Array<any>){
    const tonalChord = detect(chord);
    console.log(chord);
    return tonalChord;
} 



