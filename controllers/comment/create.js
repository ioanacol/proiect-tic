const { pick } = require('lodash');
const { initializeFirestore, error } = require('../../functions');

module.exports = async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(404, 'Missing required params');
  }

  const { date, author, content} = req.body;
  const db = initializeFirestore();
  const commentRef = db.collection('comments');
  const snapshot = await commentRef
    .where('date', '==', date)
    .where('author', '==', author)
    .where('content', '==', content)
    .where('identity.id', '==', me)
    .get();
  if (snapshot.size) {
    throw error(409, 'An identical comment already exists');
  }

  const identitiesRef = db.collection('identities');
  const doc = await identitiesRef.doc(me).get();
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }

  const payload = {
    identity: {
      ...pick(doc.data(), ['date', 'author', 'content']),
      id: doc.id,
    },
    date: date.trim(),
    author: author.trim(),
    content: content.trim(),
  };

  const response = await commentRef.add(payload);
  if (!response.id) {
    throw error(500, 'Failed to create comment');
  }
  const data = (await response.get()).data();
  data.id = response.id;

  return res.status(200).json({ data, message: 'Comment created' });
};
