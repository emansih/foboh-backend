import express from "express";
import productsRouter from "./routes/ProductRoutes";

const app = express();

app.use(express.json());
const port = 3000


app.use("/", productsRouter);
  
app.listen(port, () => {

})
