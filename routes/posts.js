var express = require('express');
var fakeFacebook = require('fake-facebook');
var router = express.Router()

var authMiddleware = function(req, res, next) {
    if (req.query.token !== undefined && fakeFacebook.getAllTokens().includes(parseInt(req.query.token))) {
        req.query.token = parseInt(req.query.token);
        return next();
    }
    res.status(401).json({message: 'Token not valid'});
}

router.post('/', authMiddleware, function(req, res) {
    fakeFacebook.createPost(req.query.token, { title: req.body.title});
    res.status(201).json({message: 'Post created'});
})

router.get('/', authMiddleware, function(req, res) {
    res.json(fakeFacebook.getUserById(req.query.token).posts);
});

router.delete('/:id', authMiddleware, function(req, res) {
    res.json(fakeFacebook.removePosts(req.query.token, parseInt(req.params.id)));
});


module.exports = router;
