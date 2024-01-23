const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up routes
app.get("/", (req, res) => {
	res.render("index");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/contact", (req, res) => {
	res.render("contact");
});

/*
+ A Error handling:

- How it works:
1. If the above routes aren't found, then we keep
  going down the middleware stack.
  The middleware function we've added at the end
  of the stack will be called.
2. Then finally send an http response for the 404 page.

- NOTE: We want our error handling related middleware at the end.

*/
app.use((req, res) => {
	res.status(404).render("404");
});

app.listen(port, () => {
	console.log(`Started listening at port ${port}`);
});
