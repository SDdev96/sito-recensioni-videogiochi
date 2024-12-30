//for arrays into JSON objects
// const arrayToString = (array, key) =>
//   array.map((item) => item[key]).join(", ");

// extended previous function for innested JSON structures (ex. object into array into object)
export const arrayToString = (array, key) => {
  return array
    .map((item) => {
      const keys = key.split("."); // Splitta la chiave in base al punto per percorrere la struttura annidata
      return keys.reduce((acc, curr) => (acc ? acc[curr] : null), item); // Accede ai livelli annidati
    })
    .join(", ");
};
