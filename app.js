const express = require("express");
const controller = require("./Controllers/controller");

const app = express();

//set up template engine

app.set("view engine", "ejs");

app.use("/Assets", express.static(__dirname + '/Assets'));
//app.use(express.static("./Assets"));
app.use(express.json());
app.use(express.urlencoded());

//start controller
controller(app);

// listen to port
app.listen(3000);
console.log("Ready to transform your RESTApi");

/*var trafo = new transformation(inputData);
trafo.runServer();

const schemaparser = require("./Transformation/schemaparser");

var sp = new schemaparser();

console.log(
  sp.getSchema("hello", {
    _id: "5f73580ad3b079558a362f84",
    name: "fabian",
    vorname: "abdallah",
    email: [{ nallo: "hallo" }, { nallo: "hallo" }, { nallo: "hallo" }],
    password: { ballo: "hallo" },
    fachbereich: { hallo: "hallo" },
    __v: 0,
  })
);*/
