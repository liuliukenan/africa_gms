FROM 192.168.66.231/base/openresty:1.27.1.2
WORKDIR /usr/local/openresty/nginx/html
COPY dist /usr/local/openresty/nginx/html/dist
EXPOSE 80
CMD ["/usr/local/openresty/bin/openresty","-g","daemon off;"]
