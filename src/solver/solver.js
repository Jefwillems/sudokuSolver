const findEmptyCell = (arr) => {
  for (let row = 0; row < arr.length; row += 1) {
    for (let col = 0; col < arr[row].length; col += 1) {
      if (arr[row][col] === 0) {
        return { row, col };
      }
    }
  }
  return false;
};


export const solveSudoku = ({ sudoku }) => {
  const dimension = 9;

  const tempSolution = [...sudoku];
  const solveRecursive = () => {
    const empty = findEmptyCell(tempSolution);
    if (!empty) return true;
    const { row, col } = empty;

    for (let i = 1; i <= dimension; i += 1) {
      // check if number is in row off empty cell
      const fitsInRow = tempSolution[row].findIndex(currentColumn => currentColumn === i) < 0;
      // check if number is in col of empty cell
      const fitsInCol = tempSolution.findIndex(currentRow => currentRow[col] === i) < 0;
      // check if number is in radius of empty cell
      // ? assuming the sudoku consists of 9 "3*3" cells.
      const startBlockRow = row - (row % 3);
      const startBlockCol = col - (col % 3);
      let fitsInBlock = true;
      for (let blockRow = 0; blockRow < 3; blockRow += 1) {
        for (let blockCol = 0; blockCol < 3; blockCol += 1) {
          if (tempSolution[blockRow + startBlockRow][blockCol + startBlockCol] === i) {
            fitsInBlock = false; break;
          }
        }
      }
      if (fitsInRow && fitsInCol && fitsInBlock) {
        console.log(`assigning ${i} to solution[${row}][${col}]`);
        tempSolution[row][col] = i;
        if (solveRecursive()) {
          return true;
        }
        tempSolution[row][col] = 0;
      }


      // checks pass => assign digit, continue recursively
      // if recursion returns true, solution found
      // else, try next digit
    }
    return false;
    // if all digits have been tried, and nothing worked, return false.
  };
  solveRecursive();

  return {
    dimension,
    solution: tempSolution,
  };
};
