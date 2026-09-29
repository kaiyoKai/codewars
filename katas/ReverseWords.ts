/*
 *
 * Complete the function that accepts a string parameter, and reverses each word in the string. All spaces in the string should be retained.
 * Examples:
 *"This is an example!" ==> "sihT si na !elpmaxe"
 *"double  spaces"      ==> "elbuod  secaps"
 */

export function reverseWordsShitty(str: string): string {
  const parts = str.split(" ");
  let reversedWord: string[] = [];
  for (let j = 0; j < parts.length; j++) {
    let reversed: string[] = [];
    for (let i = 0; i < parts[j].length; i++) {
      reversed[i] = parts[j].at(-i)!;
    }
    reversedWord.push(reversed.join(""));
  }
  return reversedWord.join(" ");
}

export function reverseWords(str: string): string {
  const chars = str.split("");
  let start = 0;

  for (let i = 0; i <= chars.length; i++) {
    if (i === chars.length || chars[i] === " ") {
      let left = start;
      let right = i - 1;

      while (left < right) {
        [chars[left], chars[right]] = [chars[right], chars[left]];

        left++;
        right--;
      }
      start = i + 1;
    }
  }

  return chars.join("");
}
function reverseWordsFunctionalShit(str: string): string {
  return str
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
}

const example1 = "This is an example!";
const example2 = "double  spaces";

console.log(reverseWords(example1));
console.log(reverseWords(example2));
console.log(reverseWordsShitty(example1));
console.log(reverseWordsShitty(example2));
