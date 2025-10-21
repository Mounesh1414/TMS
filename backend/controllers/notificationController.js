import Notification from '../models/Notification.js';
import { publishToUser } from '../utils/sse.js';

export const listMyNotifications = async (req, res) => {
  try {
    const { unread, limit = 20, page = 1 } = req.query;
    const query = { userId: req.user.userId };
    if (unread === 'true') query.read = false;
    const lim = Math.max(1, Math.min(Number(limit), 100));
    const pg = Math.max(1, Number(page));
    const total = await Notification.countDocuments(query);
    const items = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip((pg - 1) * lim)
      .limit(lim);
    const unreadCount = await Notification.countDocuments({ userId: req.user.userId, read: false });
    const hasMore = pg * lim < total;
    res.json({ notifications: items, unreadCount, total, page: pg, limit: lim, hasMore });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notif = await Notification.findOne({ _id: id, userId: req.user.userId });
    if (!notif) return res.status(404).json({ message: 'Notification not found' });
    if (!notif.read) {
      notif.read = true;
      await notif.save();
    }
    res.json({ message: 'Marked as read', notification: notif });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.user.userId, read: false }, { $set: { read: true } });
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Helper to create a notification from controllers
export const createUserNotification = async ({ userId, type, title, message, metadata }) => {
  try {
    const notif = new Notification({ userId, type, title, message, metadata });
    await notif.save();
    try { publishToUser(String(userId), { type: 'notification', notification: notif }); } catch {}
    return notif;
  } catch (e) {
    // Best-effort, don't throw to avoid breaking core flow
    console.error('Failed to create notification:', e.message);
    return null;
  }
};
