# Автоматический загрузчик виджетов для amoCRM
Gulp util for automatic upload widgets to your account

## Логика работы

1. Увеличивает версию (тип patch, т.е 1.0.0 -> 1.0.1) 
2. Создает архив с названием widget.zip из папки widget, в которой лежать файлы вашего виджета
3. Загружает виджет в ваш аккаунт, исходя из данных в config.js

## Установка
Клонируем репозиторий на один уровень с папкой виджета

**Важно: файлы виджета должны лежать в папке widget**
```
git clone https://github.com/Kasatikov/amocrm_widget_autoloader.git
npm install
```

## Использование

1. Вносим данные виджета и аккаунта в config.js
2. ``` gulp ```
3. Виджет загружен в аккаунт 
4. Profit!
