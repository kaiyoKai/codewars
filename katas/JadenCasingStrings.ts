declare global {
  interface String {
    toJadenCase(): string;
  }
}

String.prototype.toJadenCase = function () {
  return this.split(" ")
    .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

console.log("How can mirrors be real if our eyes aren't real".toJadenCase());
