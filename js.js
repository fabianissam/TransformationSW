"use strict";
const util = require("util");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const OtG = require("openapi-to-graphql");
async function startServer() {
  const oas = require(/home/aabfin / uploads / openapifile.json);
  const { schema } = await OtG.createGraphQLSchema(oas, {
    customResolver: {
      "simple FHAachen API": {
        "/person": {
          get: (obj, args, context, info) => {
            return null;
          },
          post: (obj, args, context, info) => {
            return null;
          },
          put: (obj, args, context, info) => {
            return null;
          },
        },
        "/person/{id}/": {
          get: (obj, args, context, info) => {
            return null;
          },
          delete: (obj, args, context, info) => {
            return null;
          },
        },
      },
    },
  });
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded());
  app.use("/", graphqlHTTP({ schema: schema, graphiql: true }));
  app.listen(3001);
}
startServer();
