import connectToDatabase from "../../../lib/mongodb";
import KeyValue from "../../../models/KeyValue";

export async function GET() {
  try {
    await connectToDatabase();
    const keyValues = await KeyValue.find({}).sort({ createdAt: -1 });
    return Response.json(keyValues);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { key, value } = await request.json();

    if (!key || !value) {
      return Response.json(
        { error: "Key and value are required" },
        { status: 400 }
      );
    }

    const newKeyValue = new KeyValue({ key, value });
    await newKeyValue.save();

    return Response.json(newKeyValue, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({ error: "Key already exists" }, { status: 400 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}
