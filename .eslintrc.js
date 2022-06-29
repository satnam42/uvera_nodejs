module.exports = {
    extends: 'standard',
    rules: {
        indent: 'off',
        'new-cap': [0]
    },
    globals: {
        db: false,
        mongoose: false,
        response: false,
        offline: false
    }
};
