build:
	docker build -t costanalyzerbot .

run:
	docker run -d -p 3000:3000 --name costanalyzerbot