const { Router } = require('express');
const { Post } = require('../controllers');

const router = Router();

router.post('/admin/posts', Post.create);
router.get('/posts', Post.readMany);
router.get('/posts/:id', Post.readOne);
router.put('/admin/posts/:id', Post.update);
router.delete('/admin/posts/:id', Post.remove);

module.exports = router;
