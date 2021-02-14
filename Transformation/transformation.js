//const schemaparser = require("./schemaparser");
const fs = require("fs");

class Transformation {
  constructor(document) {
    this.document = document;
  }
  //document is path to document
  createGraphQLWrapper() {
    var oas = require(this.document);

    // console.log(oas);
    const codeForWrapper = `"use strict";

    const util = require("util");
    
    const express = require("express");
    const { graphqlHTTP } = require("express-graphql");
    const OtG = require("openapi-to-graphql");
    
    async function startServer() {
     
      const oas = require("${this.document}");
      const { schema } = await OtG.createGraphQLSchema(
        oas,${this.resolverTemplate(oas)}
      );
      const app = express();
    
      app.use(express.json());
      app.use(express.urlencoded());
      
    

      app.use(
        "/",
        graphqlHTTP({
          schema: schema,
          graphiql: true,
        })
      );
    
      app.listen(3001);
    }
    
    
    startServer();
    `;

    return codeForWrapper;
  }

  resolverTemplate(oas) {
    var customResolver = `{customResolver:{ "${
      oas.info.title
    }":{${this.fillResolver(oas)}},},}`;
    return customResolver;
  }

  fillResolver(oas) {
    var result = "";
    var objectPaths = Object.keys(oas.paths);
    for (var path in objectPaths) {
      var methodsPerPath = Object.keys(oas.paths[objectPaths[path]]);

      var methodsPerPathStringArray = methodsPerPath.map((method) => {
        return `${method}: (obj, args, context, info) => {
            return null;
          },`;
      });
      var onePath = `"${objectPaths[path]}":{`;

      methodsPerPathStringArray.forEach((method) => {
        onePath += method;
      });

      onePath += "},";
      result += onePath;
    }

    return result;
  }
  //makes a script and runs the script so the graphqlserver runs
  runServer() {
    // this.createGraphQLSchema(inputData.entpoints);
    return "";
  }
}

module.exports = Transformation;

//var imports ="import {GraphQLList,GraphQLObjectType,GraphQLSchema,GraphQLString,GraphQLBoolean,GraphQlInt, GraphQLFloat,GraphQLID } from 'graphql';";
