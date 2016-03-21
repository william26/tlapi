build:
	docker build -t willjcksn/tlapi .

stop:
	docker kill tlapi 2> /dev/null; true
	docker rm tlapi 2> /dev/null; true

rundev:
	make stop
	docker run --net=dbnetwork -ti --name tlapi -p 3000:3000 -v `pwd`:/mnt willjcksn/tlapi /mnt/node_modules/.bin/nodemon -L --watch /mnt/dist /mnt/index.js

run:
	make stop
	docker run --net=dbnetwork -d --name tlapi -p 3000:3000 willjcksn/tlapi
