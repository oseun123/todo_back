const express = require("express");
const bodyParser = require("body-parser");
const Route = require("./routes");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.use(Route);

app.listen(port, () => console.log(`Server ready at ${port}`));
