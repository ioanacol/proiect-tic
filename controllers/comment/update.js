const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { me } = req.user;
  if (!id) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const commentRef = db.collection('comment').doc(id);
  const doc = await commentRef.get();
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }
  if (doc.data().identity.id !== me) {
    throw error(400, 'Not allowed to update comment');
  }
  const payload = {};
  const { date, author, content } = req.body;
  if (date) {
    payload.date = date;
  }
  if (author) {
    payload.author = author;
  }
  if (content) {
    payload.content = content;
  }

  await commentRef.update(payload);
  const data = (await commentRef.get()).data();

  return res.status(200).json({ data, message: 'Comment updated' });
};
