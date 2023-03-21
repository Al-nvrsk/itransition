## Task 6

Stack is the same as in #4.
Create a Web application without registration and authentication. 
At the start user have to enter its name (just name without password or anything).
After entering its name user get to the “send a message” form: recipient, title and the message body.
Recipient field should support autocompletion — when the user starts entering name, dropdown is shown with the corresponding names (you have to use ready component for this).
Body field  is multiline text (textarea).
You have to use a CSS framework (Bootstrap is recommended, but you can choose any CSS framework).
Under “send a message” you have to display all messages send to the current user.
The application is akin to an e-mail application, not a chat.
All messages are stored in database forever. So, if somebody uses the same name, they will see all corresponding messages.
You can either implement auto-refresh every 5 seconds to catch new messages for the current user or — it’s better, but optional — use websockets to push new messages to the user.
Users can send message to themselves — so, do not write additional branch to remove current user from autocompletion, etc.

## Задача 6

Web-приложение (стек как и в №4), которое позволяет пользователям отправлять друг другу сообщения — можно создать сообщение, выбрать получателя, тему и текст и отправить. У пользователя-получателя сообщения должны "всплывать". На своей странице можно просмотреть все полученные сообщения (от кого, когда, тема — при клике на тему "открывается-выпадает" текст)
Реализация может быть как через периодический (раз в 5 секунд) опрос сервера, так и через сокеты.
НУЖНО использвать готовый CCS-фреймворк, готовые компоненты, библиотеки и проч.
Все сообщения сохраняются в базу навсегда.
Вход в приложение только через ввод имени (без пароля, без регистрации и т.п.). Такой "анонимный чат-через-письма".
Можно отправить сообщение самому себе.
При отправки задания на p.lebedev@itransition.com указать ФИО (можно без О), направление и следующие ссылки:
- ссылка на Github,
- ссылка на задеплоенный проект (без разницы где — Azure, Heroku, что угодно),
- записанное видео, в котором отображается с задеплоенного сайта реализованная функциональность (без пояснений).
Прочитайте, на английском задание, там есть некоторые доп. пояснения.
