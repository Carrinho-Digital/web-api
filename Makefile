-include .env
export

run:
	npm run start:dev

run-mongo:
	cd .docker && docker-compose up -d mongodb

run-redis:
	cd .docker && docker-compose up -d redis
