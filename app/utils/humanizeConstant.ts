/**
 * Will take a constant and convert it to a human readable string
 *
 * Example: FOO_BAR => Foo Bar
 * @param {string} constant Constant to convert
 * @returns {string} - Humanized constant
 */
function humanizeConstant(constant: string): string {
  return constant
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

export default humanizeConstant;
