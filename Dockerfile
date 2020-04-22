FROM nginx:alpine

COPY js /usr/share/nginx/html
COPY images /usr/share/nginx/html
COPY css /usr/share/nginx/html
COPY sounds /usr/share/nginx/html
COPY index.html /usr/share/nginx/html

EXPOSE 80
