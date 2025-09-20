import connectToDatabase from "../../../../lib/mongodb";
import Command from "../../../../models/Command";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const command = await Command.findById(params.id);

    if (!command) {
      return Response.json({ error: "Command not found" }, { status: 404 });
    }

    return Response.json(command);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { title, command } = await request.json();

    if (!title || !command) {
      return Response.json(
        { error: "Title and command are required" },
        { status: 400 }
      );
    }

    const updatedCommand = await Command.findByIdAndUpdate(
      params.id,
      { title, command },
      { new: true, runValidators: true }
    );

    if (!updatedCommand) {
      return Response.json({ error: "Command not found" }, { status: 404 });
    }

    return Response.json(updatedCommand);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const deletedCommand = await Command.findByIdAndDelete(params.id);

    if (!deletedCommand) {
      return Response.json({ error: "Command not found" }, { status: 404 });
    }

    return Response.json({ message: "Command deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
