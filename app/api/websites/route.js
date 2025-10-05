import connectToDatabase from "../../../lib/mongodb";
import Website from "../../../models/Website";

export async function GET() {
  try {
    await connectToDatabase();
    const websites = await Website.find({}).sort({ createdAt: -1 });
    return Response.json(websites);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { title, url, category } = await request.json();

    if (!title || !url || !category) {
      return Response.json(
        { error: "Title, URL, and category are required" },
        { status: 400 }
      );
    }

    const newWebsite = new Website({ title, url, category });
    await newWebsite.save();

    return Response.json(newWebsite, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json(
        { error: "Website with this title or URL already exists" },
        { status: 400 }
      );
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}