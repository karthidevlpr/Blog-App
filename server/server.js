import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dontenv from "dotenv";
import dbConnection from "./db.js";
import routes from "./routes/routes.js"
import {ApolloServer} from "apollo-server-express"
import typeDefs from "./schema/typeDefs.js"
import resolvers from "./schema/resolvers.js"

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

const startApolloServer = async () => {
  const apolloServer = new ApolloServer({typeDefs, resolvers})
  await apolloServer.start()
  apolloServer.applyMiddleware({app})
}
await startApolloServer()

routes(app);

dbConnection().then(() => app.listen(PORT, '0.0.0.0', () =>
console.info(`Server Running on Port: http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));