##Nodejs

FROM node:latest


ENV HOME=/home/app/web


COPY web/package.json $HOME/web/package.json


WORKDIR $HOME/web
RUN npm install --silent --progress=false

USER root
COPY . $HOME/web

USER root

EXPOSE 80

CMD [ "npm", "start" ]
