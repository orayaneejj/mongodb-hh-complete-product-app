import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

// get all products
productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const products = await collection.find({}).toArray();
    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// get product by ID
productRouter.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productID = new ObjectId(req.params.id);
    const product = await collection.findOne({ _id: productID });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// post new product
productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productData = { ...req.body };
    const result = await collection.insertOne(productData);

    return res.status(201).json({
      message: "Product has been created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// put product by ID
productRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productID = new ObjectId(req.params.id);
    const newProductData = { ...req.body };

    const result = await collection.updateOne(
      { _id: productID },
      { $set: newProductData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product has been updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// delete product by ID
productRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productID = new ObjectId(req.params.id);

    const result = await collection.deleteOne({ _id: productID });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default productRouter;
