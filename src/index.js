var express = require("express");
var requests = require("requests");
const mongoose = require("mongoose");
var path = require("path");
var hbs = require("hbs");
var app = express();
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/view");
const partialPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);
//console.log(staticPath);
//app.use(express.static(staticPath));
mongoose.set("strictQuery", false);
mongoose
	.connect("mongodb://localhost:27017/school", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connected successfully"))
	.catch((err) => console.log(err));

app.get("/", function (req, res) {
	res.render("index", {
		title:
			"The handlebars require used by hbs can be accessed via the handlebars property on the hbs module. If you wish to use handlebars methods \nlike SafeString please do so on this property.Do not register helpers or partials in this way.",
	});
});
app.get("/about", function (req, res) {
	requests(
		`http://api.openweathermap.org/data/2.5/weather?q=Delhi, IN&units=metric&appid=b1657eb5bc327fe4d1cd288aea218c20`
	)
		.on("data", (chunk) => {
			const objdata = JSON.parse(chunk);
			const arrData = [objdata];
			console.log(arrData[0].main.temp);
			/* const realTimeData = arrData
				.map((val) => replaceVal(homeFile, val))
				.join(""); */
			res.write("jfjfj");
			// console.log(realTimeData);
		})
		.on("end", (err) => {
			if (err) return console.log("connection closed due to errors", err);
			res.end();
		});
	/* res.render("index", {
		title: "\nABOUT US\n\n\n",
	}); */
});
/* app.get("/", function (req, res) {
	res.send("hello world");
	console.log(req.params, req.ip);
}); */
app.get("/about-us", function (req, res) {
	/* res.write("About us");
	res.send(); */
	res.status(200).send("About us");
	console.log(req.params, req.ip);
});
app.get("/contact", function (req, res) {
	res.send("Contact us");
	console.log(req.params, req.ip);
});
app.get("*", function (req, res) {
	res.render("404", {
		title: "Opps Page Not Found",
	});
});
app.listen(3000);
