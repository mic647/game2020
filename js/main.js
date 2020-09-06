'use sreict';

var gCountCellClicked = 0;
var gLevel = 1;
var gInterval;
var gStartTime;
var gNumsOfGame = 16;
var gNums = [];
var elRange = document.querySelector('input');
elRange.value = 0;
var gScore = 0;
var isOn = false;

function init() {
    modal('0', 'none');
    renderBoard();
    darkMode();
}

function startGame() {
    gLevel = 1;
    gScore = 0;
    gNumsOfGame = 16;
    document.querySelector('.time span').innerText = "00:00";
    clearInterval(gInterval);
    for (var i = 1; i < gNumsOfGame + 1; i++) {
        gNums.push(i)
    }
    isOn = true
    gCountCellClicked = 0;
    addScore(0)
    modal('0', 'none');
    renderBoard();
    nextNum();
    darkMode();
}

function nextLevelInGame() {
    for (var i = 1; i < gNumsOfGame + 1; i++) {
        gNums.push(i)
    }
    isOn = true
    gCountCellClicked = 0;
    modal('0', 'none');
    renderBoard();
    nextNum();
    darkMode();
}


function sizeGame(elBtn) {
    document.querySelector('h3 span').innerHTML = '00:00';
    clearInterval(gInterval);
    var num = parseInt(elBtn.innerText)
    gNumsOfGame = num;
    nextLevelInGame();
}

function renderBoard() {
    var strHtml = '';
    for (var i = 0; i < Math.sqrt(gNumsOfGame); i++) {
        strHtml += '<tr>'
        for (var j = 0; j < Math.sqrt(gNumsOfGame); j++) {
            strHtml += `<td onclick="cellClicked(this)">${gNums.splice(getRandomInt(0, gNums.length), 1)}</td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}


function cellClicked(clickedNum) {
    if (isOn) {
        var elHover = document.querySelector('.board td:hover');
        if (gCountCellClicked === 0 && gLevel === 1) {
            gStartTime = Math.floor(Date.now() / 1000);
            gInterval = setInterval(startTimeCounter, 1000);
        }
        if (clickedNum.innerText == gCountCellClicked + 1) {
            elHover.style.backgroundColor = '#931212';
            gCountCellClicked++;
            clickedNum.classList.add('click');
            nextNum();
            nextLevel();
            if (isGameOver()) return;
        }
    }
}


function nextLevel() {
    if (gCountCellClicked == gNumsOfGame) {
        addScore(10)
        if (gLevel === 1) {
            gNumsOfGame = 25;
            gLevel++;
            gCountCellClicked = 0;
            nextLevelInGame();
            return;
        } if (gLevel === 2) {
            gNumsOfGame = 36;
            gLevel++;
            gCountCellClicked = 0;
            nextLevelInGame();
        }
    }
}

function addScore(score) {
    var elScore = document.querySelector('.score span');
    elScore.innerText = gScore + score;
}

function isGameOver() {
    if (gCountCellClicked == 36 && isOn) {
        isOn = false;
        // document.querySelector('h4 span').innerHTML += `<br>` + '00:' + startTimeCounter();
        clearInterval(gInterval);
        modal('100', 'block');
        gLevel = 1;
        document.querySelector('h3 span').innerHTML = '00:00';
    }
}

function startTimeCounter() {
    if (!isGameOver()) {
        var now = Math.floor(Date.now() / 1000);
        var diff = now - gStartTime;
        var m = Math.floor(diff / 60);
        var s = Math.floor(diff % 60);
        m = checkTime(m);
        s = checkTime(s);
        document.querySelector('h3 span').innerHTML = m + ":" + s;
    } else {
        gStartTime = Math.floor(Date.now() / 1000);

    }
}

function checkTime(i) {
    if (i < 10) { i = '0' + i };
    return i;
}

function nextNum() {
    var elNextNum = document.querySelector('.next-num span');
    elNextNum.innerText = gCountCellClicked + 1;
}

function modal(opacity, display) {
    var elModal = document.querySelector('.modal');
    elModal.style.opacity = opacity + '%';
    elModal.style.display = display;
    elModal.innerText += `your scor is ${gScore}! You have completed ${gScore/10} steps`
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function darkMode() {
    var elRange = document.querySelector('.dark-mode');
    var elBtnSt = document.querySelectorAll('.btn-st');
    var elBody = document.querySelector('body');
    var elTd = document.querySelectorAll('.board td');
    if (elRange.value == "1") {
        elBody.style.color = 'white';
        elBody.style.backgroundColor = '#131c21';
        for (var i = 0; i < elTd.length; i++) {
            elTd[i].style.border = '1px solid white';
        }
        for (var i = 0; i < elBtnSt.length; i++) {
            elBtnSt[i].style.border = '1px solid white';
        }
        return false
    } if (elRange.value == "0") {
        elBody.style.color = 'black';
        elBody.style.backgroundColor = 'white';
        for (var i = 0; i < elTd.length; i++) {
            elTd[i].style.border = '2px solid black';
        }
        for (var i = 0; i < elBtnSt.length; i++) {
            elBtnSt[i].style.border = '1px solid black';
        }
    }
    return true;
}