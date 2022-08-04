import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dontenv from "dotenv";
import {graphqlHTTP} from "express-graphql"
import dbConnection from "./db.js";
import routes from "./routes/routes.js"
import schema from "./schema/schema.js"

dontenv.config();
const app = express();
const PORT = process.env.PORT|| 7000;

app.use(bodyParser.json({extended: true, limit:'30mb'}))
app.use(bodyParser.urlencoded({extended: true, limit:'30mb'}));
app.use(morgan('combined'));
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

routes(app);

dbConnection().then(() => app.listen(PORT, '0.0.0.0', () =>
console.info(`Server Running on Port: http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));