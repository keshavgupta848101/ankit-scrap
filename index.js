
const request = require("request-promise");
const cheerio = require("cheerio");

const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
async function main() {

  var myData = [];
  var myDataa = [];
  var total = [];
  var i = " ";
  var j = " ";
  const result = await request.get("https://www.gadgets360.com/finance/gold-rate-in-india");
  const $ = cheerio.load(result);
  $("body > div.wrapper > div.row.white_bg > div > div > div.content_section > div._crypwrp > div:nth-child(7) > div > table > tbody > tr > td:nth-child(2)").each((index, element) => {

    myData.push($(element).text().replace(/[^0-9\.-]+/g, ""));
  });
  $("body > div.wrapper > div.row.white_bg > div > div > div.content_section > div._crypwrp > div:nth-child(7) > div > table > tbody > tr > td._cphdc > div > div").each((index, element) => {

    myDataa.push($(element).text());
  });


  console.log(myData);
  app.get("/", function (req, res) {

    res.json(myDataa);
  });
  app.get("/rate", function (req, res) {

    res.json(myData);
  });

  app.listen(3001, function () {
    console.log("Server started on port 3000");
  });
}

main();