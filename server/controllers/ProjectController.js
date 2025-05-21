import Project from "../models/ProjectModel.js";
import User from "../models/UserModel.js";

const addProject = async (req, res) => {
    try {
        const { name, owner, members } = req.body;

        console.log("Received data:", req.body)

        if (!name || !owner || !members) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingProject = await Project.findOne({ name });
        if (existingProject) {
            return res.status(400).json({ message: "Project already exists" });
        }

        if(members.length === 0) {
            return res.status(400).json({ message: "Members are required" });
        }

        if(members.length > 3) {
            return res.status(400).json({ message: "Maximum of 3 members allowed" });
        }

        if(members.includes(owner)) {
            return res.status(400).json({ message: "Owner cannot be a member" });
        }

        for (const member of members) {
            const existingMember = await User.findOne({ _id: member });
            if (!existingMember) {
                return res.status(400).json({ message: "Member not found" });
            }
        }

        const project = new Project({
            name,
            owner,
            members,
        });
        await project.save();
        res.status(200).json({ message: "Project added successfully", project });
        
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ message: "Server error" });
        
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Project ID is required" });
        }
        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const updateProject= async (req, res) => {
    try {
        const {id, name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Project ID is required" });
        }
        const project = await Project.findByIdAndUpdate(id, { name }, { new: true });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project updated successfully", project });
        
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const getAllUserProjects = async (req, res) => {
    try {
        const { id } = req.body;
        console.log("Received data pro:", req.body);
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const projects = await Project.find({
            $or: [
                { owner: id },
                { members: id },
            ],
        }
        ).populate('owner').populate('members');
        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: "No projects found" });
        }
        res.status(200).json({ projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.body;
        console.log("Received data projest:", req.body);
        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required" });
        }
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ project });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export { addProject, deleteProject, getAllUserProjects, getProjectById, updateProject };