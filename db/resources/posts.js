const chance = require('../../lib/chance');

module.exports = async () => {
  return [
    {
      title: chance.string(),
      date: chance.date().toString(),
      author: chance.name(),
      content: chance.paragraph(),
      comments: [
        {
          author: chance.name(),
          date: chance.date.toString(),
          content: chance.string(),
        },
      ],
    },
    {
      title: chance.string(),
      date: chance.date().toString(),
      author: chance.name(),
      content: chance.paragraph(),
      comments: [
        {
          author: chance.name(),
          date: chance.date().toString(),
          content: chance.string(),
        },
      ],
    },
    {
      title: chance.string(),
      date: chance.date().toString(),
      author: chance.name(),
      content: chance.paragraph(),
      comments: [
        {
          author: chance.name(),
          date: chance.date().toString(),
          content: chance.string(),
        },
      ],
    },
  ];
};
