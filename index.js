let express = require("express");
let app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
require('./models/index')
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use('/image', express.static(__dirname + "/publics"));
app.all("/*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  next();
});
require("./routes/auth.routes")(app);
app.get("/", function (req, res) {
  res.json("welcome to API");
  //res.end();
});
app.listen(8080, function () {
  console.log("[321153266]listening on *:" + 8080);
});
