const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number: ', randomNum);

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//Start Recognition and game
recognition.start();

//Capture what user says
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div> You Said : </div>
    <span class="box"> ${msg} </span>
    `;
}

// Checks msg against generated number
function checkNumber(msg) {
    const num = +msg; //adding '+' will convert it string to number

    // Check 1: if its a valid number
    if (Number.isNaN(num)) {
        //isNan stands for is Not a Number
        msgEl.innerHTML += '<div> That is not a valid number </div>';
        return;
    }

    // Check the range
    if (num > 100 || num < 1) {
        msgEl.innerHTML +=
            '<div> Number should be within the range (1 - 100)</div>';
        return;
    }

    //Check Number
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2> Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again"> Play again </button>
        `;
    } else if (num > randomNum) {
        msgEl.innerHTML += '<div> GO LOWER </div>';
    } else {
        msgEl.innerHTML += '<div> GO HIGHER </div>';
    }
}

//Generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

//Speak Result
recognition.addEventListener('result', onSpeak);

//Ending SR service
recognition.addEventListener('end', () => recognition.start());

//functionality to the play button
document.body.addEventListener('click', (e) => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
});