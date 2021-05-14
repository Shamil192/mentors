const { connect } = require('mongoose')
const { dbConnectionURL, options } = require('./config')
const app = require("../app");
const chalk = require('chalk')



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(chalk.yellow('Сервер газанул ', PORT))
  connect(dbConnectionURL, options, (err) => {
    if (err) return console.log(err)
    console.log(chalk.green('База рванула'))
  })
})

module.exports = connect
