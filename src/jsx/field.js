function Field(cellsAmount) {
  this.cellsAmount = cellsAmount
  this.twistCell = {}
  this.apple = null
  this.drowFields()
}

Field.prototype = {
  drowFields: function() {
    for(let i = 0; i < this.cellsAmount; i++) {
      let cell = document.createElement('b')
      cell.dataset.code = `${i%10}-${parseInt(i/10)}`
      cell.id = `c-${cell.dataset.code}`
      qs('field').appendChild(cell)
      cell = null
    }
  },

  setTwist(e, cell) {
    const _xy = `${cell.xy}`,
          _direction = cell.direction

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (_direction !== 'DOWN')
          this.twistCell[_xy] = 'UP'
        break

      case 'ArrowDown':
      case 's':
        if (_direction !== 'UP')
          this.twistCell[_xy] = 'DOWN'
        break

      case 'ArrowLeft':
      case 'a':
        if (_direction !== 'RIGHT')
          this.twistCell[_xy] = 'LEFT'
        break

      case 'ArrowRight':
      case 'd':
        if (_direction !== 'LEFT')
          this.twistCell[_xy] = 'RIGHT'
        break
    }
  },

  drop() {
    let fields = [...qs('b', 'tag', qs('field'))]
    fields = fields.filter(item => !item.classList.contains('filled'))

    this.apple = fields[Math.floor(Math.random() * fields.length)].dataset.code

    qs(`c-${this.apple}`).classList.add('apple')
  },

  reset() {
    this.twistCell = {}
    qs('field').innerHTML = ''
    this.drowFields()
  }
}