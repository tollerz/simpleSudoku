var sudoku = require('./sudoku.js');

describe("Sudoku", function() {
    var testPattern = '5,3,,,7,,,,,6,,,1,9,5,,,,,9,8,,,,,6,,8,,,,6,,,,3,4,,,8,,3,,,1,7,,,,2,,,,6,,6,,,,,2,8,,,,,4,1,9,,,5,,,,,8,,,7,9';

    var solve1    = [5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9];

    var solution1 = [5,3,4,6,7,8,9,1,2,6,7,2,1,9,5,3,4,8,1,9,8,3,4,2,5,6,7,8,5,9,7,6,1,4,2,3,4,2,6,8,5,3,7,9,1,7,1,3,9,2,4,8,5,6,9,6,1,5,3,7,2,8,4,2,8,7,4,1,9,6,3,5,3,4,5,2,8,6,1,7,9];

    beforeEach(function() {
      sudoku.setGrid(testPattern);
    });

    describe("FETCH VALUES CORRECTLY FROM THE GRID", function() {

        it("new grid set correctly", function() {
            expect(sudoku.getGrid()).toEqual(solve1);
        });

        describe("Return rows by row index (1 based)", function() {

            it("return row 1 correct", function() {
                expect(sudoku.getRow(1)).toEqual([5,3,0,0,7,0,0,0,0]);
            });

            it("return row 2 correct", function() {
                expect(sudoku.getRow(2)).toEqual([6,0,0,1,9,5,0,0,0]);
            });

            it("return row 9 correct", function() {
                expect(sudoku.getRow(9)).toEqual([0,0,0,0,8,0,0,7,9]);
            });
        });

        describe("Return columns by column index (1 based)", function() {
            
            it("return column 1 correct", function() {
                expect(sudoku.getColumn(1)).toEqual([5,6,0,8,4,7,0,0,0]);
            });

            it("return column 2 correct", function() {
                expect(sudoku.getColumn(2)).toEqual([3,0,9,0,0,0,6,0,0]);
            });

            it("return column 9 correct", function() {
                expect(sudoku.getColumn(9)).toEqual([0,0,0,3,1,6,0,5,9]);
            });
        });

        describe("Return square by square index (1 based) left to right", function() {
            
            it("return square 1 correct", function() {
                expect(sudoku.getSquare(1)).toEqual([5,3,0,6,0,0,0,9,8]);
            });

            it("return square 2 correct", function() {
                expect(sudoku.getSquare(2)).toEqual([0,7,0,1,9,5,0,0,0]);
            });

            it("return square 4 correct", function() {
                expect(sudoku.getSquare(4)).toEqual([8,0,0,4,0,0,7,0,0]);
            });

            it("return square 9 correct", function() {
                expect(sudoku.getSquare(9)).toEqual([2,8,0,0,0,5,0,7,9]);
            });
        });

        describe("The possible remaining number in a given set of 9 values", function() {
            
            it("return remaining numbers from 1 dimension", function() {
                expect(sudoku.getPossibleNumbers([2,8,0,0,0,5,0,7,9])).toEqual([1,3,4,6]);
            });

            it("return remaining numbers from 1 dimension (ALL)", function() {
                expect(sudoku.getPossibleNumbers([0,0,0,0,0,0,0,0,0])).toEqual([1,2,3,4,5,6,7,8,9]);
            });
        });

        describe("Get a row index from a cell index", function() {
            
            it("return row index by cell index 1", function() {
                expect(getRowIndexByGridIndex(5)).toEqual(1);
            });

            it("return row index by cell index 40", function() {
                expect(getRowIndexByGridIndex(40)).toEqual(5);
            });

            it("return row index by cell index 80", function() {
                expect(getRowIndexByGridIndex(80)).toEqual(9);
            });
        });

        describe("Get a column index from a cell index", function() {
            
            it("return column index by cell index 1", function() {
                expect(getColumnIndexByGridIndex(5)).toEqual(6);
            });

            it("return column index by cell index 40", function() {
                expect(getColumnIndexByGridIndex(40)).toEqual(5);
            });

            it("return column index by cell index 80", function() {
                expect(getColumnIndexByGridIndex(80)).toEqual(9);
            });
        });

        describe("Get a square index from a cell index", function() {
            
            it("return square index by cell index 1", function() {
                expect(getSquareIndexByGridIndex(5)).toEqual(2);
            });

            it("return square index by cell index 40", function() {
                expect(getSquareIndexByGridIndex(40)).toEqual(5);
            });

            it("return square index by cell index 80", function() {
                expect(getSquareIndexByGridIndex(80)).toEqual(9);
            });
        });

        describe("Return the values for the row that contains the cell index", function() {

            it("return row for cell index 5", function() {
                expect(sudoku.getRowByCellIndex(5)).toEqual([5,3,0,0,7,0,0,0,0]);
            });

            it("return row for cell index 75", function() {
                expect(sudoku.getRowByCellIndex(75)).toEqual([0,0,0,0,8,0,0,7,9]);
            });
        });

        describe("Return the values for the column that contains the cell index", function() {

            it("return column for cell index 5", function() {
                expect(sudoku.getColumnByCellIndex(5)).toEqual([0,5,0,0,3,0,0,9,0]);
            });

            it("return column for cell index 8", function() {
                expect(sudoku.getColumnByCellIndex(8)).toEqual([0,0,0,3,1,6,0,5,9]);
            });

            it("return column for cell index 80", function() {
                expect(sudoku.getColumnByCellIndex(80)).toEqual([0,0,0,3,1,6,0,5,9]);
            });
        });

        describe("Return the values for the square that contains the cell index", function() {

            it("return square for cell index 2", function() {
                expect(sudoku.getSquareByCellIndex(2)).toEqual([5,3,0,6,0,0,0,9,8]);
            });

            it("return square for cell index 4", function() {
                expect(sudoku.getSquareByCellIndex(4)).toEqual([0,7,0,1,9,5,0,0,0]);
            });
        });
    });
        
    describe("CALCULATE POSSIBLE VALUES", function() {
        
        describe("Test the possible values remaining for a given cell index (zero based)", function() {
            
            it("return possible solutions for an already populated cell", function() {
                expect(sudoku.getCellPossibleSolutions(0)).toEqual(5);
            });

            it("return possible solutions for cell index 2", function() {
                expect(sudoku.getCellPossibleSolutions(2)).toEqual([1,2,4]);
            });

            it("return possible solutions for cell index 62", function() {
                expect(sudoku.getCellPossibleSolutions(62)).toEqual([4]);
            });
        });

        describe("Populate Value if only option", function() {

            it("Populate value for cell index 62", function() {
                sudoku.easySolveCell(62);
                expect(sudoku.getCellPossibleSolutions(62)).toEqual(4);
            });

            it("Single run for whole grid", function() {
                sudoku.easyRun();
                expect(sudoku.getCellPossibleSolutions(62)).toEqual(4);
            });
        });
    });

    describe("ALL POSSIBLE VALUES REMAINS UP TO DATE", function() {

        it("possible values data object updated when possible values fetched", function() {
            expect(sudoku.setPossibleSolutions(1, [1,2,3])).toEqual({1: [1,2,3]});
        });

    });
});