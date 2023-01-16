const {
  initializeFirestore,
  randomDate,
  randomUsername,
} = require('../../functions');
const chance = require('../../lib/chance');

module.exports = async () => {
  const db = initializeFirestore();
  const comments = await db.collection('comments').get();
  const commentsData = comments.docs.map((comment) => comment.data());

  return [
    {
      title: chance.sentence({ words: 4 }),
      date: randomDate(),
      author: randomUsername(),
      content: chance.paragraph({ sentences: 10 }),
      comments: [commentsData[0]],
    },
    {
      title: chance.sentence({ words: 4 }),
      date: randomDate(),
      author: randomUsername(),
      content: chance.paragraph({ sentences: 10 }),
      comments: [commentsData[1]],
    },
    {
      title: chance.sentence({ words: 4 }),
      date: randomDate(),
      author: randomUsername(),
      content: chance.paragraph({ sentences: 10 }),
      comments: [commentsData[2]],
    },
  ];
};
