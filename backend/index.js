const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/api/admin',require('./routes/admin'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/search',require('./routes/search'));
app.use('/api/user',require('./routes/user'));

app.listen(port, () => {
  console.log(`eBusServ backend listening on port http://localhost:${port}`);
});
