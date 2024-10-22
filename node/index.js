const express = require('express')
const mysql = require('mysql')
const { faker } = require('@faker-js/faker')

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const app = express()

app.get('/', (request, response) => {
  const connection = mysql.createConnection(dbConfig)
  const query = `INSERT INTO people SET ?`
  connection.query(query, { name: faker.person.firstName() });
  const queryData = `SELECT name FROM people`
  connection.query(queryData, function(_err, result, _fields) {
    connection.end()
    response
      .send(
        `<h1>Full Cycle Rocks!</h1>\n
        <h2>Lista de nomes cadastrada no banco de dados.</h2>\n
        <ul>${result.map(r => (`<li>${r.name}</li>`)).join('')}</ul>`
      )
  })
})
  
app.listen(3000, () => {
  console.log('Server is running!')

  const connection = mysql.createConnection(dbConfig)

  const createSql = `
    CREATE TABLE IF NOT EXISTS people (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(50),
      PRIMARY KEY (id));
  `;

  connection.query(createSql)
  connection.end();
})
