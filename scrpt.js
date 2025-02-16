const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(index) {
    if (board[index] === '') {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        const winningCombination = checkWin(currentPlayer);
        if (winningCombination) {
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                drawWinningLine(winningCombination);
            }, 100);
        } else if (isDraw()) {
            setTimeout(() => {
                alert(`It's a draw!`);
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin(player) {
    return winningCombinations.find(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function isDraw() {
    return board.every(cell => cell !== '');
}

function drawWinningLine(combination) {
    const [a, b, c] = combination;
    const line = document.createElement('div');

    if (a === 0 && b === 1 && c === 2) {
        line.classList.add('line-horizontal');
        line.style.top = '16.6%';
    } else if (a === 3 && b === 4 && c === 5) {
        line.classList.add('line-horizontal');
        line.style.top = '50%';
    } else if (a === 6 && b === 7 && c === 8) {
        line.classList.add('line-horizontal');
        line.style.top = '83.4%';
    } else if (a === 0 && b === 3 && c === 6) {
        line.classList.add('line-vertical');
        line.style.left = '16.6%';
    } else if (a === 1 && b === 4 && c === 7) {
        line.classList.add('line-vertical');
        line.style.left = '50%';
    } else if (a === 2 && b === 5 && c === 8) {
        line.classList.add('line-vertical');
        line.style.left = '83.4%';
    } else if (a === 0 && b === 4 && c === 8) {
        line.classList.add('line-diagonal-left');
    } else if (a === 2 && b === 4 && c === 6) {
        line.classList.add('line-diagonal-right');
    }

    document.querySelector('.board').appendChild(line);
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    const lines1 = document.querySelectorAll('.line-horizontal');
    const lines2 = document.querySelectorAll('.line-vertical');
    const lines3 = document.querySelectorAll('.line-diagonal-left');
    const lines4 = document.querySelectorAll('.line-diagonal-right');
    lines1.forEach(line => line.remove());
    lines2.forEach(line => line.remove());
    lines3.forEach(line => line.remove());
    lines4.forEach(line => line.remove());
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

document.querySelector('button').addEventListener('click', resetBoard);
