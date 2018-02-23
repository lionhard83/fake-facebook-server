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

router.put('/accept/:id', authMiddleware, function(req, res) {
    res.json(fakeFacebook.acceptRequest(req.query.token, parseInt(req.params.id)));
});

router.put('/decline/:id', authMiddleware, function(req, res) {
    res.json(fakeFacebook.deleteRequest(req.query.token, parseInt(req.params.id)));
});

router.post('/:id', authMiddleware, function(req, res) {
    res.json(fakeFacebook.friendlyRequest(req.query.token, parseInt(req.params.id)));
});




module.exports = router;
