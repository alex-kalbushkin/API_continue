//до создания этого файла (server.js) установили пакет: npm install express в терминале (появилась папка node_modules)
//запуск локального сервера (в файле script.js) => в консоли пишем node server => в адресной строке браузера пишем localhost:3000 (открыв файл index.html)

const express = require('express');   //express - пакет для backend (node.js backend)
const app = express();

app.use(express.static(__dirname));   //__dirname - директория текущая

app.get('/', function(reg, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
  console.log('Started!');
});