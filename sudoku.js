var sudoku = (function (grid) {
    var grid      = grid,

        possible  = ['1', '2', '3', '4', '5', '6', '7', '8', '9' ],

        square1   = [0, 1, 2, 9, 10, 11, 18, 19, 20],
        square2   = [3, 4, 5, 12, 13, 14, 21, 22, 23],

                   [5, 14, 23, 32, 41, 50, 59, 68, 77],
                   [6, 15, 24, 33, 42, 51, 60, 69, 78],
                   [7, 16, 25, 34, 43, 52, 61, 70, 79],
                   [8, 17, 26, 35, 44, 53, 62, 71, 80]],

        squares = [square1, square2, square3, square4, square5, square6, square7, square8, square9];

    //return the start index of the row
    rowStartIndex = function(row) {
        if (row === 1) {
            return 0;
        }
        else {
            return (row * 9) - 9;
        }
    };

    // return the end index of the row
    rowEndIndex = function(row) {
        if (row === 1) {
            return 9;
        }
        else {
            return (row * 9);
        }
    };

    // Get the remaining numbers for an array of 9 options
    getRemainingNumbers = function(set) {
        var remaining = [];

        for (i in possible) {
            if (set.indexOf(possible[i]) === -1) {
                remaining.push(possible[i]);
            }
        }

        return remaining;
    };

    getCurrentNumbers = function(set) {

    }

    // Get the row by the cells index.
    getRowIndexByGridIndex = function(index) {
        for (i in rows) {
            if(index >= rows[i][0] && index <= rows[i][1]) {
                return parseInt(i, 10) + 1;
            }
        }
    };

    // Get the column by the cells index.
    getColumnIndexByGridIndex = function(index) {
        for (i in columns) {
            if (columns[i].indexOf(index) > -1) {
                return parseInt(i, 10) + 1;
            }
        }
    };

    // Get the square by the cells index.
    getSquareIndexByGridIndex = function(index) {
        for (i in squares) {
            if (squares[i].indexOf(index) > -1) {
                return parseInt(i, 10) + 1;
            }
        }
    };

    // Get the values for the given row index
    rowValues = function(row) {
        var start = rowStartIndex(row),
            end = rowEndIndex(row);
       
        return grid.slice(start, end);
    };

    // Get the values for the given column index
    columnValues = function(column) {
        var count = 1,
            values = [];

        for (i in grid) {
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
    possibleValues= function(row, column, square) { 
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
    getUnique = function(value, index, self) {
        return self.indexOf(value) === index;
    };

    // Return the values for the given sudoku square.
    squareValues = function(square) {
        var squareIndex = squares[square - 1],
            squareArray = [];

        for (i in squareIndex){
            squareArray.push(grid[squareIndex[i]]);
        }

        return squareArray;
    };

    // Return false if the new grid is different from the old
    matches = function(old) {
        return old.every(function(element, index) {
            return element === grid[index]; 
        });
    };

    // display the current grid
    prettyPrint = function() {
        for ( row = 1; row <= rows.length; row++) {
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
            grid = newGrid;
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
            if (grid[cell] !== '') {
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
            var t0 = performance.now()
            // var start = new Date().getTime();
            
            this.easySolveGrid();

            prettyPrint();

            var t1 = performance.now()
            // var end = new Date().getTime(),
            //     time = end - start;
            console.log('Execution time: ' + (t1 - t0) + ' milliseconds');
        },
    };
})();
    
