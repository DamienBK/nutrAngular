FROM mysql:latest

COPY db/entertain_schema.sql /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD root  
ENV MYSQL_DATABASE entertain  
ENV MYSQL_USER entertainAdmin  
ENV MYSQL_PASSWORD SomeTestPassword

EXPOSE 3306

