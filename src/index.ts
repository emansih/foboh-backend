import express from "express";
import productsRouter from "./routes/ProductRoutes";
import pricingRouter from "./routes/PricingRoutes";

var cors = require('cors')
const app = express();

app.use(cors())

app.use(express.json());
const port = 3000


app.use("/products", productsRouter);
app.use("/pricing", pricingRouter);

app.listen(port, () => {

})
