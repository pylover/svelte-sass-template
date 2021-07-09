PIP = $(shell which pip3)

.PHONY: env
env:
	$(PIP) install yhttp
	npm install


.PHONY: serve
serve:
	npm run dev
