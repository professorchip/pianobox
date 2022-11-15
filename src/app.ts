export {}
import {getChord} from "./tonal";

const keyboard = document.querySelector('#piano-keyboard');
const whiteKeys = ['c3','d3','e3','f3','g3','a4','b4','c4','d4','e4','f4','g4','a5','b5'];
const blackKeys = ['db3','eb3','gb3','ab4','bb4','db4','eb4','gb4','ab5','bb5'];
const blackKeyDots = ['db3_2','eb3_2','gb3_2','ab4_2','bb4_2','db4_2','eb4_2','gb4_2','ab5_2','bb5_2'];
const keysPressed: Array<string> = []; // Array to keep track of the key that is currently being pressed down. 

// Is key already pressed?
function isKeyPressed(key: String){ 
    const keyString = String(key);
    if(keysPressed.includes(keyString)){
        return true;
    } 
    return;
}

// Is key black or white?
function isKeyBlack(key: String){
    if(blackKeys.includes(`${key}`)) {
        return true;
    }
    return;
}

// Was a key pressed directly or another element?
function keyElementOrNot(e: any) {
    const key = e.target.parentElement.id;
    const keyDot = String(e.target.id);
    if (blackKeys.includes(`${key}`) || whiteKeys.includes(`${key}`) || blackKeyDots.includes(`${keyDot}`)) {
        return true;
    } 
    return false;
}

function keyOrNot(e: any) {
    const key = String(e.target.parentElement.id);
    if (blackKeys.includes(`${key}`) || whiteKeys.includes(`${key}`)) {
        return true;
    } 
    return false;
}

function cleanChord(e: any) {
    const cleanedChord = keysPressed.map((note) => {
        var cleanNote = `${note.toUpperCase().replace(/[0-9]/g, '')}`;
        return cleanNote;
    })
    // console.log(cleanedChord);
    console.log(`Chord: ${getChord(cleanedChord)}`);
}

// Remove extension from key name
function cleanUpKey(e: any) {
    if (keyOrNot(e)) {
        return e.target.parentElement.id;
    }   else {
        const keyDot = e.target.id;
        const cleanedKey = keyDot.replace('_2', '');
        return cleanedKey;
    }

} 

//Handle the highlight effect on keyboard
function setColor(e: any) {
    const realKey = cleanUpKey(e);
    const keyDot = String(`${realKey}_2`);
    const keyboardDots = document.getElementById(keyDot);
    if (isKeyBlack(realKey)) {
        const keyFill = isKeyPressed(realKey) === true ? 'lightblue' : 'black';
        keyboardDots!.style.fill=keyFill;
    }
     else {
        const keyFill = isKeyPressed(realKey) === true ? 'lightblue' : 'white';
        e.target.style.fill=keyFill;
    }
}

function keyClicked(e: any) {
    if (keyElementOrNot(e)){
        const realKey = cleanUpKey(e);
        if(isKeyPressed(realKey)){
            //Key already pressed
            const currentKeyIndex = keysPressed.indexOf(realKey);
            keysPressed.splice(currentKeyIndex,1);
            setColor(e);
            cleanChord(e);
        } else {
            //Key not pressed
            keysPressed.push(realKey);
            setColor(e);
            cleanChord(e);
        }
        // console.log(`Chord: ${getChord()}`);
    } else {
        console.log('this is not a key');
    }
}

keyboard!.addEventListener('click', keyClicked);
