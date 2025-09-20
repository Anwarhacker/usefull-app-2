import connectToDatabase from "../../../lib/mongodb";
import Project from "../../../models/Project";

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return Response.json(projects);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { name, urls } = await request.json();

    if (!name || !urls || !Array.isArray(urls) || urls.length === 0) {
      return Response.json(
        { error: "Name and at least one URL are required" },
        { status: 400 }
      );
    }

    const newProject = new Project({ name, urls });
    await newProject.save();

    return Response.json(newProject, { status: 201 });
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
