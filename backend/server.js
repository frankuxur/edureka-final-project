const app = require("./routes/config");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.send("hello world!");
});

app.listen(PORT, () => {
  console.log("listening to PORT " + PORT);
});
