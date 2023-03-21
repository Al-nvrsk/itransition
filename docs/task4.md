## Task 4

Task #4 (ALL GROUPS)

Use you language and platform: JavaScript/TypeScript+React+Node.js+Express+ MySQL or .NET/Core+C#+ASP.NET+SQL Server
Create a Web application with registration and authentication.
Non-authenticated users should not have access to the user management (admin panel).
Authenticated users should have access the user management table: id, name, e-mail, last login time, registration time, status (active/blocked).
The left column of the table should contains checkboxes without labels for multiple selection (table header contains “Select All” checkbox without label).
There must be a toolbar over the table with the flooring actions: Block (red button with text), Unblock (icon), Delete (icon).
You have to use a CSS framework (Bootstrap is recommended, but you can choose any CSS framework).
Every users should be able to block or delete yourself or any other user.
If user account is blocked or deleted any next user’s request should redirect to the login page.
User can use any non-empty password (even one character).
Blocked user should not be able to login, deleted user can re-register.
How to submit the solution
Send to p.lebedev@itransition.com:
* Full name.
* Link to the deployed project (you can use any hosting you find suitable).
* Recorded video:  registration, login, non-current user selection, user blocking (the user status should be updated), user unblocking, all user selection (including current), all user blocking (with automatic redirection to the login page).

## Задача 4

На платформе специализации (JavaScript/TypeScript+React+Node.js+Express+MySQL или C#+ASP.NET Core MVC+SQL Server) реализовать Web-приложение, позволяющее пользователям зарегистрироваться и аутентифицироваться. Неаутентифицированные пользователи не имеют доступа к управлению пользователями (доступ только к форме регистрации или форме аутентификации).
Аутентифицированные пользователи видят таблицу "пользователи" (идентификатор, именем, мылом, датой регистрации, датой последнего логина, статусом) с пользователями.
Таблица левой колонкой содержит чек-боксы для множественного выделения, в заголовке колонки чек-бокс "выделить все/снять выделение". Над таблицей тулбар с действиями: Block, Unblock, Delete (два последних можно и лучше иконками). Таблица, множественное выделение, тулбар — обязательно. Обязательно использование CSS-фреймворка (рекомендация — Bootstrap, но можно любой другой).
Пользователь может удалить или заблокировать себя — при этом сразу должен быть разлогинен. Если кто-то другой блокирует или удаляет пользователя, то при любом следующем действии пользователь переправляется на страницу логина.
При регистрации должна быть возможность использовать любой пароль, даже из одного символа.
Заблокированный пользователь не может войти, удаленный может заново зарегистрироваться.
При отправке на p.lebedev@itransition.com указать ФИО (можно без О) и следующие ссылки:
* Cсылка на Github.
* Cсылка на задеплоенный проект (без разницы где — Azure, Heroku, что угодно).
* Записанное видео, в котором отображается с задеплоенного сайта: регистрация, вход, выделение одного пользователя (не себя), его блокировка и демонстрация результата (статус в таблице обновился), разблокировка этого пользователя, выделение всех пользователей через клик на чекбокс в заголовке таблице, блокировка всех (включая себя) нажатием кнопки на тулбаре "Block" (так как себя, то с автомагическим переходом на страницу входа).
