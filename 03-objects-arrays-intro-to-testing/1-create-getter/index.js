/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  return (obj) => {
    const pathArray = path.split('.');
    let value = {...obj};

    for (path of pathArray) {
      if (value[path] === undefined) {
        return;
      }

      value = value[path];
    }

    return value;
  }
}

const getter = createGetter('a.b');
getter({ a: { b: null }})
