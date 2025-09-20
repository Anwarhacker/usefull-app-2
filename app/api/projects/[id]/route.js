import connectToDatabase from "../../../../lib/mongodb";
import Project from "../../../../models/Project";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const project = await Project.findById(params.id);

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json(project);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { name, urls } = await request.json();

    if (!name || !urls || !Array.isArray(urls) || urls.length === 0) {
      return Response.json(
        { error: "Name and at least one URL are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      params.id,
      { name, urls },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json(updatedProject);
  } catch (error) {
    if (error.code === 11000) {
      return Response.json(
        { error: "Project name already exists" },
        { status: 400 }
      );
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const deletedProject = await Project.findByIdAndDelete(params.id);

    if (!deletedProject) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json({ message: "Project deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
