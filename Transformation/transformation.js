//const schemaparser = require("./schemaparser");
const util = require("util");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const fs = require("fs");
const graphql = require("graphql");
const OtG = require("openapi-to-graphql");

function Transformation(document) {
  this.document = document;
  //document is path to document
  this.createGraphQLWrapper = async () => {
    const codeForWrapper = `use strict";

    const util = require("util");
    
    const express = require("express");
    const { graphqlHTTP } = require("express-graphql");
    const OtG = require("openapi-to-graphql");
    
    async function startServer() {
      // use OpenAPI-to-GraphQL to create a GraphQL schema:
      const oas = require(${this.document});
      const { schema } = await OtG.createGraphQLSchema(
        oas,${this.resolverTemplate()}
      );
      const app = express();
    
      app.use(express.json());
      app.use(express.urlencoded());
      // MIDDLEWARE SOFTWARE SCHREIBEN DIE ALLE ANFRAGEN VON DER NORMALEN API ZU MEINER GRAPHQL API WEITERLEITET
    
      //app.use();
      app.use(
        "/",
        graphqlHTTP({
          schema: schema,
          graphiql: true,
        })
      );
    
      app.listen(3001);
    }
    
    // Kick things off:
    startServer();
    `;

    return codeForWrapper;
  };

  this.resolverTemplate = () => {
    var customResolver = `{customResolver:{ "${
      oas.info.title
    }":{${this.fillResolver()}},},}`;
    return customResolver;
  };

  this.fillResolver = () => {
    var result = "";
    var objectPaths = Object.keys(oas.paths);
    for (var path in objectPaths) {
      var methodsPerPath = Object.keys(oas.paths[objectPaths[path]]);
      //console.log(objectPaths[path]);
      var methodsPerPathStringArray = methodsPerPath.map((method) => {
        return `${method}: (obj, args, context, info) => {
            return null;
          },`;
      });
      //console.log(methodsPerPathStringArray);
      var onePath = `"${objectPaths[path]}":{`;

      methodsPerPathStringArray.forEach((method) => {
        onePath += method;
      });

      onePath += "},";
      result += onePath;
    }

    return result;
  };
  //makes a script and runs the script so the graphqlserver runs
  this.runServer = () => {
    // this.createGraphQLSchema(inputData.entpoints);
    return "";
  };
}

module.exports = Transformation;

//var imports ="import {GraphQLList,GraphQLObjectType,GraphQLSchema,GraphQLString,GraphQLBoolean,GraphQlInt, GraphQLFloat,GraphQLID } from 'graphql';";
