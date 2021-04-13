require("dotenv").config({ path: "./config/.env" });
const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors());

connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // rootValue: root,
    graphiql: true,
  })
);

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(4000, () => console.log("Listening on port 4000"));
