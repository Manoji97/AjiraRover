const express = require("express");
xmlparser = require("express-xml-bodyparser");

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded());
app.use(
  xmlparser({
    trim: true,
    explicitArray: true,
    normalize: false,
  })
);

console.log(process.env.DEBUG, process.env.PORT);

const HandleXML = require("./middlewares/handleXML");

const EnvironmentRouter = require("./routes/environmentRoutes");
const RoverRouter = require("./routes/roverRoutes");
//const HelperRouter = require("./routes/helperRoutes");

app.use("/api/xmltest", HandleXML, async (req, res, next) => {
  console.log(req.body);
});

app.use("/api/environment", EnvironmentRouter);
app.use("/api/rover", RoverRouter);
//app.use("/api", HelperRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const error_msg =
    process.env.NODE_ENV !== "PRODUCTION" ? { error: error.message } : null;
  res.status(error.statusCode).send(error_msg);
});

app.get("*", function (req, res) {
  res.status(404).send({ error: "URL Not Found" });
});

app.listen(port, () =>
  console.log(`Simulation Environment listening at http://localhost:${port}`)
);
