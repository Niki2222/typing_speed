let intervalIdTime;
let checkLettersIntervalId;
let countSeconds = 60;
let countChars = 0;
const SPACE_KEY = 32;
const BACKSPACE_KEY = 8;
const pushingSpace = 10000;
let randomText;
let isIncorrect = 0;
let textElement = document.getElementById('text');
let coloredCharacters = [];
const writtenWords = [0];
const paragraphs = [
    "Avocados are a fruit, not a vegetable. They're technically considered a single-seeded berry, believe it or not.",
    "Human teeth are the only part of the body that cannot heal themselves. Teeth are coated in enamel which is not a living tissue.",
    "There's a fruit that tastes like chocolate pudding. Can we get in on this? Apparently, there's a fruit native to Central and South America called black sapote that tastes like chocolate and sweet custard.",
    "Pigs can't look up into the sky. The anatomy of their spine and neck muscles limits their movement and restricts their head from being able to look upwards.",
    "One part of Istanbul is in Europe and the other is in Asia. Part of it neighbours Greece and Bulgaria, therefore sitting in Europe and the other part neighbours Syria, Iran, and Iraq beyond Turkey’s borders, therefore classing as Asia. The Bosphorus Strait runs between them - a narrow body of water that connects the Black Sea to the Mediterranean Sea via the Sea of Marmara."
];

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
    randomText = paragraphs[Math.floor(Math.random() * paragraphs.length)].toLocaleLowerCase();
    coloredCharacters = [];
    textElement.innerHTML = randomText.split('').map(char => '<span>' + char + '</span>').join('');
}

function compareChars(event) {
    let textLength = randomText.length;
    let textContent = randomText.split('');
    let newTextContent = '';
    if (event.key === randomText[countChars]) {
        coloredCharacters.push(countChars);
        ++countChars;
        if (event.keyCode === SPACE_KEY) { 
            if (isIncorrect == 1) {
                writtenWords.push(0);
                isIncorrect = 0;
            } else {
                writtenWords.push(1);
            }
            coloredCharacters.pop();
            coloredCharacters.push(pushingSpace);
            document.getElementById('words_no').innerText = countCorrectWords(writtenWords);
        }
    } else if (event.keyCode !== BACKSPACE_KEY && randomText[countChars] !== event.key){
        coloredCharacters.push(-1);
        isIncorrect = 1;
        ++countChars;
    } else if (event.keyCode === BACKSPACE_KEY) {
        if (coloredCharacters[coloredCharacters.length - 1] === -1) {
            isIncorrect = 0;
        } else if (coloredCharacters[coloredCharacters.length - 1] === pushingSpace) {
            writtenWords.pop();
            document.getElementById('words_no').innerText = countCorrectWords(writtenWords);
        } 
        coloredCharacters.pop();
        --countChars;
        if (countChars < 0) {
            countChars = 0;
        }
    } 
    colorChars(textContent, newTextContent);
    newParagraph(textLength);
}

function countCorrectWords(arrayOfNo) {
    return arrayOfNo.reduce((a, b) => a + b);
}

function colorChars(textContent, newTextContent) {
    for (let i = 0; i < textContent.length; ++i) {
        let char = textContent[i];
        if (coloredCharacters[i] === i) {
            newTextContent += '<span style="color: green;">' + char + '</span>';
        } else if (coloredCharacters[i] === -1) {
            newTextContent += '<span style="color: red;">' + char + '</span>';
        } else {
            newTextContent += '<span>' + char + '</span>';
        }
    }
    textElement.innerHTML = newTextContent;
}

function newParagraph(textLength) {
    if (countChars === textLength) {
        document.getElementById('words_no').innerText = countCorrectWords(writtenWords);
        generateRandomText();
        document.getElementById('textarea').value += '\r\n';
        countChars = 0;
    }
}

function endTest() {
    if (countSeconds === 0) {
        clearInterval(intervalIdTime);
        document.getElementById('textarea').blur(); 
    }
}