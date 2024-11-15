import { Router } from "express";
import {db} from '../utils/db.js'

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    const collection = db.collection('products')
    const products = await collection.find().toArray();

    return res.status(200).json({data:products})
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
    const collection = db.collection('products')
    const productData = {...req.body}
    const products = await collection.insertOne(productData)

    return res.status(200).json({"message": "Product has been created successfully" })
});

productRouter.put("/:productId", async (req, res) => {
    const collection = db.collection('products');
    const productId = req.params
    const productData = {...req.body}
    const products = await collection.updateOne(
        {_id:productId},
        {$set:productData}
    )

    return res.status(200).json({
        "message": "Product has been updated successfully"
       })
});

productRouter.delete("/:id", async (req, res) => {
    const collection = db.collection('products');
    const productId = req.params;
    const products = await collection.deleteOne(
        {_id:productId}
    )

    return res.status(200).json({
        "message": "Product has been deleted successfully"
       })
});

export default productRouter;
