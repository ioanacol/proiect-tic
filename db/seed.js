const identities = require('./seeds/001_identities');
const posts = require('./seeds/002_posts');

const seed = async () => {
  await identities.seed();
  await posts.seed();
};

(async () => {
  try {
    await seed();
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

module.exports = seed;
