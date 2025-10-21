const subscribers = new Map(); // userId -> Set(res)

export const subscribe = (userId, res) => {
  if (!subscribers.has(userId)) subscribers.set(userId, new Set());
  subscribers.get(userId).add(res);
};

export const unsubscribe = (userId, res) => {
  const set = subscribers.get(userId);
  if (!set) return;
  set.delete(res);
  if (set.size === 0) subscribers.delete(userId);
};

export const publishToUser = (userId, payload) => {
  const set = subscribers.get(String(userId));
  if (!set || set.size === 0) return;
  const data = JSON.stringify(payload);
  for (const res of set) {
    try {
      res.write(`data: ${data}\n\n`);
    } catch (e) {
      // ignore broken pipe
    }
  }
};
