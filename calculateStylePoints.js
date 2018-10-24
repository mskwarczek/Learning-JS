const calculateStylePoints = (styleNotes) => {
    return styleNotes.reduce(((sum, vote) => sum + vote), 0) - Math.min(...styleNotes) - Math.max(...styleNotes);
};

module.exports = calculateStylePoints;