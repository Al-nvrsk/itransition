## Task 3

For those who have already sent #1 and #2.
Using the language of your choice — Java/C#/PHP/JavaScript/TypeScript/Ruby — write a script that implements a generalized rock-paper-scissors game (with the supports of arbitrary odd number of arbitrary combinations).
When launched with command line parameters (arguments to the main or Main method in the case of Java or C#, sys.argv in Python, process.argv in Node.js, etc.) it accepts an odd number >=3 non-repeating strings (if the arguments are incorrect, you must display a neat error message - what exactly is wrong and an example of how to do it right). All messages should be in English. These passed strings are moves (for example, Rock Paper Scissors or Rock Paper Scissors Lizard Spock or 1 2 3 4 5 6 7 8 9).

Important: moves are passed as command line arguments, you don't parse them from the input stream (for example, a move may contain a space, but it shouldn't matter to your code).
The victory is defined as follows - half of the next moves in the circle wins, half of the previous moves in the circle lose (the semantics of the strings-moves is not important, he plays by the rules build upon the moves order the user used, even if the stone loses to scissors in its order - the contents of the strings-moves are not important for you).
The script generates a cryptographically strong random key (SecureRandom, RandomNumberGenerator, etc. - mandatory!) with a length of at least 256 bits, makes computes move, calculates HMAC (based on SHA2 or SHA3) from the own move with the generated key, displayed the HMAC to the user. After that the user gets "menu" 1 - Stone, 2 - Scissors, ...., 0 - Exit. The user makes his choice (in case of incorrect input, the "menu" is displayed again). The script shows who won, the move of the computer and the original key.

Re-read the paragraph above, the sequence is critical (it simply doesn't make sense to do it differently, for example, showing the key before the user's turn or HMAC instead of the key).
Thus the user can check that the computer plays fair (did not change its move after the user's move).

When you select the "help" option in the terminal, you need to display a table (ASCII-graphic) that determines which move wins.

The table generation should be in a separate class, the definition of the "rules" who won should be in a separate class, the key generation and HMAC functions should be in a separate class (at least 4 classes in total). You should use the core class libraries and third-party libraries to the maximum, and not reinvent the wheel. Help should be formatted as an N + 1 by N + 1 table, where N is the number of moves (determined by the number of arguments passed to the script). +1 to add a title for the rows and a title for the columns (contain the title of the move). Cells can contain Win/Lose/Draw.

THE NUMBER OF MOVES CAN BE ARBITRARY (odd and > 1, depending on the passed parameters), it is not hardwired into the code. 
Example:

>java -jar game.jar rock paper scissors lizard Spock
HMAC: FAAC40C71B4B12BF0EF5556EEB7C06925D5AE405D447E006BB8A06565338D411
Available moves:
1 - rock
2 - paper
3 - scissors
4 - lizard
5 - Spock
0 - exit
? - help
Enter your move: 2
Your move: paper
Computer move: rock
You win!
HMAC key: BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2
To submit the solution  you need to send to ...:
1) a link to a video demonstrating launch with 3 and 7 parameters, launch with incorrect parameters (repeated or even number, one or no), help table generation (on 5 parameters), choice of the user move, output of results;
2) source code link to github.
And as an explanation: when calculating HMAC, the key is the same secret key that you generated. And the message is a move string. After own move the user obtains a key and the computer's move& And the user will be able to calculate the HMAC and compare with the HMAC that was shown before the user's move. It's not very difficult 🙂

A common mistake is trying to invent your "HMAC" as a hash of a random "key". This will not work. If you show the same lines before the move and after the move, the user does not receive new information after the move and, accordingly, you do not prove anything to him. It is necessary to generate a key (with a secure generator), make a computer move, calculate HMAC (by a standard algorithm) from a computer move (message) and a key (key), show HMAC, get a user move, show a key. Re-read this paragraph until the total comprehension.

The example of the "correct" order (although the user may use a different order and play a game of scissors defeating rock; or play a game of MOVE1 MOVE2 MOVE3): STONE PAPER SCISSORS or STONE SPOCK PAPER LIZARD SCISSORS.

## Задача 3

ДЛЯ ВСЕХ НАПРАВЛЕНИЙ

Для тех, кто уже прислал №1 и №2.
На языке на выбор (из Java/C#/PHP/JavaScript/TypeScript/Ruby) реализовать скрипт, который реализует обобщенную игру камень-ножницы-бумага (любое число произвольных комбинаций).
При запуске параметрами командной строки (аргументы метода main или Main в случае Java или C#, sys.argv в Python, process.argv под Node.js и т.д.) передаётся нечётное число >=3 неповторяющихся строк (при неправильно заданных аргументах необходимо вывести аккуратное сообщение об ошибке — что именно неверно, пример как правильно). Все сообщения на английском языке. Эти строки — это ходы (например, Камень Ножницы Бумага или Камень Ножницы Бумага Ящерица Спок или 1 2 3 4 5 6 7 8 9).

Важно: ходы передаются аргументами командной строки, вы их не парсите из потока ввода (например, ход может содержать пробел, но для вашего кода это не должно иметь никакого значения).
Победа определяется так — половина следующих по кругу выигрывает, половина предыдущих по кругу проигрывает (семантика строк не важна, в какой последовательности что пользователь ввел, в такую игру и играет, даже если по его порядку камень проигрывает ножницам — для вас содержимое строк не важно).
Скрипт генерирует криптографически стойкий случайный ключ случайный ключ (SecureRandom, RandomNumberGenerator и т.п. — обязательно!) длиной не менее 256 бит, делает свой ход, вычисляет HMAC (на базе SHA2 или SHA3) от хода со сгенерированным ключом, показывает пользователя HMAC. После этого пользователь получает "меню" 1 - Камень, 2 - Ножницы, ...., 0 - Exit. Пользователь делает свой выбор (при некорректном вводе опять отображается "меню"). Скрипт показывает кто победил, ход компьютера и исходный ключ.

Перечитайте абзац выше, последовательность критически важна (в другой последовательности просто нет смысла, например, показывать ключ до хода пользователя или HMAC вместо ключа).
Таким образом, пользователь может проверить, что компьютер играет честно (не поменял свой ход после хода пользователя).

При выборе опции "help" в терминале нужно отобразить таблицу, определяющую какой ход выигрывает.
Генерация таблицы должна быть вынесена в отдельный класс, определение "правил" кто победил должно быть в отдельном классе, функции генерации ключа и HMAC должны быть в отдельном классе (всего 4 класса). По максимуму следует использовать базовые библиотеки классов и сторонние библиотеки, а не изобретать велосипед. Помощь нужно оформлить в виде таблицы N + 1 на N + 1, где N - число ходов (определяется числом переданных в скрипт аргументов). +1 потому, чтобы добавить заголовок для строк и заголовок для колонок (содержат название хода). В ячейках может быть Win/Lose/Draw.
ЧИСЛО ХОДОВ МОЖЕТ БЫТЬ ЛЮБЫМ (нечетным > 1, зависит от переданных параметров), не зашито в коде.
Пример:

`>java -jar game.jar rock paper scissors lizard Spock`
`HMAC: FAAC40C71B4B12BF0EF5556EEB7C06925D5AE405D447E006BB8A06565338D411`
`Available moves:`
`1 - rock`
`2 - paper`
`3 - scissors`
`4 - lizard`
`5 - Spock`
`0 - exit`
`? - help`
`Enter your move: 2`
`Your move: paper`
`Computer move: rock`
`You win!`
`HMAC key: BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2`
Для сдачи нужно прислать на ...:
1) ссылку на видео, демонстрирующее запуск с 3 и 7 параметрами, запуск с неправильными параметрами (повторение или чётное число, один или отсутствие), генерацию таблицы помощи (на 5 параметрах), выбор хода, вывод результатов;
2) исходный код ссылкой на гитхаб.
И как пояснение: при вычислении HMAC ключ — это тот самый секретный ключ, который вы сгенерировали. А сообщение — это ход (прямо вот строка хода). После хода пользователя у него будет ключ, ход компьютера, пользователь сможет вычислить HMAC и сравнить с HMAC-ом, который был показан до хода пользователя. Это не очень сложно :))
Частая ошибка — попытка изобрести свой "HMAC" как хэш от случайного "ключа". Так не пойдёт. Если вы показываете одинаковые строки до хода и после хода, пользователь после хода не получает новой информации и, соответсвенно, вы ничего ему не доказываете. Нужно сгенерировать ключ (безопасным генератором), сделать ход компа, вычислить HMAC (стандартным алгоритмом) от хода компа (сообщение) и ключа (ключ), показать HMAC, получить ход пользователя, показать ключ. Перечитывать этот абзац до полного вкуривания.
"Правильный" порядок (хотя пользователь может использовать другой порядок и играть в игру, в которой ножницы побеждают камень; или играть в игру ХОД1 ХОД2 ХОД3): КАМЕНЬ БУМАГА НОЖНИЦЫ или КАМЕНЬ СПОК БУМАГА ЯЩЕРИЦА НОЖНИЦЫ.

