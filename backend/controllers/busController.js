import Bus from '../models/Bus.js';

export const getBuses = async (req, res) => {
  try {
    const { source, destination, operatorType, operatorName, sortBy = 'fare', order = 'asc', limit } = req.query;
    const filter = {};
    if (source) filter.source = new RegExp(source, 'i');
    if (destination) filter.destination = new RegExp(destination, 'i');
    if (operatorType) filter.operatorType = operatorType;
    if (operatorName) filter.operatorName = new RegExp(operatorName, 'i');
    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };
    const q = Bus.find(filter).sort(sort);
    if (limit) q.limit(Number(limit));
    const buses = await q;
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addBus = async (req, res) => {
  try {
    const bus = new Bus({
      operatorType: 'government',
      ...req.body,
      availableSeats: req.body.totalSeats
    });
    await bus.save();
    res.status(201).json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bus deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
