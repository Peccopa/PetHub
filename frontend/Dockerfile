FROM nginx:alpine

# Удаляем дефолтный контент
RUN rm -rf /usr/share/nginx/html/*

# Копируем билд проекта
COPY dist/ /usr/share/nginx/html/

# Копируем наш конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# открываем порт для фронтенда
EXPOSE 80

