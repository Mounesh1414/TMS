import Flight from '../models/Flight.js';

export const getFlights = async (req, res) => {
  try {
    const { source, destination, operatorType, operatorName, sortBy = 'fare', order = 'asc', limit } = req.query;
    const filter = {};
    if (source) filter.source = new RegExp(source, 'i');
    if (destination) filter.destination = new RegExp(destination, 'i');
    if (operatorType) filter.operatorType = operatorType;
    if (operatorName) filter.operatorName = new RegExp(operatorName, 'i');
    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };
    const q = Flight.find(filter).sort(sort);
    if (limit) q.limit(Number(limit));
    const flights = await q;
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addFlight = async (req, res) => {
  try {
    const flight = new Flight({
      operatorType: 'private',
      ...req.body,
      availableSeats: req.body.totalSeats
    });
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFlight = async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flight deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
