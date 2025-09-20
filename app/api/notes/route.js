import connectToDatabase from "../../../lib/mongodb";
import Note from "../../../models/Note";

export async function GET() {
  try {
    await connectToDatabase();
    const notes = await Note.find({}).sort({ createdAt: -1 });
    return Response.json(notes);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { title, content } = await request.json();

    if (!title || !content) {
      return Response.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const newNote = new Note({ title, content });
    await newNote.save();

    return Response.json(newNote, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
