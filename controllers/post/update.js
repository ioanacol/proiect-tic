const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { me } = req.user;
  if (!id) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const postsRef = db.collection('posts').doc(id);
  const doc = await postsRef.get();
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }
  if (doc.data().identity.id !== me) {
    throw error(400, 'Not allowed to update post');
  }
  const payload = {};
  const { title, date, author, content, comments } = req.body;
  if (title) {
    payload.title = title;
  }
  if (date) {
    payload.date = date;
  }
  if (author) {
    payload.author = author;
  }
  if (content) {
    payload.content = content;
  }
  if (comments) {
    payload.comments = comments;
  }
  await postsRef.update(payload);
  const data = (await postsRef.get()).data();

  return res.status(200).json({ data, message: 'Post updated' });
};
