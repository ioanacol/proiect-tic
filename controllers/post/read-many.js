const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const db = initializeFirestore();
  const postsRef = db.collection('posts');
  const snapshot = await postsRef.get();
  const data = snapshot.docs.map((doc) => doc.data());

  return res.status(200).json(data);
};
