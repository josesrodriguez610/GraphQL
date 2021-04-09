require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => console.log("Listening on port 4000"));
