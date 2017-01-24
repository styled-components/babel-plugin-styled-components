const parse = css => {
  const findToken = (needle, start, end) => {
    let index = start;

    while (
      css[index] !== needle &&
      index <= end
    ) {
      index++;
    }

    // Throw if there's no matching token
    if (index > end) {
      throw new Error(`Unexpected token! Unable to find matching '${needle}'.`);
    }

    return index;
  };

  const findClosingParanthesis = (start, end) => {
    let level = 1;
    let index;

    for(
      index = start;
      level > 0 && index <= end;
      index++
    ) {
      const token = css[index];

      if (token === '{') {
        level++;
      } else if (token === '}') {
        level--;
      }
    }

    // Throw if there's no matching token
    if (index >= end) {
      throw new Error(`Unexpected token! Unable to find matching '}'.`);
    }

    return index;
  };

  const parseSelector = (start, end) => ({
    type: 'SelectorLiteral',
    loc: [start, end],
    value: css.slice(start, end).trim()
  });

  const parseProperty = (start, end) => {
    const value = css.slice(start, end).trim();

    if (value.includes(';')) {
      throw new Error(`Unexpected token! Properties cannot contain ';'.`);
    } else if (/\s/g.test(value)) {
      throw new Error(`Unexpected token! Properties cannot contain whitespaces.`);
    }

    return {
      type: 'PropertyLiteral',
      loc: [start, end],
      value
    };
  };

  const parseValue = (start, end) => ({
    type: 'ValueLiteral',
    loc: [start, end],
    value: css.slice(start, end).trim()
  });

  // Parses a declaration of the form `property: value;`
  const parseDeclaration = (start, separator, end) => ({
    type: 'Declaration',
    loc: [start, end],
    property: parseProperty(start, separator),
    value: parseValue(separator + 1, end)
  });

  // Parses a rule of the form `selector { body }`
  const parseRule = (start, separator, end) => ({
    type: 'Rule',
    loc: [start, end],
    selector: parseSelector(start, separator - 1),
    block: parseBlock(separator + 1, end - 1)
  });

  const parseBlock = (start, end) => {
    let _start = start;
    let index = start;

    const declarations = [];
    const rules = [];

    while (index <= end) {
      const token = css[index];

      if (token === '{') {
        const _end = findClosingParanthesis(index + 1, end);
        rules.push(parseRule(_start, index, _end));

        index = _start = _end + 1;
      } else if (token === ':') {
        const _end = findToken(';', index, end);
        declarations.push(parseDeclaration(_start, index, _end));

        index = _start = _end + 1;
      } else {
        index++;
      }
    }

    return {
      type: 'Block',
      loc: [start, end],
      declarations,
      rules
    };
  };

  return parseBlock(0, css.length - 1);
};

export default parse;
