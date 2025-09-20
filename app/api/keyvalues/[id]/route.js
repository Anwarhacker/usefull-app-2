import connectToDatabase from "../../../../lib/mongodb";
import KeyValue from "../../../../models/KeyValue";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const keyValue = await KeyValue.findById(params.id);

    if (!keyValue) {
      return Response.json({ error: "KeyValue not found" }, { status: 404 });
    }

    return Response.json(keyValue);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { key, value } = await request.json();

    if (!key || !value) {
      return Response.json(
        { error: "Key and value are required" },
        { status: 400 }
      );
    }

    const updatedKeyValue = await KeyValue.findByIdAndUpdate(
      params.id,
      { key, value },
      { new: true, runValidators: true }
    );

    if (!updatedKeyValue) {
      return Response.json({ error: "KeyValue not found" }, { status: 404 });
    }

    return Response.json(updatedKeyValue);
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({ error: "Key already exists" }, { status: 400 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const deletedKeyValue = await KeyValue.findByIdAndDelete(params.id);

    if (!deletedKeyValue) {
      return Response.json({ error: "KeyValue not found" }, { status: 404 });
    }

    return Response.json({ message: "KeyValue deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
