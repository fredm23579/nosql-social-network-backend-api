const dateFormat = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
};

module.exports = dateFormat;
