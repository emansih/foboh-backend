import request from "supertest";
import express, { Express } from "express";
import router from "./ProductRoutes"; 
import { InMemoryProducts } from "../storage/InMemoryProducts";

describe("GET /api/v1/products", () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/", router);
  });


  it("should return a list of products with global wholesale prices", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
        {
            "id": "HGVPIN216",
            "title": "High Garden Pinot Noir 2021",
            "sku": "HGVPIN216",
            "brand": "High Garden",
            "category": "Alcoholic Beverage",
            "subcategory": "Wine",
            "segmentId": "Red",
            "globalWholesalePrice": 27906
        },
        {
            "id": "KOYBRUNV6",
            "title": "Koyama Methode Brut Nature NV",
            "sku": "KOYBRUNV6",
            "brand": "Koyama Wines",
            "category": "Alcoholic Beverage",
            "subcategory": "Wine",
            "segmentId": "Sparkling",
            "globalWholesalePrice": 12000
        },
        {
            "id": "KOYNR1837",
            "title": "Koyama Riesling 2018",
            "sku": "KOYNR1837",
            "brand": "Koyama Wines",
            "category": "Alcoholic Beverage",
            "subcategory": "Wine",
            "segmentId": "Port/Dessert",
            "globalWholesalePrice": 21504
        },
        {
            "id": "KOYRIE19",
            "title": "Koyama Tussock Riesling 2019",
            "sku": "KOYRIE19",
            "brand": "Koyama Wines",
            "category": "Alcoholic Beverage",
            "subcategory": "Wine",
            "segmentId": "White",
            "globalWholesalePrice": 21504
        },
        {
            "id": "LACBNATNV6",
            "title": "Lacourte-Godbillon Brut Cru NV",
            "sku": "LACBNATNV6",
            "brand": "Lacourte-Godbillon",
            "category": "Alcoholic Beverage",
            "subcategory": "Wine",
            "segmentId": "Sparkling",
            "globalWholesalePrice": 40932
        }
    ]);
  });

  it("should return an empty list if no products are in InMemoryProducts", async () => {
    // Clear all products
    for (const key in InMemoryProducts) {
      delete InMemoryProducts[key];
    }

    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
