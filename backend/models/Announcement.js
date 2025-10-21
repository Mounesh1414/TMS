import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String },
    content: { type: String },
    publishedAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

AnnouncementSchema.index({ active: 1, publishedAt: -1 });

export default mongoose.model('Announcement', AnnouncementSchema);
