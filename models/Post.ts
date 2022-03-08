import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
    },
    text: {
      type: String,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    like: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    comment: {
      type: [mongoose.Schema.Types.Mixed],
    },
  },
  { timestamps: true }
);

export default mongoose.models.posts || mongoose.model('posts', PostSchema);
