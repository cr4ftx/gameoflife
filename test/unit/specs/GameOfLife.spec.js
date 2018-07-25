import GameOfLife from '@/components/GameOfLife/GameOfLife'

describe('GameOfLife.js', () => {
  it('should init a board of 4 rows of 4 cols', () => {
    let gameOfLife = new GameOfLife(4)

    expect(gameOfLife.board.length).to.equal(4)
    for (let i = 0; i < 4; i++) {
      expect(gameOfLife.board[i].length).to.equal(4)
    }
  })

  it('should be init with false', () => {
    let gameOfLife = new GameOfLife(2)

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        expect(gameOfLife.board[i][j]).to.equal(false)
      }
    }
  })

  it('should set a cell to true', () => {
    let gameOfLife = new GameOfLife(2)

    gameOfLife.setCell(1, 1, true)
    gameOfLife.setCell(1, 0, true)

    expect(gameOfLife.board[1][1]).to.equal(true)
    expect(gameOfLife.board[1][0]).to.equal(true)
  })

  it('should count live neighbors for the top left cell', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(0, 1, true)
    gameOfLife.setCell(1, 1, true)
    gameOfLife.setCell(1, 0, true)

    expect(gameOfLife.countLiveNeighbors(0, 0, gameOfLife.board)).to.equal(3)
  })

  it('should count live neighbors for the top right cell', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(0, 1, true)
    gameOfLife.setCell(1, 1, true)
    gameOfLife.setCell(1, 2, true)

    expect(gameOfLife.countLiveNeighbors(0, 2, gameOfLife.board)).to.equal(3)
  })

  it('should count live neighbors for the bottom left cell', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(1, 0, true)
    gameOfLife.setCell(1, 1, true)
    gameOfLife.setCell(2, 1, true)

    expect(gameOfLife.countLiveNeighbors(2, 0, gameOfLife.board)).to.equal(3)
  })

  it('should count live neighbors for the bottom right cell', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(1, 1, true)
    gameOfLife.setCell(1, 2, true)
    gameOfLife.setCell(2, 1, true)

    expect(gameOfLife.countLiveNeighbors(2, 2, gameOfLife.board)).to.equal(3)
  })

  it('should count live neighbors for a top middle cell', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(0, 0, true)
    gameOfLife.setCell(0, 2, true)
    gameOfLife.setCell(1, 0, true)
    gameOfLife.setCell(1, 1, true)
    gameOfLife.setCell(1, 2, true)

    expect(gameOfLife.countLiveNeighbors(0, 1, gameOfLife.board)).to.equal(5)
  })

  it('should count live neighbors for a bottom middle cell', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(2, 0, true)
    gameOfLife.setCell(2, 2, true)
    gameOfLife.setCell(1, 0, true)
    gameOfLife.setCell(1, 1, true)
    gameOfLife.setCell(1, 2, true)

    expect(gameOfLife.countLiveNeighbors(2, 1, gameOfLife.board)).to.equal(5)
  })

  it('should count live neighbors for a left middle cell', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(0, 0, true)
    gameOfLife.setCell(2, 0, true)
    gameOfLife.setCell(0, 1, true)
    gameOfLife.setCell(1, 1, true)
    gameOfLife.setCell(2, 1, true)

    expect(gameOfLife.countLiveNeighbors(1, 0, gameOfLife.board)).to.equal(5)
  })

  it('should count live neighbors for a right middle cell', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(0, 2, true)
    gameOfLife.setCell(2, 2, true)
    gameOfLife.setCell(0, 1, true)
    gameOfLife.setCell(1, 1, true)
    gameOfLife.setCell(2, 1, true)

    expect(gameOfLife.countLiveNeighbors(1, 2, gameOfLife.board)).to.equal(5)
  })

  it('should count live neighbors for a cell inside the board', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(0, 0, true)
    gameOfLife.setCell(0, 1, true)
    gameOfLife.setCell(0, 2, true)
    gameOfLife.setCell(1, 0, true)
    gameOfLife.setCell(1, 2, true)
    gameOfLife.setCell(2, 0, true)
    gameOfLife.setCell(2, 1, true)
    gameOfLife.setCell(2, 2, true)

    expect(gameOfLife.countLiveNeighbors(1, 1, gameOfLife.board)).to.equal(8)
  })

  it('should resurrect a cell with three live neighbors', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(1, 1, true)
    gameOfLife.setCell(1, 0, true)
    gameOfLife.setCell(1, 2, true)

    gameOfLife.generation()

    expect(gameOfLife.board[0][1]).to.equal(true)
    expect(gameOfLife.board[2][1]).to.equal(true)
  })

  it('should not resurrect a cell with less than three live neighbors', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(1, 0, true)
    gameOfLife.setCell(1, 1, true)

    gameOfLife.generation()

    expect(gameOfLife.board[0][0]).to.equal(false)
    expect(gameOfLife.board[0][1]).to.equal(false)
  })

  it('should not resurrect a cell with more than three live neighbors', () => {
    let gameOfLife = new GameOfLife(3)

    gameOfLife.setCell(0, 0, true)
    gameOfLife.setCell(0, 1, true)
    gameOfLife.setCell(0, 2, true)
    gameOfLife.setCell(1, 0, true)

    gameOfLife.generation()

    expect(gameOfLife.board[1][1]).to.equal(false)
  })

  it('should kill a cell when less than 2 live neighbors', () => {
    let gameOfLife = new GameOfLife(3)
    gameOfLife.setCell(0, 1, true)

    gameOfLife.generation()

    expect(gameOfLife.board[0][1]).to.equal(false)
  })

  it('should kill a cell when more than 2 live neighbors', () => {
    let gameOfLife = new GameOfLife(3)
    gameOfLife.setCell(0, 0, true)
    gameOfLife.setCell(0, 1, true)
    gameOfLife.setCell(0, 2, true)
    gameOfLife.setCell(1, 0, true)
    gameOfLife.setCell(1, 1, true)

    gameOfLife.generation()

    expect(gameOfLife.board[0][1]).to.equal(false)
    expect(gameOfLife.board[1][1]).to.equal(false)
  })
})
