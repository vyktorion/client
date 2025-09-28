import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";
import mongoose from "mongoose";

const ProductList = async ({ params }: { params: "homepage" | "products" }) => {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in .env");
  }

  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to MongoDB");

    const ProductSchema = new mongoose.Schema({
      _id: String,
      name: String,
      shortDescription: String,
      description: String,
      price: Number,
      stock: {
        blue: Number,
        green: Number,
      },
      category: String,
      sizes: [String],
      colors: [String],
      images: {
        type: Object,
      },
      createdAt: Date,
      updatedAt: Date,
    });

    const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

    const products = await Product.find({});

    return (
      <div className="w-full">
        <Categories />
        {params === "products" && <Filter />}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
          {products.map((product) => {
            const plainProduct = product.toObject();
            if (!plainProduct._id) {
              return null;
            }
            return (
              <ProductCard key={plainProduct._id} product={{
                ...plainProduct,
                id: plainProduct._id,
              }} />
            );
          })}
        </div>
        <Link
          href={params === "products" ? "/products" : "/products?limit=8"}
          className="flex justify-end mt-4 underline text-sm text-gray-500"
        >
          View all products
        </Link>
      </div>
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    return <div>Failed to load products.</div>;
  }
};

export default ProductList;
