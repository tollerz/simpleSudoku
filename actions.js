document.querySelector('#solvePattern')
        .addEventListener('click', function() { 
            solve(document.querySelector('#pattern').value)
        }, false);

document.querySelector('#solveGrid')
        .addEventListener('click', function() {
            solveFromGrid()
        }, false);

document.querySelector('#clearGrid')
        .addEventListener('click', function() {
            clearGrid()
        }, false);

function clearGrid() {
    var inputs = document.querySelectorAll('.answer-cell');

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
};

function populateGrid() {
    var grid = sudoku.getGrid();
    var cells = document.querySelectorAll('.answer-cell');

    for (var i = 0; i < cells.length; i++) {
        cells[i].value = grid[i] || '';
    }
};

function solveFromGrid() {
    var inputs = document.querySelectorAll('.answer-cell');
    var pattern = [];

    for (var i = 0; i < inputs.length; i++) {
        pattern.push(inputs[i].value);
    }

    solve(pattern);
};

function solve(pattern) {
    sudoku.setGrid(pattern);
    
    sudoku.easyRun();
    
    populateGrid();

    console.log(sudoku.getCompletionTime());
    document.querySelector('.timer').innerHTML = sudoku.getCompletionTime();
};
