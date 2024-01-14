const http = require("http");
const fs = require("fs");
const PORT = 3000;
const hostName = "localhost";

http
	.createServer((request, response) => {
		response.setHeader("Content-Type", "text/html");
		// Create path to our html files
		let path = __dirname + "/views/";

		console.log("Route: ", request.url);

		// Build path based on the route the request came from
		switch (request.url) {
			case "/":
				path += "index.html";
				response.statusCode = 200;
				break;
			case "/about":
				path += "about.html";
				response.statusCode = 200;
				break;
			case "/contact":
				path += "contact.html";
				response.statusCode = 200;
				break;
			default:
				path += "404.html";
				response.statusCode = 404;
				break;
		}

		// Read the html file
		fs.readFile(path, (error, data) => {
			if (error) {
				console.error("Html File Reading Error: ", path);
				response.end();
			} else {
				response.end(data);
			}
		});
	})
	.listen(PORT, hostName, () => {
		console.log(`Listening for requests on port ${PORT}`);
	});
