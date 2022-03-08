import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    providerId: {
      type: String,
    },
    tag: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model('users', UserSchema);
