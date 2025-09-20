import connectToDatabase from "../../../lib/mongodb";
import Command from "../../../models/Command";

export async function GET() {
  try {
    await connectToDatabase();
    const commands = await Command.find({}).sort({ createdAt: -1 });
    return Response.json(commands);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { title, command } = await request.json();

    if (!title || !command) {
      return Response.json(
        { error: "Title and command are required" },
        { status: 400 }
      );
    }

    const newCommand = new Command({ title, command });
    await newCommand.save();

    return Response.json(newCommand, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
