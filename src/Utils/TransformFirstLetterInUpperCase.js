export default async function transformFirstLetterInUpperCase(word) {
    let arrayOfLetters = await word.split('');
    arrayOfLetters[0] = await arrayOfLetters[0].toUpperCase();
    return await arrayOfLetters.join('').toString();
}