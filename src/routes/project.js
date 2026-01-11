const express = require("express");
const { Project, ProjectTester } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth(["PM", "TST"]), async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", auth("PM"), async (req, res) => {
  try {
    const project = await Project.create(req.body);

   
    await ProjectTester.create({
      projectId: project.id,
      userId: req.user.id
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
