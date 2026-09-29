/*
     * Convert string to camel case (6 kyu)
     * https://www.codewars.com/kata/517abf86da9663f1d2000003
     *
    /*
  * Complete the method/function so that it converts dash/underscore delimited words into [camel casing](https://en.wikipedia.org/wiki/Camel_case). The first word within the output should be capitalized **only** if the original word was capitalized (known as Upper Camel Case, also often referred to as Pascal case). The next words should be always capitalized.
  *
  * ### Examples
  *
  * `"the-stealth-warrior"` gets converted to `"theStealthWarrior"`
  *
  * `"The_Stealth_Warrior"` gets converted to `"TheStealthWarrior"`
  *
  * `"The_Stealth-Warrior"` gets converted to `"TheStealthWarrior"`
  *
 */

function toCamelCaseTask(str: string): string {
  if (!str) return "";
  return str
    .split(/[-_]/)
    .map((part, i) => {
      if (i === 0) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}

console.log(toCamelCaseTask("the-stealth-warrior")); // "theStealthWarrior"
console.log(toCamelCaseTask("The_Stealth-Warrior")); // "TheStealthWarrior"
console.log(toCamelCaseTask("The_Stealth_Warrior")); // "TheStealthWarrior"

export function toPascalCase(str: string, delimeter: string): string {
  if (!str) return "";
  return str
    .split(delimeter)
    .map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}
