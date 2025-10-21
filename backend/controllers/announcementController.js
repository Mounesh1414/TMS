import Announcement from '../models/Announcement.js';

export const listPublicAnnouncements = async (req, res) => {
  try {
    const limit = Math.max(1, Math.min(Number(req.query.limit) || 10, 50));
    const items = await Announcement.find({ active: true })
      .sort({ publishedAt: -1 })
      .limit(limit);
    res.json(items.map(a => ({
      id: a._id,
      title: a.title,
      link: a.link,
      content: a.content,
      publishedAt: a.publishedAt,
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const seedSampleAnnouncements = async (req, res) => {
  try {
    const count = await Announcement.countDocuments();
    if (count > 0) return res.status(400).json({ message: 'Announcements already seeded' });
    await Announcement.insertMany([
      { title: 'Re-engagement of retired officials for construction projects', link: '#', content: 'Under the jurisdiction of Southern Railway (CAO/CN/MS) – Chennai Egmore' },
      { title: 'Apply for branded edible packaged products approval at SR catering stalls', link: '#', content: '' },
      { title: 'Additional stoppage at stations for special trains', link: '#', content: '' },
    ]);
    res.json({ message: 'Seeded sample announcements' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
