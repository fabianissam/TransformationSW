//const schemaparser = require("./schemaparser");
const util = require("util");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const fs = require("fs");
const graphql = require("graphql");
const OtG = require("openapi-to-graphql");

function Transformation() {
  this.createGraphQLWrapper = (document) => {
  
    const oas = require("./Openapi.json");
    const { schema } = await OtG.createGraphQLSchema(oas);
 

    return schema;
  };

  this.createGraphQLOperations = () => {
    var schema = `schema {
      query: Query,
      mutation: Mutation
    }`;
    return "";
  };

  this.resolverTemplate = () => {
    return "";
  };

  this.fillResolver = ()=>  {
    return "";
  };

  this.createGraphQLServer = () => {
    var imports =
      "var express = require('express');\nvar { graphqlHTTP } = require('express-graphql');\nvar { buildSchema } = require('graphql');";
    var schema = `var schema = buildSchema(${this.createGraphQLSchema()}\n${this.createGraphQLOperations()});`;

    var root = `var root = {${this.createResolver()}};`;

    // hier müssen noch die ganzen url der Restclients reinkommen damit sie nichts von den veränderungen bemerken
    var rest = `var app = express();
    app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    }));
    app.listen(4000);
    console.log('Running a GraphQL API server at localhost:4000/graphql');`;
    return imports + "\n" + schema + "\n" + root + "\n" + rest;
  };

  //makes a script and runs the script so the graphqlserver runs
  this.runServer = () => {
    // this.createGraphQLSchema(inputData.entpoints);
    return "";
  };
}

module.exports = Transformation;

//var imports ="import {GraphQLList,GraphQLObjectType,GraphQLSchema,GraphQLString,GraphQLBoolean,GraphQlInt, GraphQLFloat,GraphQLID } from 'graphql';";
