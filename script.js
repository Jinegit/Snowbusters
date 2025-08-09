const boardSize = 10;

let playerPos = { x: 0, y: 0 };

let fuel = 200;

let health = 100;

let coal = 0;

let survivors = 0;

let board = [];



function updateStats() {

    document.getElementById('fuel').textContent = fuel;

    document.getElementById('health').textContent = health;

    document.getElementById('coal').textContent = coal;

    document.getElementById('survivors').textContent = survivors;

}



function createBoard() {

    const gameBoard = document.getElementById('game-board');

    gameBoard.innerHTML = '';

    board = [];

    for (let y = 0; y < boardSize; y++) {

        let row = [];

        for (let x = 0; x < boardSize; x++) {

            const cell = document.createElement('div');

            cell.classList.add('cell', 'snow');

            cell.dataset.x = x;

            cell.dataset.y = y;

            gameBoard.appendChild(cell);

            row.push({ type: 'snow' });

        }

        board.push(row);

    }



    placeItem('coal', 10);

    placeItem('fuel', 10);

    placeItem('survivor', 5);

    placeItem('beast', 5);



    renderBoard();

}



function placeItem(type, count) {

    for (let i = 0; i < count; i++) {

        let x, y;

        do {

            x = Math.floor(Math.random() * boardSize);

            y = Math.floor(Math.random() * boardSize);

        } while ((x === 0 && y === 0) || board[y][x].type !== 'snow');

        board[y][x].type = type;

    }

}



function renderBoard() {

    for (let y = 0; y < boardSize; y++) {

        for (let x = 0; x < boardSize; x++) {

            const cell = document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);

            cell.className = 'cell';

            cell.classList.add(board[y][x].type);

            if (x === playerPos.x && y === playerPos.y) {

                cell.classList.add('player');

                cell.textContent = 'P';

            } else {

                cell.textContent = '';

            }

        }

    }

    updateStats();

}



function movePlayer(dx, dy) {

    const newX = playerPos.x + dx;

    const newY = playerPos.y + dy;

    if (newX < 0 || newX >= boardSize || newY < 0 || newY >= boardSize || fuel <= 0 || health <= 0) return;



    fuel -= 1;

    const cellType = board[newY][newX].type;



    if (cellType === 'coal') {

        coal += 1;

    } else if (cellType === 'fuel') {

        fuel += 20;

    } else if (cellType === 'survivor') {

        survivors += 1;

    } else if (cellType === 'beast') {

        health -= 20;

    }



    board[newY][newX].type = 'cleared';

    playerPos = { x: newX, y: newY };

    renderBoard();

}



document.addEventListener('keydown', (e) => {

    if (e.key === 'w') movePlayer(0, -1);

    else if (e.key === 'a') movePlayer(-1, 0);

    else if (e.key === 's') movePlayer(0, 1);

    else if (e.key === 'd') movePlayer(1, 0);

});



createBoard();