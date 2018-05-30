export default function GameOfLife (n) {
  this.board = []
  for (let i = 0; i < n; i++) {
    let row = []
    for (let j = 0; j < n; j++) {
      row.push(false)
    }
    this.board.push(row)
  }

  this.setCell = (row, col, value) => {
    this.board[row][col] = value
  }

  this.generation = () => {
    let copy = JSON.parse(JSON.stringify(this.board))

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        let count = this.countLiveNeighbors(i, j, copy)
        if (copy[i][j]) {
          if (count < 2 || count > 3) this.board[i][j] = false
        } else {
          if (count === 3) this.board[i][j] = true
        }
      }
    }
  }

  this.countLiveNeighbors = (row, col, board) => {
    let count = 0

    if (row === 0 && col === 0) { // top left
      if (board[row][col + 1]) count += 1
      if (board[row + 1][col]) count += 1
      if (board[row + 1][col + 1]) count += 1
    } else if (row === 0 && col === board.length - 1) { // top right
      if (board[row][col - 1]) count += 1
      if (board[row + 1][col - 1]) count += 1
      if (board[row + 1][col]) count += 1
    } else if (row === board.length - 1 && col === 0) { // bottom left
      if (board[row - 1][col]) count += 1
      if (board[row - 1][col + 1]) count += 1
      if (board[row][col + 1]) count += 1
    } else if (row === board.length - 1 && col === board.length - 1) { // bottom right
      if (board[row - 1][col - 1]) count += 1
      if (board[row - 1][col]) count += 1
      if (board[row][col - 1]) count += 1
    } else if (row === 0) { // top
      if (board[row][col - 1]) count += 1
      if (board[row][col + 1]) count += 1
      if (board[row + 1][col - 1]) count += 1
      if (board[row + 1][col]) count += 1
      if (board[row + 1][col + 1]) count += 1
    } else if (row === board.length - 1) { // bottom
      if (board[row - 1][col - 1]) count += 1
      if (board[row - 1][col]) count += 1
      if (board[row - 1][col + 1]) count += 1
      if (board[row][col - 1]) count += 1
      if (board[row][col + 1]) count += 1
    } else if (col === 0) { // left
      if (board[row - 1][col]) count += 1
      if (board[row + 1][col]) count += 1
      if (board[row - 1][col + 1]) count += 1
      if (board[row][col + 1]) count += 1
      if (board[row + 1][col + 1]) count += 1
    } else if (col === board.length - 1) { // right
      if (board[row - 1][col - 1]) count += 1
      if (board[row][col - 1]) count += 1
      if (board[row + 1][col - 1]) count += 1
      if (board[row - 1][col]) count += 1
      if (board[row + 1][col]) count += 1
    } else { // somewhere inside the board
      if (board[row - 1][col - 1]) count += 1
      if (board[row - 1][col]) count += 1
      if (board[row - 1][col + 1]) count += 1
      if (board[row][col - 1]) count += 1
      if (board[row][col + 1]) count += 1
      if (board[row + 1][col - 1]) count += 1
      if (board[row + 1][col]) count += 1
      if (board[row + 1][col + 1]) count += 1
    }
    return count
  }
}
