# ATM locator api
## About this project
An API that provides information on ATMs located near user's with his zip code. It's still under review to use Mastercard's production host, but it makes requests normally.

## How to start
Before testing my API, you need to request credentials on the Mastercard website and obtain your consumer key for authentication.

To set up a development or production environment in your project, it's necessary to copy the contents of the .env.example file to the .env file. This procedure is important because the .env file contains sensitive information such as passwords, API keys, and other configuration data.

You need to have <a href="https://nodejs.org/en/download">Node.js</a> and <a href="https://docs.docker.com/get-docker/">Docker<a> installed on your machine.

```
1. Clone repository
git clone https://github.com/gustarpd/atm-locator-api

2. Access the directory
cd atm-locator-api

3. Install depedencieshh
npm install

4. Start the database
docker-compose up

```

## Tools used to develop this API

- <a href="https://nodejs.org/">NodeJs<a>
- <a href="https://www.typescriptlang.org/">TypeScript<a>
- <a href="https://jestjs.io/">Jest</a>
- <a href="https://www.mongodb.com/">MongoDB</a>