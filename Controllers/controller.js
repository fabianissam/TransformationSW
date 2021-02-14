const multer = require("multer");
const fs = require("fs");
const transformation = require("../Transformation/transformation");
var destination = "/home/fabian/uploads/";
const storage = multer.diskStorage({
  destination: destination,
  filename: function (req, file, cb) {
    //req.body is empty...
    //How could I get the new_file_name property sent from client here?
    cb(null, "openapifile.json");
  },
});
const upload = multer({
  storage: storage,
});

module.exports = function (app) {
  app.get("/root", (req, res) => {
    res.render("../Views/index.ejs");
  });
  //response created graphql server with REST-Client support
  app.post("/transformation", upload.single("openapifile"), (req, res) => {
    var trafo = new transformation(destination + "openapifile.json");
    var result = trafo.createGraphQLWrapper();
    // fs.unlinkSync("./uploads/openapifile");
    res.send(result);
  }); // mit promise arbeiten wenn promise nicht stimmt fehlermeldung an den client schicken
};
