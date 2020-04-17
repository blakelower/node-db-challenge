  
const express = require("express");
const Resources = require("./resourceModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const resources = await Resources.findResources();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: "Resources could not be found" });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await Resources.findById(id);
    if (!resource)
      return res
        .status(404)
        .json(`resource could not be found`);
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: "Project could not be found" });
  }
});

router.post("/", async (req, res) => {
  const resourceData = req.body;

  if (!req.body)
    return res.status(400).json({
      errorMessage: "Need more info"});
  try {
    const count = await Resources.add(resourceData);
    res.status(201).json(count);
  } catch (error) {
    res.status(500).json({ error: "Failed" });
  }
});

module.exports = router;