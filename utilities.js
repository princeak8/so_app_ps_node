export const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

exports.generateValues = () => {
    const power = randomNumber(95, 300);
    const mvar = randomNumber(0, 45);
    return {power: parseInt(power), mvar: parseInt(mvar)};
}

export const powerData = (vals) => {
    var {volt, current, power, mvar} = vals;
    return {
        mw: power,
        mvar: mvar
    }
};