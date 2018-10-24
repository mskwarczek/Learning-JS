const calculateDistancePoints = (distance, hillSize, kPoint) => {
    switch (hillSize) {
        case 'normal': return 60 + (distance - kPoint) * 2;
        case 'large': return 60 + (distance - kPoint) * 1.8;
        case 'mammoth': return 120 + (distance - kPoint) * 1.2;
    }
};

module.exports = calculateDistancePoints;