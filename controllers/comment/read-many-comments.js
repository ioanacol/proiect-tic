const { initializeFirestore, error } = require('../../functions');

module.exports = async (req, res) => {
  const db = initializeFirestore();
  const commentRef = db.collection('comments');
  let snapshot;
  snapshot = await commentRef.get();
  const data = snapshot.docs.map((doc) => doc.data());

  return res.status(200).json(data);
};
