##Nodejs

FROM node:latest


ENV HOME=/home/app/entertain


COPY entertainWeb/package.json $HOME/entertainWeb/package.json


WORKDIR $HOME/entertainWeb
RUN npm install --silent --progress=false

USER root
COPY . $HOME/entertainWeb

USER root

EXPOSE 80

CMD [ "npm", "start" ]
