export default async function turnFirstLetterIntoUpperCase(word) {
    return Array.from(word).map((letter, index) => index === 0 ? letter.toUpperCase() : letter).join('')
}