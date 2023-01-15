const { pick } = require('lodash');
const { initializeFirestore, error } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) throw error(400, 'Missing requiered params');
  const { me } = req.user;
  if (!me) {
    throw error(404, 'Missing required params');
  }
  const db = initializeFirestore();

  const { date, author, content } = req.body;
  const postRef = db.collection('posts');
  const docPost = await postRef.get();
  if (!docPost.exists) {
    throw error(404, 'Post not found!');
  }
  const comments = docPost.comments;
  docPost.push(req.body);
  await postRef.update({ ...docPost, comments });
  const commentsRef = db.collection('comments');
  const snapshot = await commentsRef
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

  const response = await commentsRef.add(payload);
  if (!response.id) {
    throw error(500, 'Failed to create comment');
  }
  const data = (await response.get()).data();
  data.id = response.id;

  return res.status(200).json({ data, message: 'Comment created' });
};
