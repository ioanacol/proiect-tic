const { pick } = require('lodash');
const { initializeFirestore, error } = require('../../functions');

module.exports = async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(404, 'Missing required params');
  }

  const { title, date, author, content, comments } = req.body;
  const db = initializeFirestore();
  const postsRef = db.collection('posts');
  const snapshot = await postsRef
    .where('title', '==', title)
    .where('date', '==', date)
    .where('author', '==', author)
    .where('content', '==', content)
    .where('comments', '==', comments)
    .where('identity.id', '==', me)
    .get();
  if (snapshot.size) {
    throw error(409, 'An identical post already exists');
  }

  const identitiesRef = db.collection('identities');
  const doc = await identitiesRef.doc(me).get();
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }

  const payload = {
    identity: {
      ...pick(doc.data(), ['title', 'date', 'author', 'content', 'comments']),
      id: doc.id,
    },
    title: title.trim(),
    date: date.trim(),
    author: author.trim(),
    content: content.trim(),
    comments: comments,
  };

  const response = await postsRef.add(payload);
  if (!response.id) {
    throw error(500, 'Failed to create post');
  }
  const data = (await response.get()).data();
  data.id = response.id;

  return res.status(200).json({ data, message: 'Post created' });
};
