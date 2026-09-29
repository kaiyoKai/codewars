/*
     * Isograms (7 kyu)
     * https://www.codewars.com/kata/54ba84be607a92aa900000f1
     *
    /*
  * An isogram is a word that has no repeating letters, consecutive or non-consecutive. Implement a function that determines whether a string that contains only letters is an isogram. Assume the empty string is an isogram. Ignore letter case.
  *
  * **Example: (Input --> Output)**
  * ~~~if-not:factor
  * ```
  * "Dermatoglyphics" --> true
  * "aba" --> false
  * "moOse" --> false (ignore letter case)
  * ```
  * ~~~
  *
  * ~~~if:factor
  * ```
  * "Dermatoglyphics" -> t
  * "aba" -> f
  * "moOse" -> f (ignore letter case)
  * ```
  * ~~~
  *
 */
export function isIsogram(str: string): boolean {
  return str.length == new Set(str.toLowerCase()).size;
}

export function isIsogramBitwise(str: string): boolean {
  // Unser Speicher: Eine einzige 32-Bit-Zahl (alle 32 Bits stehen anfangs auf 0)
  let letterMask = 0;

  for (let i = 0; i < str.length; i++) {
    //6. Bit auf 1 stellen damit aus uppercase lowercase wird
    const lowerCharCode = str.charCodeAt(i) | 32;

    // Nur Buchstaben von 'a' (Ascii 97) bis 'z' (122) verarbeiten
    if (lowerCharCode >= 97 && lowerCharCode <= 122) {
      // Berechne den Bit-Shift (a = Bit 0, b = Bit 1, c = Bit 2, etc.)

      const bitPosition = lowerCharCode - 97;

      // Erstelle die Maske für diesen spezifischen Buchstaben
      const currentBit = 1 << bitPosition;

      // Bitwise AND (&): Prüfen, ob das Bit an dieser Stelle schon 1 ist
      if ((letterMask & currentBit) !== 0) {
        return false; // Buchstabe kam schon mal vor -> kein Isogramm!
      }

      // Bitwise OR (|): Setze das Bit an dieser Stelle permanent auf 1
      letterMask |= currentBit;
    }
  }

  return true;
}

console.log(isIsogram("Dermatoglyphics"));
console.log(isIsogramBitwise("Dermatoglyphics"));

const words = [
  "aba",
  "moOse",
  "isogram",
  "Dermatoglyphics",
  "supercalifragilisticexpialidocious",
];
const ITERATIONS = 1_000_000;

console.log(
  `Starte Benchmark mit ${ITERATIONS.toLocaleString()} Durchläufen...\n`,
);

for (const w of words) {
  const t0 = performance.now();
  for (let i = 0; i < ITERATIONS; i++) isIsogram(w);
  const t1 = performance.now();

  for (let i = 0; i < ITERATIONS; i++) isIsogramBitwise(w);
  const t2 = performance.now();

  const setMs = t1 - t0;
  const bitMs = t2 - t1;
  const ratio = (setMs / bitMs).toFixed(1);

  console.log(`"${w}":`);
  console.log(`  Set:     ${setMs.toFixed(2)} ms`);
  console.log(`  Bitwise: ${bitMs.toFixed(2)} ms  (Speedup: ${ratio}x)\n`);
}
