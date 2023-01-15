const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { me } = req.user;
  if (!id) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const commentRef = db.collection('posts').doc(id);
  const doc = await commentRef.get();
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }
  if (doc.data().identity.id !== me) {
    throw error(400, 'Not allowed to remove comment');
  }
  const data = doc.data();
  await commentRef.delete();

  return res.status(200).json({ data, message: 'Comment removed' });
};
