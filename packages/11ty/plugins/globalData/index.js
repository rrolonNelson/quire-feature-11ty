const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const dir = path.join('content', '_data')
const files = fs.readdirSync(dir)

const loadData = (fileName) => {
  const filePath = path.join(dir, fileName)
  return yaml.load(fs.readFileSync(filePath))
}

module.exports = files.reduce((data, file) => {
  const { ext, name } = path.parse(file)
  if (!['.yml', '.yaml'].includes(ext)) return data
  data[name] = loadData(file)
  return data
}, {})
