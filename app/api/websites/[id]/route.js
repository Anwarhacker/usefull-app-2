import connectToDatabase from "../../../../lib/mongodb";
import Website from "../../../../models/Website";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const website = await Website.findById(params.id);

    if (!website) {
      return Response.json({ error: "Website not found" }, { status: 404 });
    }

    return Response.json(website);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { title, url, category } = await request.json();

    if (!title || !url || !category) {
      return Response.json(
        { error: "Title, URL, and category are required" },
        { status: 400 }
      );
    }

    const updatedWebsite = await Website.findByIdAndUpdate(
      params.id,
      { title, url, category },
      { new: true, runValidators: true }
    );

    if (!updatedWebsite) {
      return Response.json({ error: "Website not found" }, { status: 404 });
    }

    return Response.json(updatedWebsite);
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

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const deletedWebsite = await Website.findByIdAndDelete(params.id);

    if (!deletedWebsite) {
      return Response.json({ error: "Website not found" }, { status: 404 });
    }

    return Response.json({ message: "Website deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}