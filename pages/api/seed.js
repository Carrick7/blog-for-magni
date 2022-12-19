import BlogPost from '../../models/BlogPost';
import data from '../../utils/data';
import db from '../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  await BlogPost.deleteMany();
  await BlogPost.insertMany(data.blogPosts);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;