// initial game board 9 cells
var init
var human = 'X'
var ai = 'O'

var playing = 'X'

var gameWon = false

var winnig_comob = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

var cells = document.querySelectorAll('.t')
// run each time of game starts
startGame()

function startGame() {
    init = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    for(let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', clickCell)
    }
}

// this function runs when you click one of the cells
function clickCell(e) {
    // console.log(e.target.id)
    fillClickedCell(e.target.id, playing)
    console.log(document.getElementById(e.target.id))
    document.getElementById(e.target.id).removeEventListener('click', clickCell)

    if(!gameWon) {
        let aiMove = minmax(init, ai)
        console.log(aiMove)
        fillClickedCell(aiMove.index, ai)
    }
}

// set X or O to the clicked cell
function fillClickedCell(id, player) {
    init[id] = player
    document.getElementById(id).innerText = player
    gameStatus(player)
}

function gameStatus(player) {
    gameWon = checkWin(init, player)
    if(gameWon) {
        document.getElementById('res').innerText = `${player} Wins the game`
        removeEventListenerOfCells()
    }
    
    if(findEmptyCells(init).length == 0){
        document.getElementById('res').innerText = 'Draw'
        removeEventListenerOfCells()
    }
}

function removeEventListenerOfCells() {
    for(let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', clickCell)
    }
}

// find empty cells in board
function findEmptyCells(board) {
    return board.filter(cell => cell != 'X' && cell != 'O')
}

// check winning status
function checkWin(board, player) {
    for (let combo of winnig_comob) {
        let a = combo[0]
        let b = combo[1]
        let c = combo[2]
        if (board[a] == player && board[b] == player && board[c] == player) {
            return true
        }
    }

    return false
}

// minmax recursive function
function minmax(currenrBoard, player) {
    let idxOfEmptyCells = findEmptyCells(currenrBoard)

    if(checkWin(currenrBoard, human)) {
        return {score: -1}
    }
    else if(checkWin(currenrBoard, ai)) {
        return {score: 1}
    }
    else if(idxOfEmptyCells.length === 0) {
        return {score: 0}
    }

    let allTestPlay = []

    for (let i = 0; i < idxOfEmptyCells.length; i++) {
        let currentTestPlay = {}
        currentTestPlay.index = idxOfEmptyCells[i]

        currenrBoard[idxOfEmptyCells[i]] = player

        if(player == ai) {
            const result = minmax(currenrBoard, human)
            currentTestPlay.score = result.score
        }
        else if(player == human) {
            const result = minmax(currenrBoard, ai)
            currentTestPlay.score = result.score
        }

        currenrBoard[idxOfEmptyCells[i]] = currentTestPlay.index

        allTestPlay.push(currentTestPlay);
    }

    let bestMove = null

    if(player == ai) {
        let bestScore = -Infinity
        for(let i = 0; i < allTestPlay.length; i++) {
            if(allTestPlay[i].score > bestScore){
                bestScore = allTestPlay[i].score
                bestMove = i
            }
        }
    }

    else if(player == human) {
        let bestScore = Infinity
        for(let i = 0; i < allTestPlay.length; i++) {
            if(allTestPlay[i].score < bestScore){
                bestScore = allTestPlay[i].score
                bestMove = i
            }
        }
    }

    return allTestPlay[bestMove] // best result of subtree
}