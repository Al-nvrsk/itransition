## Task 1

ou have to send a public Dropbox link to your lcs.js file to ilearning.task1@gmail.com (only public Dropbox links are accepted, don’t attach files, don’t upload files to other services; public Dropbox link looks like https://www.dropbox.com/s/s0mele77er5andnumber5/lcs.js?dl=1 — but it's not a real link, it's just an example).
Submitted solutions are checked by script, it’s useless to write descriptions or instructions.
If you get an answer it means that solution is linked to the used e-mail, so you have to use e-mail specified during course enrollment.
If you didn’t get an answer for two hours, just describe the situation via e-mail.
Task per se
You have to write a JavaScript code that prints the longest common substring of passed arguments (with trailing newline — just use console.log for output).
The code will be running under Node.js and arguments will be passed via command line (you should not read standard input stream).
If the longest common superstring is empty (no arguments are passed or arguments have no common substrings) it’s necessary to print single newline.
If there are several solution print any single one of them.
Limits (do not use them in your solutions, these are only test restrictions): single string length is less or equal to 256, number of strings is less or equal to 64, strings contain only English letter and digits, time limit per test is 5 seconds.
The output should not contain any excess characters.
The solution is accepted if all tests are passed. The result is calculated based on JavaScript file size (the smaller the better). So, no comments, no long names, no indents, etc.
You cannot use any external packages or use imports (there is only clean Node.js installation on the server).
You solution should be put in the lcs.js file (LCS in the lower case and .js extension).
You have to use only command-line arguments (no readline, no process.stdin, etc.; ONLY process.argv).
When called without arguments, your script should not fail.
Do not share Dropbox file with p.lebedev@itransition.com или ilearning.task1@gmail.com, just send the public-link (one with the long hex-identifier).
If some tests are failed your grade is zero. 

Some examples

`node lcs.js ABCDEFZ WBCDXYZ`
`BCD`
`node lcs.js 132 12332 12312`
`1`
`node lcs.js ABCDEFGH ABCDEFG ABCEDF ABCED`
`ABC`
`node lcs.js ABCDEFGH ABCDEFG ABCDEF ABCDE`
`ABCDE`
`node lcs.js ABCDEFGH ABCDEFG ABCDEF ABCDE EDCBA`
`A`
`node lcs.js ABCDEFGH ABCDEFG ABCDEF ABCDE EDCBCA`
`BC`
`node lcs.js ABCDEFGH ABCDEFG AxBCDEF ABCDxE EDCBCAABCD`
`BCD`
`node lcs.js ABCDEFGH 1234`
`node lcs.js ABCDEFGH`
`ABCDEFGH`


Notes
If you think that test is wrong, check whitespaces in your output — test cannot differentiate spaces and junk output 
Please, check the following string before submitting your solution: ABCQEFDEFGHIJ BCXEFGYZBCDEWEFGHU (e.g. there is common EFGH).
Please, check you script does not fail without arguments.
And one more time: size of your code should be as small as possible.
Please, don’t use process.exit to quit your script. Or at least don’t use non-zero error code at least!
Why this task?
First of all, you will use JavaScript in 2023. It’s a fact.
The code gold is a great tool to study the language syntax.
And you have to adapt to given requirements. Code quality is not a set of magic rules. We’ll talk about it later via Zoom.


## Задача 1
Решение нужно сбросить на мыло ilearning.task1@gmail.com в виде public-ссылки на Dropbox на файл lcs.js в теле письма (нужна именно public-ссылка, аттачи или ссылки куда-то еще приниматься не будут, так как решения проверяются скриптом, ссылка должна иметь формат https://www.dropbox.com/s/туткакиетобуквыицифры/lcs.js?dl=1). Обратите внимание, что если вам пришёл ответ, то это означает, что задание будет приписано к тому адресу, с которого вы отправили мыло (если вы указали другое мыло при записи на курсы, решение будет "потеряно").
Если что-то пошло не так — например, вы не получили ответ в течение 120 минут днём (если что-то отвалилось ночью, само может и не подняться, it depends) или не понимаете что означает ответ — можно задавать вопрос. 
Собственно задача
Требуется разработать на языке JavaScript код, печатающий на консоль самую длинную общую подстроку всех переданных строк (с завершающим переводом строки после, удобнее всего использовать console.log). Строки передаются параметрами командной строки в ваш код на JavaScript, выполняемый под Node.js. Если самая длинная общая подстрока является пустой строкой (например, не было передано ни одной строки или строки не имеют общих для всех символов), напечатать один перевод строки (пустую строку). При существовании нескольких решений — напечатать одно решение (любое). Ограничения: длина одной строки не превосходит 256 символов, количество строк не превосходит 64, строки содержат только латинские буквы и арабские цифры, время выполнения одного теста - не более пяти секунд, вывод не содержит посторонних символов. Ограничения не должны быть в вашем коде, это ограничения на автоматические тесты.
Решение будет приниматься при прохождении набора тестов, результат будет оцениваться исходя из размера файла в байтах (меньше — лучше). Соответственно, никаких комментариев, длинных имён, отступов и прочего. В коде нельзя использовать сторонние пакеты и импорты (их просто не будет там, где выполняются тесты).
Файл должен иметь имя lcs.js (вот именно такое — LCS в нижнем регистре и расширение js). Обязательно использование только параметров командной строки (никаких readline, process.stdin и т.п.; ТОЛЬКО process.argv).
При вызове без параметров (node lcs.js) вывод должен выглядеть как перевод строки ("пустая строка").
Нужна именно public-ссылка на Dropbox (c длинных hex-идентификатором). Не пытайтесь шарить файл с p.lebedev@itransition.com или ilearning.task1@gmail.com (проверяющему скрипту это не поможет).
Если одно из этих условий не будет выполнено, по заданию автомагически будет оценка 0. 
Примеры
Несколько возможных тестов (в случае существования нескольких решений вывод может отличаться в соответствии с условием задачи):

`node lcs.js ABCDEFZ WBCDXYZ`
`BCD`
`node lcs.js 132 12332 12312`
`1`
`node lcs.js ABCDEFGH ABCDEFG ABCEDF ABCED`
`ABC`
`node lcs.js ABCDEFGH ABCDEFG ABCDEF ABCDE`
`ABCDE`
`node lcs.js ABCDEFGH ABCDEFG ABCDEF ABCDE EDCBA`
`A`
`node lcs.js ABCDEFGH ABCDEFG ABCDEF ABCDE EDCBCA`
`BC`
`node lcs.js ABCDEFGH ABCDEFG AxBCDEF ABCDxE EDCBCAABCD`
`BCD`
`node lcs.js ABCDEFGH 1234`
`node lcs.js ABCDEFGH`
`ABCDEFGH`
 
Если на первую задачу вы получило ответом число, то задание принято (число — размер решения в байтах).
Если вам кажется, что указанный тест у вас проходит, обратите внимание на переводы строки (тест лишний перевод строки не принимает).
Множество решений (и копий решений), которые не проходят тест ABCQEFDEFGHIJ BCXEFGYZBCDEWEFGHU — проверьте, пожалуйста, перед отправкой (там есть, например, EFGH).
И, пожалуйста, проверьте, что скрипт не падает при запуске без параметров.
Если из предыдущего было не до конца ясно основное требование: размер кода в байтах должен быть минимальным. Т.е. никаких комментариев, отступов АзЕсмъСущийСчетчикЦиклаНумерОдин и проч.
