Getting to know AngularJS, Express and MySQL.
Chances are this will all be overkill for what the service does but is meant to be a learning experience.

Requirements:
- docker
- docker-compose

Instructions:

Simply clone, navigate to the directory and run:
  
docker-compose up

This will create 2 containers, one for the MySQL DB and another for the Express webserver. 
The webserver is accessible on localhost:80 
The DB is accessible on localhost:3306

TODO:
- Tests with Mocha/Chai
- Bundling with webpack
- AWS CloudFormation Configuration for deployment and scaling
- Jenkins for CI/CD
- Consider MySQL on AWS RDS instead of docker containers
- Setup Dev vs Prod environment inc webpack-dev-server with hot loading