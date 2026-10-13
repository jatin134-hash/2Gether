import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MongoDB connection failed: MONGODB_URI is not set in backend/.env.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { dbName: "2gether" });
    console.log("MongoDB connected successfully to database 2gether.");
  } catch (error) {
    const code = error?.code ?? error?.cause?.code;
    const errorType = error?.name || "UnknownError";
    console.error(
      `MongoDB connection failed (${errorType}${code ? `, code ${code}` : ""}). Check MONGODB_URI, Atlas network access, and DNS resolution.`,
    );
    process.exit(1);
  }
}
