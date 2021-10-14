export const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

exports.generateValues = () => {
    const volt = randomNumber(280, 360);
    const current = randomNumber(200, 500);
    const power = randomNumber(95, 300);
    const mvar = randomNumber(0, 45);
    return {volt: parseInt(volt), current: parseInt(current), power: parseInt(power), mvar: parseInt(mvar)};
}

export const transmissionData = (vals) => {
    var {volt, current, power, mvar} = vals;
    return {
        mw: power,
        A: current,
        V: volt,
        mvar: mvar
    }
};