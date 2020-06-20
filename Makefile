-include .env
export

run:
	npm run start:dev

run-redis:
	cd .docker && docker-compose up -d redis
