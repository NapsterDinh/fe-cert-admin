export const floorToBiggerNumber = (number, divisor) => {
    return Array.from(Array(Math.floor(number/divisor) + (number % divisor > 0 ? 1 : 0)))
}