const fs = require('fs');
const crypto = require('crypto');

const folderPath = './task2/data';
const hashes = [];

// Получение списка файлов в папке
const files = fs.readdirSync(folderPath);
// Цикл по всем файлам в папке
for (const file of files) {
  const filePath = `${folderPath}/${file}`;
  
  // Чтение содержимого файла
  const fileContent = fs.readFileSync(filePath);
  
  // Вычисление SHA3-256 хэша содержимого файла
  const hash = crypto.createHash('sha3-256').update(fileContent).digest('hex');
  // Добавление хэша в массив
  hashes.push(hash);
}
// console.log(hashes.length)
hashes.sort().push('batuten.mail@gmail.com')
const result = crypto.createHash('sha3-256').update(hashes.join('')).digest('hex')

console.log(result); // Вывод всех хэшей в консоль
