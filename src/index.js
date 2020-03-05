function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str) {
    let exp = str
        .replace(/ /g, '')
        .replace(/-/g, '~');

    const parseSum = exp => exp
        .split('+')
        .map(el => parseSubtract(el))
        .reduce((acc, num) => acc + num);

    const parseSubtract = exp => exp
        .split('~')
        .map(el => parseMultiply(el))
        .reduce((acc, num) => acc - num);

    const parseMultiply = exp => exp
        .split('*')
        .map(el => parseDivide(el))
        .reduce((acc, num) => acc * num);

    const parseDivide = exp => exp
        .split('/')
        .map(str => parseFloat(str))
        .reduce((acc, num) => divide(acc, num));

    const divide = (x, y) => {
        if (y === 0) throw TypeError("TypeError: Division by zero.");

        return x / y;
    };

    const findPartsInBrackets = exp => {
        const openBracketIndex = exp.lastIndexOf('(');
        let closeBracketIndex = exp.slice(openBracketIndex).indexOf(')');

        if (openBracketIndex === -1 || closeBracketIndex === -1) {
            throw Error('ExpressionError: Brackets must be paired');
        } else {
            closeBracketIndex += openBracketIndex;

            const currentPart = exp.slice(openBracketIndex + 1, closeBracketIndex);
            const result =
                exp.slice(0, openBracketIndex) +
                parseSum(currentPart) +
                exp.slice(closeBracketIndex + 1);

            return result;
        }
    };

    while (
        exp.indexOf('(') !== -1 ||
        exp.indexOf(')') !== -1
    ) exp = findPartsInBrackets(exp);

    return parseSum(exp);
}

module.exports = {
    expressionCalculator
};
