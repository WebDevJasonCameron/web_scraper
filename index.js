// To run this, change the url address, pick a element and add this to the code.
// You also need to run the app with npm start within the console.  This will run on
// port 8000 unless you change it later

const PORT = 8000;

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const url = "https://www.theguardian.com/uk";

axios(url)
	.then((r) => {
		const html = r.data;
		const $ = cheerio.load(html);
		const articles = [];

		$(".heading-anchor").each(function () {
			const title = $(this).text();
			const url = $(this).find("a").attr("href");

			articles.push({
				title,
				url,
			});
		});
		console.log(articles);
	})
	.catch((err) => console.log("I found an error: " + err));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
