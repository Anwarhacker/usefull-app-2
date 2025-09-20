import connectToDatabase from "../../../../lib/mongodb";
import Note from "../../../../models/Note";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const note = await Note.findById(params.id);

    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    return Response.json(note);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { title, content } = await request.json();

    if (!title || !content) {
      return Response.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(
      params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    return Response.json(updatedNote);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const deletedNote = await Note.findByIdAndDelete(params.id);

    if (!deletedNote) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    return Response.json({ message: "Note deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
