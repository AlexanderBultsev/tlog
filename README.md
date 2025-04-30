# Travel Logs App

Приложение для ведения журнала путешествий с возможностью добавления описаний, изображений, локаций, комментариев и тегов. Поддерживается регистрация пользователей и настройка приватности записей.

## Технологии

- **Backend**: Django, Django REST Framework, PostgreSQL
- **Frontend**: React, Axios, Bootstrap
- **Контейнеризация**: Docker, Docker Compose

---

## Перед запуском убедитесь, что вы настроили переменные окружения

## Запуск локально

### Backend

1. Перейдите в директорию `tlog_backend`:
  ```bash
  cd tlog_backend
  ```
2. Создайте виртуальное окружение и активируйте его:
  ```bash
  python -m venv venv
  source venv/bin/activate # Windows: venv\Scripts\activate
  ```
3. Установите зависимости:
  ```bash
  pip install -r requirements.txt
  ```
4. Примените миграции и создайте суперпользователя:
  ```bash
  python manage.py migrate
  python manage.py createsuperuser
  ```
5. Запустите сервер:
  ```bash
  python manage.py runserver
  ```

### Frontend

1. Перейдите в директорию `tlog_frontend`:
  ```bash
  cd tlog_frontend
  ```
2. Установите зависимости:
  ```bash
  npm install
  ```
3. Запустите приложение
  ```bash
  npm start
  ```

---

## Запуск с Docker

1. Постройте и запустите контейнеры:
  ```bash
  docker-compose up --build
  ```

---

## Возможности

- Регистрация и вход пользователей
- Создание, редактирование и удаление путешествий
- Загрузка изображений (в base64)
- Комментарии к путешествиям
- Система тегов
- Фильтрация по тегам и пользователям
- Публичные и приватные записи

---

## Переменные окружения

### `.env` в корневой директории проекта
  ```ini
  # Настройки базы данных PostgreSQL
  POSTGRES_DB=your-db-name
  POSTGRES_USER=your-db-user
  POSTGRES_PASSWORD=your-db-password

  DB_HOST=db
  DB_PORT=5432

  # Настройки для Django
  DJANGO_SECRET_KEY=your-secret-key
  DJANGO_DEBUG=False
  DJANGO_ALLOWED_HOSTS=localhost, your-host
  ```

---

## Конечные точки

- **Фронтенд:** http://localhost/travels
- **АПИ:** http://localhost/api
- **Документация:** http://localhost/docs
- **Панель администратора:** http://localhost/admin

---

## Автор

Бульцев Александр Алексеевич, РТУ МИРЭА, ИКБО-01-22

2025, Курсовой проект