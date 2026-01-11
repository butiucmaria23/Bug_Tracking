const express = require("express");
const { Bug, Project } = require("../models");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth(), async (req, res) => {
  try {
    const { severity, description, commitLink, projectId } = req.body;

    const bug = await Bug.create({
      severity,
      description,
      commitLink,
      projectId,
      reportedBy: req.user.id,
      assignedTo: null
    });

    res.json(bug);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



router.get("/:projectId", auth(["PM", "TST"]), async (req, res) => {
  try {
    const bugs = await Bug.findAll({
      where: { projectId: req.params.projectId }
    });
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/assign/:id", auth(["PM", "TST"]), async (req, res) => {
  const bug = await Bug.findByPk(req.params.id);
  if (!bug) return res.status(404).json({ error: "Bug not found" });

  bug.assignedTo = req.user.id;
  bug.status = "in_progress";
  await bug.save();

  res.json(bug);
});

router.put("/resolve/:id", auth(), async (req, res) => {
  const bug = await Bug.findByPk(req.params.id);
  if (!bug) return res.status(404).json({ error: "Bug not found" });

 
  if (bug.assignedTo !== req.user.id && req.user.role !== "PM") {
    return res.status(403).json({ error: "Not allowed to resolve this bug" });
  }

  bug.status = "resolved";
  bug.commitLink = req.body.commitLink;
  await bug.save();

  res.json(bug);
});


module.exports = router;
