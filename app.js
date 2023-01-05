var express = require("express");
var path = require("path");
var app = express();
const staticPath = path.join(__dirname, "../public");
console.log(staticPath);
app.use(express.static(staticPath));
app.get("/", function (req, res) {
	res.send("hello world");
	console.log(req.params, req.ip);
});
app.get("/about", function (req, res) {
	/* res.write("About us");
	res.send(); */
	res.status(200).send("About us");
	console.log(req.params, req.ip);
});
app.get("/contact", function (req, res) {
	res.send("Contact us");
	console.log(req.params, req.ip);
});
app.listen(3000);
