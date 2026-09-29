export class Challenge {
  static solution(num: number) {
    if (num <= 0) return 0;

    let sum = 0;
    for (let i = 0; i < num; i++) {
      if (i % 3 == 0 || i % 5 == 0) {
        sum += i;
      }
    }
    return sum;
  }
  static functionalSolution(num: number) {
    if (num <= 0) return 0;

    return Array.from({ length: num }, (_, i) => i).reduce(
      (acc, curr) => (curr % 3 === 0 || curr % 5 === 0 ? acc + curr : acc),
      0,
    );
  }
  static generatorSolution(num: number): number {
    if (num <= 0) return 0;

    let summe = 0;

    const generator = (function* () {
      if (num <= 0) return 0;

      for (let i = 0; i < num; i++) {
        if (i % 3 === 0 || i % 5 === 0) yield i;
      }
    })();

    for (const zahl of generator) {
      summe += zahl;
    }
    return summe;
  }

  //Math Solution nutzt die Gaußsche summen formel und ist LLM generiert
  static mathSolution(num: number): number {
    if (num <= 0) return 0;

    const sumDivisibleBy = (n: number) => {
      const p = Math.floor((num - 1) / n);
      return (n * (p * (p + 1))) / 2;
    };

    return sumDivisibleBy(3) + sumDivisibleBy(5) - sumDivisibleBy(15);
  }
}

let arr: number[] = [];
arr = [...arr, 2];

console.log("PerfomantSolution", Challenge.solution(23));
console.log("FunctionalShittySolution", Challenge.functionalSolution(23));
console.log("generatorSolutionShitty", Challenge.generatorSolution(23));
console.log("mathematicalSolution", Challenge.mathSolution(23));
