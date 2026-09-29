/*
 * Digital root is the recursive sum of all the digits in a number.
 *Given n, take the sum of the digits of n.
 *If that value has more than one digit, continue reducing
 *in this way until a single-digit number is produced. *
 *The input will be a non-negative integer.
 * Examples
 *16  -->  1 + 6 = 7
 *942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
 *132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
 *493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2
 */

export const digitalRootShitty = (n: number): number => {
  if (n / 10 < 1) {
    return n;
  }

  let result = 0;
  while (n > 0) {
    n = n / 10;

    let wholeNumberN = n | 0;
    let afterDecimalPoint = +(n - wholeNumberN).toFixed(1);
    result += afterDecimalPoint * 10;
    n = wholeNumberN;
  }
  return digitalRootShitty(result);
};

console.log("Shitty:", digitalRootShitty(12));

export const digitalRoot = (n: number): number => {
  if (n / 10 < 1) {
    return n;
  }

  let result = 0;
  while (n > 0) {
    let digit = n % 10;
    n = Math.floor(n / 10);
    result += digit;
  }
  return digitalRoot(result);
};
console.log("Better:", digitalRoot(12));

//Soltution from the codewars website by another user
export function digitalRootPerfect(n: number): number {
  return ((n - 1) % 9) + 1;
}

console.log("Perfect:", digitalRootPerfect(12));
