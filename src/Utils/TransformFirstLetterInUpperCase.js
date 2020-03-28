export default async function transformFirstLetterInUpperCase(word) {
  let arrayOfLetters = await word.split("");

  for (let i = 0; i < arrayOfLetters.length; i++) {
    if (i === 0) arrayOfLetters[i] = await arrayOfLetters[i].toUpperCase();
    else arrayOfLetters[i] = await arrayOfLetters[i].toLowerCase();
  }
  return await arrayOfLetters.join("").toString();
}