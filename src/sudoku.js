"use strict";

var sudoku = (function (data) {
    var grid      = data;

    const possible  = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        var timer     = '';
        
        const row1      = [0, 8];
        const row2      = [9, 17];
        const row3      = [18, 26];
        const row4      = [27, 35];
        const row5      = [36, 44];
        const row6      = [45, 53];
        const row7      = [54, 62];
        const row8      = [63, 71];
        const row9      = [72, 80];

        const rows      = [row1, row2, row3, row4, row5, row6, row7, row8, row9];

        const column1   = [0, 9,  18, 27, 36, 45, 54, 63, 72];
        const column2   = [1, 10, 19, 28, 37, 46, 55, 64, 73];
        const column3   = [2, 11, 20, 29, 38, 47, 56, 65, 74];
        const column4   = [3, 12, 21, 30, 39, 48, 57, 66, 75];
        const column5   = [4, 13, 22, 31, 40, 49, 58, 67, 76];
        const column6   = [5, 14, 23, 32, 41, 50, 59, 68, 77];
        const column7   = [6, 15, 24, 33, 42, 51, 60, 69, 78];
        const column8   = [7, 16, 25, 34, 43, 52, 61, 70, 79];
        const column9   = [8, 17, 26, 35, 44, 53, 62, 71, 80];

        const columns   = [column1, column2, column3, column4, column5, column6, column7, column8, column9];

        const square1   = [0, 1, 2, 9, 10, 11, 18, 19, 20];
        const square2   = [3, 4, 5, 12, 13, 14, 21, 22, 23];
        const square3   = [6, 7, 8, 15, 16, 17, 24, 25, 26];
        const square4   = [27, 28, 29, 36, 37, 38, 45, 46, 47];
        const square5   = [30, 31, 32, 39, 40, 41, 48, 49, 50];
        const square6   = [33, 34, 35, 42, 43, 44, 51, 52, 53];
        const square7   = [54, 55, 56, 63, 64, 65, 72, 73, 74];
        const square8   = [57, 58, 59, 66, 67, 68, 75, 76, 77];
        const square9   = [60, 61, 62, 69, 70, 71, 78, 79, 80];
        
        const squares = [square1, square2, square3, square4, square5, square6, square7, square8, square9];

    //return the start index of the row
    var rowStartIndex = function(row) {
        if (row === 1) {
            return 0;
        }
        else {
            return (row * 9) - 9;
        }
    };

    // return the end index of the row
    var rowEndIndex = function(row) {
        if (row === 1) {
            return 9;
        }
        else {
            return (row * 9);
        }
    };

    // Get the remaining numbers for an array of 9 options
    var getRemainingNumbers = function(set) {
        var remaining = [];

        for (var i in possible) {
            let check = possible[i];

            if (set.indexOf(check) === -1) {
                remaining.push(possible[i]);
            }
        }

        return remaining;
    };

    // Get the row by the cells index.
    var getRowIndexByGridIndex = function(index) {
        for (var i in rows) {
            if(index >= rows[i][0] && index <= rows[i][1]) {
                return parseInt(i, 10) + 1;
            }
        }
    };

    // Get the column by the cells index.
    var getColumnIndexByGridIndex = function(index) {
        for (var i in columns) {
            if (columns[i].indexOf(index) > -1) {
                return parseInt(i, 10) + 1;
            }
        }
    };

    // Get the square by the cells index.
    var getSquareIndexByGridIndex = function(index) {
        for (var i in squares) {
            if (squares[i].indexOf(index) > -1) {
                return parseInt(i, 10) + 1;
            }
        }
    };

    // Get the values for the given row index
    var rowValues = function(row) {
        var start = rowStartIndex(row),
            end = rowEndIndex(row);
       
        return grid.slice(start, end);
    };

    // Get the values for the given column index
    var columnValues = function(column) {
        var count = 1,
            values = [];

        for (var i in grid) {
            if (count === column) {
                values.push(grid[i]);
            }
            count++;
            if (count === 10) {
                count = 1;
            }
        }

        return values;
    };

    // Get the possible numbers that can be in a cell
    var possibleValues= function(row, column, square) {
        var possible = getRemainingNumbers(row)
                        .concat(getRemainingNumbers(column))
                        .concat(getRemainingNumbers(square))
                        .filter(getUnique),
            
            notPossible = row
                            .concat(column)
                            .concat(square)
                            .filter(getUnique);

        return possible.filter(function(x) {
            return notPossible.indexOf(x) < 0; 
        });
    };

    // Return only the unique values from an array.
    var getUnique = function(value, index, self) {
        return self.indexOf(value) === index;
    };

    // Return the values for the given sudoku square.
    var squareValues = function(square) {
        var squareIndex = squares[square - 1],
            squareArray = [];

        for (var i in squareIndex){
            squareArray.push(grid[squareIndex[i]]);
        }

        return squareArray;
    };

    // Return false if the new grid is different from the old
    var matches = function(old) {
        return old.every(function(element, index) {
            return element === grid[index]; 
        });
    };

    // display the current grid
    //noinspection JSUnusedLocalSymbols
    var prettyPrint = function() {
        for ( var row = 1; row <= rows.length; row++) {
            var cleanRow = rowValues(row).map(function(item) { 
                return item === '' ? 0 : item; 
            });

            console.log(cleanRow.join(','));
        }
        console.log('\n');
    };

    return {

        getGrid: function() {
            return grid;
        },

        setGrid: function(newGrid) {
            grid = this.normalise(newGrid);
        },

        normalise: function(pattern) {
            if (typeof pattern === 'string') {
                return(pattern.split(',').map(Number));
            }
            
            if (Array.isArray(pattern)) {
                return pattern;
            }
        },

        getCompletionTime: function() {
            return timer;
        },

        // Get the row 1-9 (top to bottom) from the sudoku square.
        getRow: function(row) {
            return rowValues(row);
        },

        // Get the column 1-9 (left to right) from the sudoku square.
        getColumn: function(column) {
            return columnValues(column);
        },

        // Get the square 1-9 (left to right) from the sudoku square.
        getSquare: function(square) {
            return squareValues(square);
        },

        // return the remaining numbers for a given array of 9 numbers.
        getPossibleNumbers: function(set) {
            return getRemainingNumbers(set);
        },

        getCellPossibleSolutions: function(cell) {
            if (grid[cell] !== 0) {
                return grid[cell];
            }
            else {
                var row    = this.getRowByCellIndex(cell),
                    column = this.getColumnByCellIndex(cell),
                    square = this.getSquareByCellIndex(cell);

                return possibleValues(row, column, square);
            }
        },

        getRowByCellIndex: function(cell) {
            return this.getRow(getRowIndexByGridIndex(cell));
        },

        getColumnByCellIndex: function(cell) {
            return this.getColumn(getColumnIndexByGridIndex(cell));
        },

        getSquareByCellIndex: function(cell) {
            return this.getSquare(getSquareIndexByGridIndex(cell));
        },

        easySolveCell: function(cell) {
            var solutions = this.getCellPossibleSolutions(cell);
            
            if (solutions.length === 1) {
                grid[cell] = solutions[0];
            }
        },

        easySolveGrid: function() {
            var oldGrid = grid.slice();

            for (var i = 0; i < grid.length; i++) {
                this.easySolveCell(i);
            }

            if (!matches(oldGrid)) {
                this.easySolveGrid();
            }
        },

        easyRun: function() {
            var t0 = Date.now();
            
            this.easySolveGrid();

            // prettyPrint();

            var t1 = Date.now();

            timer = 'Execution time: ' + (t1 - t0) + ' milliseconds';
        }
    };
})();

//Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = sudoku;
} 
