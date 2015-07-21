default: docker install clean run

# Start application
run:
	docker-compose up

# Create node_modules volume and install dependencies
install:
	docker create -v /app/node_modules --name node_modules library/busybox &>/dev/null || :
	docker-compose run --rm --no-deps web npm install

# Start development vm
docker:
	boot2docker up
	docker-compose build

# Clean up docker containers
clean:
	docker ps -aqf name=example | xargs docker rm -f

.PHONY: install run docker clean
