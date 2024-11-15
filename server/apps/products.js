import { Router } from "express";
import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

const productRouter = Router();

productRouter.get("/", async(req, res) => {
    const collection = db.collection("products");
    const products = await collection
    .find({}).toArray();
    return res.status(200).json({data: products})
});

productRouter.get("/:id", async(req, res) => {
    const collection = db.collection("products");
    const { id } = req.params;
    const product = await collection.findOne({_id: new ObjectId(id)});
    return res.status(200).json(product);
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");
  const productData = { ...req.body };
  const product = await collection.insertOne(productData);
  return res.json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Invalid product ID');
}
  const productId = new ObjectId(id);
  const ProductData = { ...req.body };
  const result = await collection.updateOne(
    {
      _id: productId,
    },
    {
      $set: ProductData,
    }
  );
  return res.json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:id", async(req, res) => {
    const { id } = req.params;
    const collection = db.collection("products");
    const result = await collection.deleteOne({_id: new ObjectId(id)});
    return res.status(200).json({
        message: "Product has been deleted successfully"
    }) 
});

export default productRouter;
