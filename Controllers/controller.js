const mutler = require("multer");
const transformation = require("../Transformation/transformation");
const upload = multer({ dest: "uploads/" });

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.render("../Views/index.html");
  });
  //response created graphql server with REST-Client support
  app.post("/transformation", upload.single("openapifile"), (req, res) => {
    var trafo = new transformation();
    res.send(trafo.createGraphQLWrapper(req.file)); // mit promise arbeiten wenn promise nicht stimmt fehlermeldung an den client schicken 
  });
};
