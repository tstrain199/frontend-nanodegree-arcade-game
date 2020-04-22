FROM nginx:alpine

COPY js /usr/share/nginx/html/js
COPY images /usr/share/nginx/html/images
COPY css /usr/share/nginx/html/css
COPY sounds /usr/share/nginx/html/sounds
COPY index.html /usr/share/nginx/html

EXPOSE 80
