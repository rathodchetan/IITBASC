const { Client } = require('pg');
var path = require('path');
var filepath = path.join(__dirname, '../config.txt');
console.log(filepath)
const fs = require('fs');
const filedata = fs.readFileSync(path.join(__dirname, '../config.txt'), {
    encoding: 'utf-8',
    flag: 'r'
});

const db = new Client(JSON.parse(filedata));
db.connect();
// const db = 'hel'
module.exports = db;
