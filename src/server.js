import { program } from "./config/commander.js";
import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import { createServer } from "node:http";
import { serverIo } from "./middleware/serverIO.js";
import { connectDB, sessionAtlas } from "./config/config.js";
import appRouter from './routes/index.js';
import cookieParser from "cookie-parser";
import passportConfig from "./config/passport.config.js";
import { configObject } from "./config/config.js";
import SendmailTransport from "nodemailer/lib/sendmail-transport/index.js";

const port = 8080;
const app = express();

const { mode } = program.opts();
console.log("Mode config: " + mode);

const server = createServer(app);
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser(configObject.cookies_code))

const publicPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'public');
app.use(express.static(publicPath));

serverIo(server);
connectDB();

app.engine('.hbs', exphbs({
  defaultLayout:'main',
  extname:'.hbs'
}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

sessionAtlas(app);
passportConfig(app);

app.use(appRouter);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
