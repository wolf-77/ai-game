// initial game board 9 cells
var init
var human = 'X'
var ai = 'O'

var playing = 'X'

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
    init = ['', '', '', '', '', '', '', '', '']
    for(let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', cellClick)
    }
}

// this function runs when you click one of the cells
function cellClick(e) {
    // console.log(e.target.id)
    fillCell(e.target.id, playing)
    console.log(document.getElementById(e.target.id))
    document.getElementById(e.target.id).removeEventListener('click', cellClick)

    if (playing == human) {
        playing = ai
    } else {
        playing = human
    }
}

// set X or O to the clicked cell
function fillCell(id, player) {
    init[id] = player
    document.getElementById(id).innerText = player

    let gameWon = checkWin(init, player)
    if(gameWon) {
        document.getElementById('res').innerText = `${player} Wins the game`
        removeEventListenerOfCells()
    }
    
    // if(!init.includes('') && gameWon == false){
    //     document.getElementById('res').innerText = 'Draw'
    //     removeEventListenerOfCells()
    // }
}

// check winning status
function checkWin(board, player) {
    // a = array
    // e = elemnt
    // i = index
    let plays = board.reduce((a, e, i) => e === player ? a.concat(i) : a, []);

    let gameWon = null

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

function removeEventListenerOfCells() {
    for(let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', cellClick)
    }
}