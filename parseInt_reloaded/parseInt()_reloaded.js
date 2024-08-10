const dictionary = {
  singleDigits: {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  },

  teens: {
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
  },

  tens: {
    ten: 10,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  },

  largeUnits: {
    hundred: 100,
    thousand: 1000,
    million: 1000000,
  },
};

function parseTensWithSingle(string) {
  const delimeter = "-";
  const numberItems = string.split(delimeter);
  return numberItems.reduce((acc, currentStringNum, idx, self) => {
    const tens = dictionary.tens[currentStringNum];
    const single = dictionary.singleDigits[currentStringNum];

    acc += tens ?? single ?? 0;
    return acc;
  }, 0);
}

function parseInt(string) {
  let currentNumber = 0;
  let result = 0;

  const delimeterMain = " ";
  const delimeterToIgnore = "and";

  const numberItems = string.split(delimeterMain);
  numberItems.forEach((stringNum) => {
    if (stringNum === delimeterToIgnore) {
      return;
    }

    const singleNumber = dictionary.singleDigits[stringNum];
    const teensNumber = dictionary.teens[stringNum];
    const tens = dictionary.tens[stringNum];

    const isTensWithSingle = stringNum.includes("-");
    const tensWithSingle = isTensWithSingle
      ? parseTensWithSingle(stringNum)
      : undefined;

    const largeUnit = dictionary.largeUnits[stringNum];

    if (singleNumber ?? teensNumber ?? tens ?? tensWithSingle) {
      currentNumber +=
        singleNumber ?? teensNumber ?? tens ?? tensWithSingle ?? 0;
      return;
    }

    if (largeUnit === 100) {
      currentNumber *= largeUnit;
      return;
    }

    if (largeUnit) {
      result += currentNumber * largeUnit;
      currentNumber = 0;
      return;
    }
  });

  result += currentNumber;
  return result;
}
