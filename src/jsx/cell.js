function Cell(x, y, field, direction = 'RIGHT') {
  this.field = field
  this.position = {x: x, y: y}
  this.direction = direction
  this.dead = false
  this.isFirstCell = false
}

Cell.prototype = {
  move(isLastCell, canGrowCallback, canGrow, growCallback) {
    this.checkTwist(isLastCell)
    this.clear()

    if (canGrow && isLastCell) growCallback(
      this.position.x,
      this.position.y,
      this.field,
      this.direction
    )

    this.go(1)

    if (this.isFirstCell)
      this.checkApple(canGrowCallback)

    this.checkAlive()
  },

  go(offset) {
    switch (this.direction) {
      case 'RIGHT': this.position.x += offset; break;
      case 'LEFT' : this.position.x -= offset; break;
      case 'DOWN' : this.position.y += offset; break;
      case 'UP'   : this.position.y -= offset; break;
    }
  },


  checkAlive() {
    if(!this.dead)  // check death against the wall
      this.dead = this._currentFieldCell === null

    if(this.dead) this.die()
    else this.fill()
  },

  checkTwist(isLastCell) {
    if (this.field.twistCell[this.xy])
      this.direction = this.field.twistCell[this.xy]

    if (isLastCell)
      delete this.field.twistCell[this.xy]
  },

  checkApple(canGrowCallback) {
    if (this.field.apple === this.xy) {
      this._currentFieldCell.classList.remove('apple')
      canGrowCallback()
    }
  },




  clear() {
    this._currentFieldCell.classList.remove('filled')
  },

  fill() {
    this._currentFieldCell.classList.add('filled')
  },

  die() {
    this.go(-1)
    this._currentFieldCell.classList.add('dead')
  },


  get xy() {
    return `${this.position.x}-${this.position.y}`
  },

  get _currentFieldCell() {
    return qs(`c-${this.position['x']}-${this.position['y']}`)
  },
}