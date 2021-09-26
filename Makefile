PIP = $(shell which pip3)

all: build

.PHONY: build
build:
	npm run build

.PHONY: env
env:
	$(PIP) install 'yhttp >= 2.13.2'
	npm install

.PHONY: lint
lint: 
	npm run lint

.PHONY: serve
serve: 
	npm run dev
