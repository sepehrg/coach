FROM tiredofit/nginx-php-fpm:alpine-8.2
COPY nginx.conf /etc/nginx/sites.available/default.conf
COPY build/ /www/html/
RUN mkdir /var/log/php82 
RUN chmod -R a+rwx /var/log/php82
EXPOSE 80