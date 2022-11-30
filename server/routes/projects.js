const express = require('express');
const { requireAuth } = require('./middleware');
const mongoose = require('mongoose');
const { Project } = require('../database/schemas');

const router = express.Router();

module.exports = router;

router.get('/', requireAuth, (req, res) => {
  Project.find({ user: req.user.id }, { __v: 0, user: 0 }, (err, projects) => {
    if (err) {
      res.status(400).send({ message: 'Get users failed', err });
    } else {
      res.send({ message: 'Projects retrieved successfully', projects });
    }
  });
});

router.get('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) {
    console.log('invalid id');
  }
  try {
    const project = await Project.findById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/', requireAuth, (req, res) => {
  req.body.user = req.user.id;

  console.log(req.body);
  const newProject = Project(req.body);

  console.log(newProject);

  newProject.save((err, savedProject) => {
    if (err) {
      res.status(400).send({ message: 'Create Project failed', err });
    } else {
      res.send({
        message: 'Project created successfully',
        project: savedProject,
      });
    }
  });
});

router.put('/', requireAuth, (req, res) => {
  Project.findById(req.body.id, { __v: 0, user: 0 }, (err, project) => {
    if (err) {
      res.status(400).send({ message: 'Update project failed', err });
    } else {
      console.log(req.body);
      project.title = req.body.title;
      project.updated_at = Date.now();
      project.save((err, savedProject) => {
        if (err) {
          res.status(400).send({ message: 'Update project failed', err });
        } else {
          res.send({
            message: 'Updated project successfully',
            project: savedProject,
          });
        }
      });
    }
  });
});

router.delete('/', requireAuth, (req, res) => {
  Project.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      res.status(400).send({ message: 'Delete Project failed', err });
    } else {
      res.send({ message: 'Project successfully delete' });
    }
  });
});
