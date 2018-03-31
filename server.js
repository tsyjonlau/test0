const express = require('express');

const Sequelize = require('sequelize');

const dbConfig = require('./config');

/* 
** Database
*/
const sequelize = new Sequelize('mysql://' + dbConfig.user + ':' + dbConfig.password + '@localhost:3306/technical_test');

const Alerts = sequelize.define('alerts', {
  client: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW 
  },
  summary: {
    type: Sequelize.STRING
  },
});

// Create examples for test
Alerts.sync({force: true}).then(() => {
  return Alerts.create({
    client: 'John',
    status: 'new',
    category: 'dark web',
    score: 50,
    summary: 'a simple test alert'
  }).then(() => {
    return Alerts.create({
      client: 'Smith',
      status: 'investigating',
      category: 'deep web',
      score: 50,
      summary: 'another simple test alert'
    })
  });
});

/*
** API routes
*/
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/alerts', (req, res) => {
  Alerts.findAll().then(alerts => {
    res.send(JSON.stringify(alerts));
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));