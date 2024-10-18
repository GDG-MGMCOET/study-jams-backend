const asyncMap = async (array, callback) => {
  const results = [];
  for (let index = 0; index < array.length; index++) {
    const result = await callback(array[index], index, array);
    results.push(result);
  }
  return results;
};

module.exports = { asyncMap };
