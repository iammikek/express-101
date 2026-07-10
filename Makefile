.PHONY: test serve migrate docker-up docker-down

test:
	npm run test:run

serve:
	X_LISTEN=8007 node src/server.js

migrate:
	node -e "require('./app/Support/db').migrate(); console.log('Migrated.');"

docker-up:
	docker compose up --build

docker-down:
	docker compose down
