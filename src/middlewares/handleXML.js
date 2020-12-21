const HandleXML = (req, res, next) => {
  //if json just pass
  if (req.headers["content-type"] === "application/json") {
    next();
  } else if (req.headers["content-type"] === "application/xml") {
    req.body = req.body["request"];
    next();
  }
};

module.exports = HandleXML;
