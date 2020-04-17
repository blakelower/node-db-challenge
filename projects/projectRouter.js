const express = require("express");
const Projects = require("./projectModel")
const Tasks = require("../tasks/task-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.findProjects();
    const recievedProjects = projects.map(project => {
      return {
        ...project,
        completed: project.completed === 0 ? false : true
      };
    });
    res.status(200).json(recievedProjects);
  } catch (error) {
    res.status(500).json({ error: "Projects could not be found" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.findById(id);
    if (!project)
      return res
        .status(404)
        .json(`project with id of ${id} could not be found`);
    res
      .status(200)
      .json({ ...project, completed: project.completed === 0 ? false : true });
  } catch (error) {
    res.status(500).json({ error: "Project could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  const projectData = req.body;

  if (!req.body)
    return res.status(400).json({
      errorMessage: "Please provide required info."
    });
  try {
    const project = await Projects.add(projectData);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create new project" });
  }
});

// Tasks
router.get("/:id/tasks", async (req, res) => {
  const { id } = req.params;

  try {
    const tasks = await Tasks.findTasks(id);
    const transformedTasks = tasks.map(task => {
      return {
        ...task,
        completed: task.completed === 0 ? false : true
      };
    });
    res.status(200).json(transformedTasks);
  } catch (error) {
    res.status(500).json({ error: "Task not found" });
  }
});

router.post("/:id/tasks", (req, res) => {
  Projects.addTask(req.body, req.params.id)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed" });
    });
});

module.exports = router;
