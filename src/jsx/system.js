const delay = (ms = 1000) => new Promise(resolve => {setTimeout(resolve, ms)})

const qs = (item, method = 'id', parent = document) => {
  let func = 'querySelector'
  if(method === 'tag') func = 'querySelectorAll'

  if(method === 'id') item = '#' + item
  if(method === 'class') item = '.' + item

  return parent[func](item)
}

function line(ln) {
  return ln.replace(/(\r\n|\n|\r|\s{2,})/gm, '')
}