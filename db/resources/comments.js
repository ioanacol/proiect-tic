const { randomDate, randomUsername } = require('../../functions');
const chance = require('../../lib/chance');

module.exports = async () => {
  return [
    {
      author: randomUsername(),
      date: randomDate(),
      content: chance.sentence({ words: 10 }),
    },
    {
      author: randomUsername(),
      date: randomDate(),
      content: chance.sentence({ words: 10 }),
    },
    {
      author: randomUsername(),
      date: randomDate(),
      content: chance.sentence({ words: 10 }),
    },
  ];
};
