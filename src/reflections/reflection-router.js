const express = require('express');
const ReflectionService = require('./reflection-service');
const { requireAuth } = require('../middleware/jwt-auth');

const reflectionRouter = express.Router();
const jsonParser = express.json();

reflectionRouter
    .route('/')
    .get(requireAuth, (req, res, next) => {
        console.log('called', req.user.id);
        ReflectionService.getReflections(req.app.get('db'), req.user.id)
            .then((reflections) => res.json(reflections))
            .catch(next);
    })
    .post(requireAuth, (req, res, next) => {
        if(!req.body.title){
            res.status(400).json({ error: 'Title is required'})
        }
        const newReflection = req.body;
        newReflection.userid = req.user.id;

        ReflectionService.insertReflection(req.app.get('db'), newReflection)
            .then((reflection) => {
                res.status(201).location(`/reflections/${reflection.id}`).json(reflection);
            })
            .catch(next);
    })

reflectionRouter
    .route('/:id')
    .all(requireAuth, (req, res, next) => {
        cid = parseInt(req.params.id);
        ReflectionService.getById(req.app.get('db'), cid, req.user.id)
            .then((reflections) => {
                if(!reflections){
                    return res.status(404).json({ error: { message: `reflection doesn't exist` }})
                }
                res.reflections = reflections;
                next();
            })
            .catch(next);
    })
    .delete(requireAuth, (req, res, next) => {
        ReflectionService.deleteReflection(req.app.get('db'), cid, req.user.id)
            .then(() => {
                res.status(204).end();
            })
            .catch(next);
    })
    .patch(requireAuth, jsonParser, (req, res, next) => {
        const updateReflection = req.body;
        ReflectionService.updateReflection(req.app.get('db'), cid, updateReflection, req.user.id)
            .then(() => {
                res.status(200).json((res.updateReflection = updateReflection));
            })
            .catch(next);
    });

module.exports = reflectionRouter;