import { Router } from "express";
import {db} from '../utils/db.js'
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    const collection = db.collection('products')
    const products = await collection.find().toArray();

    return res.status(200).json({data:products})
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
    try{
        const collection = db.collection('products')
        const productData = {...req.body}
        const products = await collection.insertOne(productData)
    
        return res.status(200).json({"message": "Product has been created successfully" })
    }catch(e){
        return res.status(500).json({"message":"Internal Server Error"})
    }
});

productRouter.put("/:productId", async (req, res) => {
    try {
        const collection = db.collection("products");
    
        const productId = new ObjectId(req.params.productId);

        const productData = { ...req.body };
 
        const result = await collection.updateOne(
          { _id: productId },
          { $set: productData }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).json({ message: "Product not found or no changes were made" });
        }
    
        return res.status(200).json({
          message: "Product has been updated successfully"
        });
      } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
});

productRouter.delete("/:id", async (req, res) => {
    try{
        const collection = db.collection("products");
        const productId = new ObjectId(req.params.id);
        const result = await collection.deleteOne(
            {_id:productId}
        )

        return res.status(200).json({
            "message": "Product has been deleted successfully"
           })
    }catch(e){
        return res.status(500).json({"message":"Internal Server Error"})
    }
 
});

export default productRouter;
