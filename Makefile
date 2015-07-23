default: docker install clean run

# Start application
run:
	docker-compose up

# Create node_modules volume and install dependencies
install:
	docker create -v /app/node_modules --name node_modules library/busybox &>/dev/null || :
	docker-compose run --rm --no-deps web npm install

# Start development vm and build docker images
docker:
	boot2docker up --vbox-share='disable'
	docker-compose build

watch:
	make watch_fs watch_assets -j2

watch_fs:
	docker-osx-dev -l WARN

watch_assets:
	node_modules/.bin/gulp watch

assets:
	node_modules/.bin/gulp

console:
	docker-compose run --rm web bash

# Clean up docker containers
clean:
	docker ps -aqf name=example | xargs docker rm -f

.PHONY: install run docker clean console
