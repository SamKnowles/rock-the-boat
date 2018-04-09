const express = require('express');
const issuesRouter = express.Router();
const issueModel = require('../model/issues');

issuesRouter.route('/')
    .post((req, res) => {
        let newIssue = new issueModel(req.body);
        newIssue.save(req.body, (err, savedIssue) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(savedIssue);
            }
        })
    })
    .get((req, res) => {
        issueModel.find((err, foundIssue) => {
            if (err) {
                console.error(err);
            }
            else {
                res.send(foundIssue);
            }
        });
    });
issuesRouter.route('/:id')
    .get((req, res) => {
        let { id } = req.params;
        issueModel.findById({ _id: id }, (err, foundIssue) => {
            if (err) {
                console.error(err);
            }
            else {
                res.send(foundIssue);
            }
        })
    })
    .delete((req, res) => {
        let { id } = req.params;
        issueModel.findByIdAndRemove(id, (err, removedIssue) => {
            if (err) {
                console.error(err);
            }
            else {
                res.send(removedIssue);
            }
        })
    })
    .put((req, res) => {
        let { id } = req.params;
        issueModel.findByIdAndUpdate(id, req.body, { new: true }, (err, updatedIssue) => {
            if (err) {
                console.error(err);
            } else {
                res.send(updatedIssue);
            }
        })
    })

module.exports = issuesRouter;
