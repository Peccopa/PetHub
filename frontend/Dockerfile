# Используем образ Nginx для фронта
FROM nginx:alpine

# Удаляем дефолтный контент
RUN rm -rf /usr/share/nginx/html/*

# Копируем билд проекта в папку Nginx
COPY dist/ /usr/share/nginx/html/

# Открываем порт для фронтенда
EXPOSE 80

# Nginx запускается автоматически
