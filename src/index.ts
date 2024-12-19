import express from "express";
import productsRouter from "./routes/ProductRoutes";
import pricingRouter from "./routes/PricingRoutes";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerConfig'; 

var cors = require('cors')
const app = express();

app.use(cors())

app.use(express.json());
const port = 3000


app.use("/api/v1/products", productsRouter);
app.use("/api/v1/pricing", pricingRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {

})
