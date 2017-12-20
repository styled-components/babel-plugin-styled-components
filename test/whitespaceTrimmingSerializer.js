const trailingWhitespaceRegex = /^\s+|\s+$/;

module.exports = {
    print(val, serialize, indent) {
      return serialize(val.replace(trailingWhitespaceRegex, ''));
    },

    test(val) { return trailingWhitespaceRegex.test(val); },
};
