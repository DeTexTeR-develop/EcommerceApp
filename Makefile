MONGO_URL=mongodb://root:foobarbaz@localhost:27018/ecommerceApp

.PHONY: run-mongodb
run-mongodb:
	@echo Starting MongoDB container
	-docker run \
		-v mongodata:/data/db/mongo/ \
		-e MONGO_INITDB_ROOT_USERNAME=root \
		-e MONGO_INITDB_ROOT_PASSWORD=foobarbaz \
		-p 27018:27017 \
		mongo:6.0.4

.PHONY: run-api-node
run-api-node:
	@echo Starting node api
		npm start