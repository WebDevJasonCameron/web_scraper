const PORT = 8000;

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const url =
	"https://www.dndbeyond.com/sources/basic-rules/step-by-step-characters";

axios(url)
	.then((r) => {
		const html = r.data;
		const $ = cheerio.load(html);
		const articles = [];

		$(".heading-anchor").each(function () {
			const title = $(this).text();
			// const url = $(this).find("a").attr("href");

			articles.push({
				title,
				// url,
			});
		});
		console.log(articles);
	})
	.catch((err) => console.log("I found an error: " + err));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
