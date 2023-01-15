const { Router } = require('express');
const { Comment } = require('../controllers');

const router = Router();

router.post('/admin/comments', Comment.create);
router.get('/comments', Comment.readMany);
router.get('/comments/:id', Comment.readOne);
router.put('/admin/comments/:id', Comment.update);
router.delete('/admin/comments/:id', Comment.remove);

router.get('/posts/:id/comments', Comment.readManyComments);
router.post('/admin/posts/:id/comments', Comment.createComment);
router.get('/posts/:id/comments/:id', Comment.readOneComment);
router.put('/admin/posts/:id/comments/:id', Comment.updateComment);
router.delete('/admin/posts/:id/comments/:id', Comment.removeComment);

module.exports = router;
