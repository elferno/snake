function Snake(field) {
  this.field = field
  this.reset()

  this.growMP3 = new Audio('../sound/grow.mp3');
  this.deadMP3 = new Audio('../sound/dead.mp3');
}

Snake.prototype = {
  reset() {

    this.cells = [
      new Cell(2, 0, this.field),
      new Cell(1, 0, this.field),
      new Cell(0, 0, this.field)
    ]

    this.cells[0].isFirstCell = true

    this.drawCells()

    this.timer = null
    this.canGrow = false

    this.speed = 300
    this.maxSpeed = 100
  },

  run() {
    this.timer = setInterval(() => this.move(), this.speed)
  },

  stop(byDeath) {
    clearInterval(this.timer)
    if (byDeath) this.deadMP3.play()
  },

  drawCells: function () {
    for (let cell of this.cells)
      cell.fill()
  },

  move() {
    let iterations = this.cells.length;
    for (let cell of this.cells) {
      cell.move(
        !--iterations,
        () => this.canGrow = true,
        this.canGrow,
        (...args) => this.canGrow = [...args]
      )
      if (cell.dead) {
        this.stop(true)
        break
      }
    }

    this.checkAlive()

    if (this.canGrow)
      this.grow(...this.canGrow)

    this.canGrow = false
  },

  grow(...args) {
    this.cells.push(new Cell(...args))
    this.drawCells()
    this.field.drop(this.cells)
    if (this.speed > this.maxSpeed) {
      this.speed -= 10
      this.stop()
      this.run()
    }

    this.growMP3.play()
  },

  checkAlive() {  // check death against itself
    const firstCellXY = this.cells[0].xy

    for (let cell of this.cells)
      if (!cell.isFirstCell) {
        if (cell.xy !== firstCellXY)
          continue

        this.stop(true)
        this.cells[0].dead = true
        this.cells[0].checkAlive()
        break
      }

  }
}