const express = require("express");

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

const EnvironmentRouter = require("./routes/environmentRoutes");
const RoverRouter = require("./routes/roverRoutes");
const HelperRouter = require("./routes/helperRoutes");

app.use("/api/environment", EnvironmentRouter);
app.use("/api/rover", RoverRouter);
//app.use("/api", HelperRouter);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode).send({ error: error.message });
});

app.get("*", function (req, res) {
  res.status(404).send({ error: "URL Not Found" });
});

app.listen(port, () =>
  console.log(`Simulation Environment listening at http://localhost:${port}`)
);
