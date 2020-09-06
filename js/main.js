'use sreict';

var gCountCellClicked = 0;
var gLevel = 1;
var gInterval;
var gStartTime;
var gNumsOfGame = 16;
var gNums = [];
var elRange = document.querySelector('input');
elRange.value = 0;
var isOn = false;

function darkMode() {
    var elRange = document.querySelector('.dark-mode')
    var elBody = document.querySelector('body');
    var elTd = document.querySelectorAll('.board td');
    if (elRange.value == "1") {
        elBody.style.color = 'white'
        elBody.style.backgroundColor = '#131c21'
        for (var i = 0; i < elTd.length; i++) {
            elTd[i].style.border = '1px solid white'
        }
        return false
    } if (elRange.value == "0") {
        elBody.style.color = 'black'
        elBody.style.backgroundColor = 'white'
        for (var i = 0; i < elTd.length; i++) {
            elTd[i].style.border = '1px solid black'
        }
    }
    return true
}

function init() {
    modal('0', 'none');
    renderBoard();
    darkMode();
}

function startGame() {
    if (gLevel === 1 || gLevel === 2) gNumsOfGame = 16;
    if (gCountCellClicked > 0) {
        document.querySelector('h3 span').innerHTML = '00:00';
        clearInterval(gInterval);
    }
    gCountCellClicked = 0;
    isOn = true;
    for (var i = 1; i < gNumsOfGame + 1; i++) {
        gNums.push(i)
    }
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
    init();
}

function renderBoard() {
    var strHtml = '';
    for (var i = 0; i < Math.sqrt(gNumsOfGame); i++) {
        strHtml += '<tr>'
        for (var j = 0; j < Math.sqrt(gNumsOfGame); j++) {
            console.log();
            strHtml += `<td onclick="cellClicked(this)">${gNums.splice(getRandomInt(0, gNums.length), 1)}</td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}


function cellClicked(clickedNum) {
    var elHover = document.querySelector('.board td:hover');
    if (gCountCellClicked === 0 && gLevel === 1) {
        gStartTime = Math.floor(Date.now() / 1000);
        gInterval = setInterval(startTimeCounter, 1000);
    }
    if (clickedNum.innerText == gCountCellClicked + 1) {
        elHover.style.backgroundColor = '#931212'
        gCountCellClicked++;
        clickedNum.classList.add('click');
        nextNum();
        nextLevel();
        if (isGameOver()) return;
    }
}

function nextNum() {
    var elNextNum = document.querySelector('.next-num span');
    elNextNum.innerText = gCountCellClicked + 1
}

function nextLevel() {
    if (gCountCellClicked == gNumsOfGame) {
        if (gLevel === 1) {
            gNumsOfGame = 25;
            gLevel++;
            gCountCellClicked = 0;
            startGame();
            return;
        } if (gLevel === 2) {
            gNumsOfGame = 36;
            gLevel++
            gCountCellClicked = 0;
            startGame();
        }
    }
}

function isGameOver() {
    if (gCountCellClicked == 36 && isOn) {
        isOn = false;
        document.querySelector('h4 span').innerHTML += `<br>` + '00:' + startTimeCounter();
        clearInterval(gInterval);
        modal('100', 'block')
        gLevel = 1;
        document.querySelector('h3 span').innerHTML = '00:00';
    }
}

function modal(opacity, display) {
    var elModal = document.querySelector('.modal');
    elModal.style.opacity = opacity + '%';
    elModal.style.display = display;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
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
        return m, ':', s
    } else {
        gStartTime = Math.floor(Date.now() / 1000);
        localStorage.setItem("startTime", gStartTime);

    }
}
function checkTime(i) {
    if (i < 10) { i = '0' + i };
    return i;
}