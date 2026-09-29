/*
 *
 * Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the
 * same value next to each other and preserving the original order of elements.
 * For example:
 *uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
 *uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
 * uniqueInOrder([1,2,2,3,3])       == [1,2,3]
 */

type Iterable = string | (string | number)[];

export function uniqueInOrder(iterable: Iterable): (string | number)[] {
  const uniqueInOrderArr: (string | number)[] = [];
  for (let i: number = 0; i < iterable.length; i++) {
    if (iterable[i] !== iterable[i - 1]) uniqueInOrderArr.push(iterable[i]);
  }
  return uniqueInOrderArr;
}

export function uniqueInOrderFunctional(
  iterable: Iterable,
): (string | number)[] {
  return [...iterable].filter((val, i, arr) => val !== arr[i - 1]);
}

const example1 = uniqueInOrder("AAAABBBCCDAABBB");
const example2 = uniqueInOrder("ABBCcAD");
const example3 = uniqueInOrder([1, 2, 2, 3, 3]);

const example1Functional = uniqueInOrderFunctional("AAAABBBCCDAABBB");
const example2Functional = uniqueInOrderFunctional("ABBCcAD");
const example3Functional = uniqueInOrderFunctional([1, 2, 2, 3, 3]);

console.log(example1);
console.log(example2);
console.log(example3);

console.log(example1Functional);
console.log(example2Functional);
console.log(example3Functional);
