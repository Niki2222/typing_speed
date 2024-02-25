// const paragraphs = [
//     "Avocados are a fruit, not a vegetable. They're technically considered a single-seeded berry, believe it or not.",
//     "Human teeth are the only part of the body that cannot heal themselves. Teeth are coated in enamel which is not a living tissue.",
//     "There's a fruit that tastes like chocolate pudding. Can we get in on this? Apparently, there's a fruit native to Central and South America called black sapote that tastes like chocolate and sweet custard.",
//     "Pigs can't look up into the sky. The anatomy of their spine and neck muscles limits their movement and restricts their head from being able to look upwards.",
//     "One part of Istanbul is in Europe and the other is in Asia. Part of it neighbours Greece and Bulgaria (therefore sitting in Europe) and the other part neighbours Syria, Iran, and Iraq beyond Turkey’s borders (therefore classing as Asia). The Bosphorus Strait runs between them - a narrow body of water that connects the Black Sea to the Mediterranean Sea via the Sea of Marmara."
// ];

const paragraphs = [
    "ana are mere.",
    "mai are si banane.",
    "dar eu vreau pere.",
    "maria are cirese.",
    "alin are visine.",
    "marius vrea portocale."
];

let intervalIdTime;
let checkLettersIntervalId;
let countSeconds = 60;
let countChars = 0;
let countWords = 0;
let correctCharsInWord = 0;
let totalCharsInWord = 0;
// const SHIFT_KEY = 16;
const SPACE_KEY = 32;
const BACKSPACE_KEY = 8;
let randomText;
let coloredCharacters = [];
let textElement = document.getElementById('text');

document.getElementById('textarea').addEventListener("keyup", compareChars);
document.getElementById('textarea').addEventListener("keyup", startTimeCount, {once: true});

function startTest() {
    document.getElementById('home_page').style.display = "none";
    document.getElementById('testing').style.display = "block";
    generateRandomText();
    document.getElementById('textarea').focus();
}

function setTime() {
    intervalIdTime = setInterval(function() {
        --countSeconds;
        document.querySelector('#timer').innerText = countSeconds;
        endTest();
    }, 1000);
}

function startTimeCount() {
    setTime();
}

function generateRandomText() {
    randomText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    coloredCharacters = [];
    textElement.innerHTML = randomText.split('').map(char => '<span>' + char + '</span>').join('');
}

function compareChars(event) {
    let textLength = randomText.length;
    let textContent = randomText.split('');
    let newTextContent = '';

    if (randomText[countChars] === event.key) {
        coloredCharacters.push(countChars);
        ++correctCharsInWord;
        ++totalCharsInWord;
        ++countChars;
        if (event.keyCode === SPACE_KEY) { 
            if (correctCharsInWord == totalCharsInWord) {
                ++countWords;
            }
            document.getElementById('words_no').innerText = countWords;
            correctCharsInWord = 0;
            totalCharsInWord = 0;
        }
    } else {
        coloredCharacters.push(-1);
        if (event.keyCode === BACKSPACE_KEY) {
            --countChars;
            --totalCharsInWord;
        } else {
            ++countChars;
            ++totalCharsInWord;
        }
    }   

    for (let i = 0; i < textContent.length; ++i) {
        let char = textContent[i];
        if (coloredCharacters.includes(i) && i !== -1) {
            newTextContent += '<span style="color: green;">' + char + '</span>';
        } else if (coloredCharacters.includes(i)) {
            newTextContent += '<span style="color: green;">' + char + '</span>';
        } else if (coloredCharacters.includes(-1)) {
            newTextContent += '<span style="color: red;">' + char + '</span>';
        } else {
            newTextContent += '<span>' + char + '</span>';
        }
    }

    // for (let countChars = 0; countChars < textContent.length;) {
    //     let char = textContent[countChars];
    //     if (char === event.key) {
    //         newTextContent += '<span style="color: green;">' + char + '</span>';
    //         ++countChars;
    //     } else if (char !== event.key) {
    //         newTextContent += '<span style="color: red;">' + char + '</span>';
    //         ++countChars;
    //     } else {
    //         newTextContent += '<span>' + char + '</span>';
    //     }
    // }
    textElement.innerHTML = newTextContent;

    if (countChars === textLength) {
        if (correctCharsInWord == totalCharsInWord) {
            ++countWords;
        }
        document.getElementById('words_no').innerText = countWords;
        generateRandomText();
        document.getElementById('textarea').value += '\r\n';
        countChars = 0;
        correctCharsInWord = 0;
        totalCharsInWord = 0;
    }
}

function endTest() {
    if (countSeconds === 0) {
        clearInterval(intervalIdTime);
        document.getElementById('textarea').blur(); 
    }
}
