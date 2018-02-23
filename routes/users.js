var express = require('express');
var router = express.Router();
var fakeFacebook = require('fake-facebook');

var authMiddleware = function(req, res, next) {
    if (req.query.token !== undefined && fakeFacebook.getAllTokens().includes(parseInt(req.query.token))) {
        req.query.token = parseInt(req.query.token);
        return next();
    }
    res.status(401).json({message: 'Token not valid'});
}

var isMyFriends = function(req, res, next) {
    req.params.id = parseInt(req.params.id);
    if (fakeFacebook.areFriends(req.query.token, req.params.id)) {
        return next();
    }
    res.status(401).json({message: 'You have not permission to show this posts'});
}

router.get('/', function(req, res) {
    res.json(fakeFacebook.getAll());
});

router.get('/:id/posts', authMiddleware, isMyFriends, function(req, res) {
    res.json(fakeFacebook.getUserById(req.params.id).posts);
});

module.exports = router;
