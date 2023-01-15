const chance = require('../../lib/chance');
const { hashSync } = require('bcryptjs');

module.exports = async () => {
  const roles = ['admin', 'client'];

  return [
    {
      email: 'ioana@email.com',
      name: 'Ioana Colceag',
      password: hashSync('supersecretpassword'),
      role: 'admin',
      username: 'ioana.colceag',
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync('supersecretpassword'),
      role: chance.pickone(roles),
      username: chance.string({ length: 8 }),
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync('supersecretpassword'),
      role: chance.pickone(roles),
      username: chance.string({ length: 8 }),
    },
    // TODO: remove this
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync('supersecretpassword'),
      role: chance.pickone(roles),
      username: chance.string({ length: 8 }),
    },
  ];
};
