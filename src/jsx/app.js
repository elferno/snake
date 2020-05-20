@@include('system.js');
@@include('field.js');
@@include('cell.js');
@@include('snake.js');

function appCreate() {
  const field = new Field(100)
  let snake = new Snake(field)

  qs('move').addEventListener('click', () => reload(field, snake))
  document.addEventListener('keyup', e => field.setTwist(e, snake.cells[0]))

  setTimeout(() => snake.run(), 500)
  field.drop()
}

function reload(field, snake) {
  snake.stop()
  field.reset()
  snake.reset()
  setTimeout(() => snake.run(), 500)
  field.drop()
}

document.addEventListener('DOMContentLoaded', appCreate)