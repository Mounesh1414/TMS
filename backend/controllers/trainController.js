import Train from '../models/Train.js';

export const getTrains = async (req, res) => {
  try {
    const { source, destination, operatorType, operatorName, sortBy = 'fare', order = 'asc', limit } = req.query;
    const filter = {};
    if (source) filter.source = new RegExp(source, 'i');
    if (destination) filter.destination = new RegExp(destination, 'i');
    if (operatorType) filter.operatorType = operatorType;
    if (operatorName) filter.operatorName = new RegExp(operatorName, 'i');
    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };
    const q = Train.find(filter).sort(sort);
    if (limit) q.limit(Number(limit));
    const trains = await q;
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTrain = async (req, res) => {
  try {
    const train = new Train({
      operatorType: 'government',
      ...req.body,
      availableSeats: req.body.totalSeats
    });
    await train.save();
    res.status(201).json(train);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(train);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTrain = async (req, res) => {
  try {
    await Train.findByIdAndDelete(req.params.id);
    res.json({ message: 'Train deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
