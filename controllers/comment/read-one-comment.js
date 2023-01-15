const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const commentRef = db.collection('comments').doc(id);
  const doc = await commentRef.get();
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }
  const data = doc.data();
  return res.status(200).json(data);
};
