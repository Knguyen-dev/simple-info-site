const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up routes
app.get("/", (req, res) => {
	res.render("index", {
		title: "Home Page",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Page",
	});
});

app.get("/contact", (req, res) => {
	res.render("contact", {
		title: "Contact Page",
	});
});

/*
+ A Error handling:

- How it works:
1. If the above routes aren't found, then we keep
  going down the middleware stack.
  The middleware function we've added at the end
  of the stack will be called.
2. Then finally send an http response for the 404 page.

- NOTE: 

1. When a request is made, Express goes through each middleware in the stack
  until it finds one that handles the request. If none of the previous
  middleware or routes handle the request, it falls through to the 404 middleware 
  at the end of the stack.

2. By placing 404 and error handling at the end after all of your other routes, it
  ensures that none of the previous routes matched the request path, and the 404
  middleware is triggered and it will send a response, which is our 404 not found page.

3. If we were to place the 404 middleware before our other routes here's what would happen.
  We got to the index route '/', a request is received, it goes through our request-response
  cycle. It starts the middleware we declared at the top and works its way down. It sees
  our middleware that renders a 404, runs it, and a 404 is rendered, even on valid routes.

4. This is why we place our 404 middleware at the end so it acts as a fallback. Also it's 
  needed to have this middleware at the end to render a 404 route because if we didn't then 
  our app wouldn't generate a response in some cases. If user went to "/bad-page", and that
  doesn't match any of our routes, our express application or server wouldn't send an html 
  response, forever keeping the user in a loading state, or their browser would just say 
  'server didn't connect' or 'something went wrong'. By having this at the end, we guarantee
  that no matter what, the client gets a response.
*/
app.use((req, res) => {
	res.status(404).render("404");
});

app.listen(port, () => {
	console.log(`Started listening at port ${port}`);
});
