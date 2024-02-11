require("dotenv").config();
import program from "./config/commander.js";
import express from "express";
import { createServer } from "node:http";
import serverIo from "./middleware/serverIO.js";
import { connectDB, sessionAtlas } from "./config/config.js";
import handlebars from "express-handlebars";
import passportConfig from "./config/passport.config.js";

const { mode } = program.opts();
console.log("Mode config: " + mode);

const port = 8080;
const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

serverIo(server);
connectDB();

app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

sessionAtlas(app);
passportConfig(app);

app.use(appRouter);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
