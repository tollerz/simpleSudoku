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


enableGridNavigation(document.querySelectorAll('.answer-cell'));

function enableGridNavigation(inputs) {
    for (var i = 0; i < inputs.length; i++) {
        setNavigationEvents(inputs[i]);
    }
};

function setNavigationEvents(input) {
    input.addEventListener('keydown', function(event) {

        var cellAttributes = input.getAttribute('id').split('');
        var row = cellAttributes[1];
        var column = cellAttributes[3];
        var keycode = event.keyCode || event.which; // cross-browser compatible

        //LEFT
        if (keycode === 37) {
            if (column > 1) {
                // var newInput = document.querySelector('#r' + row + 'c' + (parseInt(column, 10) - 1));
                selectInput('#r' + row + 'c' + (parseInt(column, 10) - 1));
            }
        }
        //RIGHT
        if (keycode === 39) {
            if (column < 9) {
                selectInput('#r' + row + 'c' + (parseInt(column, 10) + 1));
            }
        }
        //UP
        if (keycode === 38) {
            if (row > 1) {
                selectInput('#r' + (parseInt(row, 10) - 1) + 'c' + column);
            }
        }
        //DOWN
        if (keycode === 40) {
            if (row < 9) {
                selectInput('#r' + (parseInt(row, 10) + 1) + 'c' + column);
            }
        }
    }, false);
};

function selectInput(selector) {
    var el = document.querySelector(selector);

    el.focus();
    setTimeout(function(){
        el.setSelectionRange(0, el.value.length);
    }, 0);
};

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
