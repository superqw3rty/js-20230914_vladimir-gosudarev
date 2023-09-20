/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  if (!arr || !arr.length) {
    return null
  }

  return param === 'asc' ? [...arr].sort((a, b) => sortFunction(a, b)) : [...arr].sort((a, b) => sortFunction(b, a));
}

function sortFunction(word1, word2) {
  return word1.localeCompare(word2, 'ru', {caseFirst: 'upper'})
}
