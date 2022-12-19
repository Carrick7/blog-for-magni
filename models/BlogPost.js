import mongoose from 'mongoose';

//Schema for paragraphs inside each blog post
const bodySchema = new mongoose.Schema(
  {
    paraTitle: { type: String, lowercase: true },
    paraText: { type: String, lowercase: true, required: true },
    paraImageLink: { type: String },
  },
  {
    timestamps: true,
  }
);

//Schema for each SEO phrase for each blog post
const seoSchema = new mongoose.Schema(
    {seoWord: { type: String, lowercase: true}},
    {_id : false}
);

//Schema for each blog post in the appropriate collection
const blogPostSchema = new mongoose.Schema(
    {
        blogTitle: {type: String, lowercase: true, required: true},
        blogSummary: {type: String, lowercase: true, required: true},
        blogBanner: { type: String , required: true },
        blogSEO: [seoSchema],
        blogBody: [bodySchema]
    },
    {
        timestamps: true
    }
);

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;