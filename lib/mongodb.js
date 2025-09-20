import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // Increased timeout for Atlas connections
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      family: 4, // Use IPv4, skip trying IPv6
      tls: true, // Enable TLS for Atlas
      tlsAllowInvalidCertificates: false, // Don't allow invalid certificates
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB Atlas successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB Atlas connection error:", e.message);
    console.error("Full error:", e);

    // For development, provide helpful error message
    if (e.message.includes("whitelisted")) {
      console.error(
        "\n🔧 SOLUTION: Add your IP address to MongoDB Atlas whitelist:"
      );
      console.error("1. Go to: https://cloud.mongodb.com/");
      console.error("2. Navigate to: Network Access > Add IP Address");
      console.error("3. Add your current IP address");
      console.error("4. Wait 1-3 minutes for changes to take effect\n");
    }

    throw new Error(`Failed to connect to MongoDB Atlas: ${e.message}`);
  }

  return cached.conn;
}

export default connectToDatabase;
