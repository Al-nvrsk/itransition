## Task 2 (ALL GROUPS)

Language: either JavaScript or TypeScript or Java or C# or Python or Ruby or anything you like.
1. Calculate SHA3-256 for every file from archive (https://www.dropbox.com/s/oy2668zp1lsuseh/task2.zip?dl=1). Note, files are binary, you don’t need encodings — if you read file to string with some encoding, you have to use the same encoding to decode string into bytes for hashing (there is a technical term for such conversions — “stupid activity”).
2. Write hashes as 64 hex digits in lower case.
3. Sort (ascending) hashes as strings (not chars in hashes, but hashes as whole).
4. Join sorted hashes without any separator.
5. Concatenate resulted string with your e-mail in lowercase.
6. Find the SHA3-256 of the result string.
Send obtained 64 hex digits in the lower case to ilearning.task2@gmail.com.
Note: SHA3-256 is not the same algorithm as SHA-256. 

Some additional hints (based on the experience of previous groups): check if you use SHA3-256, check if you process exactly 256 required files (not everything in the some directory), check if you concatenate your strings without separator — beware of JavaScript's join! — check if you write e-mail in lower case and send e-mail from the same address you used in code. And, of course, you have to calculate separate hash for every file, not to update the same hash with every file.

!Never work with binary files in text editors — if your IDE, e.g., changes automagically even a single byte, your wont get a proper result (redownload files if necessary).


## Задача 2

ЗАДАНИЕ 2 (ДЛЯ ВСЕХ НАПРАВЛЕНИЙ)

Можно использовать любой язык (руками сложновато это сделать).
1. Для всех файлов из архива https://www.dropbox.com/s/oy2668zp1lsuseh/task2.zip?dl=1 необходимо вычислить значение SHA3-256 от содержимого файла (обратите внимание, файлы двоичные, "кодировки" в этом задании никак не должны возникнуть — если вы вычитывается файл в обычную, не байтовую, строку с использованием кодировки, то перед засовыванием в хеш вам нужно будет сделать обратное раскодирование с той же кодировкой; но тут лучше с кодировками вообще не заморачиваться). 
2. Результат представить как 64 шестнадцатеричных цифры (в нижнем регистре). 
3. Полученные строки-хеши нужно отсортировать по возрастанию (не символы внутри хеша, а хеши между собой).
4.  Склеить хеши без сепаратора.
5. К результату приклеить свой e-mail в нижнем регистре (тот, который вы указывали при регистрации на курсы и с которого будете отправлять ответ). 
6. Вычислить SHA3-256 от полученной строки.
Результирующие 64 шестнадцатеричных цифры (в нижнем регистре) нужно отправить на адрес ilearning.task2@gmail.com в теле письма.

Hint: SHA-256 — это не SHA3-256
Несколько дополнительных советов (на основе опыта предыдущих групп): проверьте, что вы используете именно SHA3-256, проверьте, что вы обрабатываете именно 256 требуемых файлов (а не все файлы в некой папке), проверьте, что вы склеиваете строки без разделителя — внимательно с join в JavaScript — проверьте, что e-mail записан в нижнем регистре и вы отправлете именно с того адреса, который использовали в коде. И, конечно, нужно вычислять отдельный хеш для каждого файла, а не дописывать файлы в один и тот же хеш.

!Никогда не работайте с двоичными файла в текстовом редакторе — если, например, ваша IDE изменит автомагически даже единственный байт,  верного результата вы уже не получите (перекачайте файлы при необходимости).
