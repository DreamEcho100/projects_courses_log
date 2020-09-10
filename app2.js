/*
const section = document.querySelectorAll("section");

let modelObj = {};
init(modelObj);
let randomTime = randomNum(100, 100);
let maxDeg = 720;
let minDeg = -720;

const range = (function (max, min) {
  if (minDeg < 0) {
    return Math.floor(maxDeg + Math.abs(minDeg)) * 2;
  }
  if (minDeg >= 0) {
    return Math.floor(maxDeg - Math.abs(minDeg)) * 2;
  } 
})(maxDeg, minDeg)

let collectionObj = {
  currentIdx: 0,
  continue1: true,
  continue2Negatively: true,
  collection: []
}

section.forEach((item) => {
  //init(item);
  item.color1 = modelObj.color1;
  item.color2 = modelObj.color2;
  item.color3 = modelObj.color3;
  item.deg = modelObj.deg;
  
  changeBGColor(item, randomTime, collectionObj);
})

function changeBGColor(item, time, objCollector) {
  setInterval(function() {
    if (objCollector.continue1) {
      let valColor1 = action("rgbColor", item.color1, randomNum(1, 0), 0, 256);
      let valColor2 = action("rgbColor", item.color2, randomNum(10, 0), 0, 256);
      let valColor3 = action("rgbColor", item.color3, randomNum(1, 0), 0, 256);
      let valDeg = action("deg", item.deg, randomNum(5, 1), minDeg, maxDeg);
      randomTime = randomNum(25, 50);

      objCollector.collection.push({
        id: objCollector.currentIdx,
        color1: valColor1,
        color2: valColor2,
        color3: valColor3,
        deg: valDeg,
        timeForThis: randomTime
      })
      objCollector.currentIdx += 1;
      if (objCollector.currentIdx >= range) {
        objCollector.continue1 = false;
      }

      let val = `linear-gradient(${valDeg}deg,
            rgb(${valColor1}, ${valColor2}, ${valColor3}),
            rgb(${valColor3}, ${valColor1}, ${valColor2}),
            rgb(${valColor2}, ${valColor3}, ${valColor1}))`;
      item.style.backgroundImage = val;
    } else {
      let currentItem;
      if (objCollector.continue2Negatively) {
        if (objCollector.currentIdx === range) {
          currentItem =  objCollector.collection[range - 1];
          objCollector.currentIdx -= 1;
        } else {
          currentItem =  objCollector.collection[objCollector.currentIdx - 1];
          objCollector.currentIdx -= 1;
          if ((objCollector.currentIdx - 1) < 0) {
            objCollector.continue2Negatively = false;
          }         
        }
      } else {
        if ((objCollector.currentIdx) === 0) {
          currentItem =  objCollector.collection[0];
          objCollector.currentIdx += 1;
        } else {
          currentItem =  objCollector.collection[objCollector.currentIdx + 1];
          objCollector.currentIdx += 1;
          if ((objCollector.currentIdx + 1) === range) {
            objCollector.continue2Negatively = true;
          } 
        }
          
      }

      let val = `linear-gradient(${currentItem.deg}deg,
            rgb(${currentItem.color1}, ${currentItem.color2}, ${currentItem.color3}),
            rgb(${currentItem.color3}, ${currentItem.color1}, ${currentItem.color2}),
            rgb(${currentItem.color2}, ${currentItem.color3}, ${currentItem.color1}))`;
      item.style.backgroundImage = val;
      randomTime = currentItem.timeForThis;
    }

  }, randomTime)

    

  }
*/

let UIController = (function () {
  const variablesString = {
    spinningBackground1: ".spinningBackground1",
  };

  let nodeListForEach = function (list, callback) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    variables: variablesString,
    spinningBackgroundForMulti: function (elemArr, arrayHoldingColors, range) {
      const arr = arrayHoldingColors;
      randomTime = arr[0].timeForThis;
      let desinding = true;
      nodeListForEach(elemArr, function (current, index) {
        let counter = 0;
        setInterval(function () {
          if (desinding) {
            current.style.backgroundImage = arr[counter].backgroundImage;
            counter++;
            if (counter === range - 1) {
              desinding = false;
            } else {
              randomTime[counter];
            }
          } else if (!desinding) {
            current.style.backgroundImage = arr[counter].backgroundImage;
            counter--;
            if (counter === 0) {
              desinding = true;
            } else {
              randomTime[counter];
            }
          }
        }, randomTime);
      });
    },
  };
})();

let calculationsMaker = (function () {
  let setupObj = function (item) {
    let colorsValues = {
      0: {
        num: randomNum(256, 0),
        positiveIncrease: TrueOrFalse(),
      },
      1: {
        num: randomNum(256, 0),
        positiveIncrease: TrueOrFalse(),
      },
      2: {
        num: randomNum(256, 0),
        positiveIncrease: TrueOrFalse(),
      },
    };

    let holder = Object.keys(colorsValues);

    let counter = 0;
    function randomaizeVals() {
      while (holder.length !== 0) {
        let randomIdx = randomNum(holder.length, 0);
        let r = String(holder.splice(randomIdx, 1));

        for (let i = 0; i < 1; i++) {
          item[`color${counter + 1}`] = colorsValues[r];
        }
        counter++;
      }
    }
    randomaizeVals();

    let deg = {
      num: randomNum(360, 0),
      positiveIncrease: TrueOrFalse(),
    };
    item.deg = deg;
    return item;
  };

  let randomNum = function (num, min) {
    if (num <= 1) {
      return Number((Math.random() * num + min).toFixed(2));
    }
    return Math.floor(Math.random() * num) + min;
  };

  let TrueOrFalse = function () {
    return Math.random() >= 0.5 ? true : false;
  };

  const range = function (max, min) {
    if (min < 0) {
      return Math.abs(Math.floor(max + Math.abs(min)) * 2);
    }
    if (min >= 0) {
      return Math.abs(Math.floor(max - Math.abs(min)) * 2);
    }
  };

  let action = function (type, obj, num, min, max) {
    if (type === "deg" || type === "rgbColor") {
      if (obj.positiveIncrease) {
        if (obj.num + num >= max) {
          obj.positiveIncrease = false;
          obj.num = obj.num + num;
          return obj.num;
        } else {
          obj.num = obj.num + num;
        }
      }
      if (!obj.positiveIncrease) {
        if (obj.num - num <= min) {
          obj.positiveIncrease = true;
          obj.num = obj.num - num;
        } else {
          obj.num = obj.num - num;
        }
      }
      return obj.num;
    }
  };

  return {
    buildingColorsAndTimesObj: function (
      randomTime,
      randomTimeMin,
      minDeg,
      maxDeg
    ) {
      let obj = {};
      setupObj(obj);
      let degRange = range(minDeg, maxDeg);
      obj.collectionObj = {
        currentIdx: 0,
        continuePosetively: false,
        continueNegatively: true,
        colorsCollection: [],
      };
      let valColor1, valColor2, valColor3, valDeg;

      while (obj.collectionObj.currentIdx !== degRange) {
        valColor1 = action("rgbColor", obj.color1, randomNum(1, 0), 0, 256);
        valColor2 = action("rgbColor", obj.color2, randomNum(10, 0), 0, 256);
        valColor3 = action("rgbColor", obj.color3, randomNum(1, 0), 0, 256);
        valDeg = action("deg", obj.deg, randomNum(5, 1), 0, maxDeg);
        randomTime = randomNum(randomTime, randomTimeMin);

        obj.collectionObj.colorsCollection.push({
          id: obj.collectionObj.currentIdx,
          color1: valColor1,
          color2: valColor2,
          color3: valColor3,
          backgroundImage: `linear-gradient(${valDeg}deg, rgb(${valColor1}, ${valColor2}, ${valColor3}), rgb(${valColor3}, ${valColor1}, ${valColor2}), rgb(${valColor2}, ${valColor3}, ${valColor1}))`,
          deg: valDeg,
          timeForThis: randomTime,
        });
        obj.collectionObj.currentIdx += 1;
      }
      return {
        colors: obj.collectionObj.colorsCollection,
        range: degRange,
      };
    },
  };
})();

let ContentBuilder = (function () {
  let temp;
  const contentData = [
    {
      type: "no-content-section",
      name: "personalProjects",
      info: "",
      classes: "main-section Site",
      list: [
        {
          type: "normal-content-course",
          name: "1",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "Candy Crush",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },

        // List End
      ],

      // Section End
    },

    {
      type: "normal-content-section",
      name: "Developedbyed",
      info: "",
      classes: "main-section Site",
      list: [
        {
          type: "normal-content-course",
          name: "The Creative Front End Development Bundle",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "Beatmaker",
              info: "Building a Beatmaker.",
              fileName: "index",
              fileExtension: "html",
              difficulty: 2.5,
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Coloors",
              info: "Building a colors library picker.",
              fileName: "index",
              fileExtension: "html",
              difficulty: 2.5,
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Photon",
              info: "Building a Photo search using pexels API.",
              fileName: "index",
              fileExtension: "html",
              difficulty: 2,
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Todo List",
              info:
                "Building a Todo List that have the functionality of saving, removing and filtering items.",
              fileName: "index",
              fileExtension: "html",
              difficulty: 2.25,
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Travel Website",
              info:
                "Building a Travel Website using some cool scrolling animations and page transitions.",
              fileName: "index",
              fileExtension: "html",
              difficulty: 2.75,
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },
        {
          type: "normal-content-course",
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "Travelly | Travelling Agency",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: 2.75,
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },
        {
          type: "no-content-course",
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },

        // List End
      ],

      // Section End
    },

    {
      type: "no-content-section",
      name: "GitHub",
      info: "",
      classes: "main-section Site",
      list: [
        {
          type: "normal-content-course",
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },

        // List End
      ],

      // Section End
    },

    {
      type: "no-content-section",
      name: "Khan Academy",
      info: "",
      classes: "main-section Site",
      list: [
        {
          type: "normal-content-course",
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },

        // List End
      ],

      // Section End
    },

    {
      type: "normal-content-section",
      name: "Udacity",
      info: "",
      classes: "main-section Site",
      list: [
        {
          type: "normal-content-course",
          name: "Web Development Professional Nanodegree Program",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "Landing Page",
              info:
                "Building a Landing Page with a JavaScript generated navigation bar, smooth scrolling to the specified sections on the navigation bar and some animations when scrolling near to every section.",
              fileName: "index",
              fileExtension: "html",
              difficulty: 1,
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "link-content-project",
              name: "",
              info: "",
              link: "",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "no-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },
        {
          type: "no",
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },

        // List End
      ],

      // Section End
    },

    {
      type: "normal-content-section",
      name: "Udemy",
      info: "",
      classes: "main-section Site",
      list: [
        {
          type: "normal-content-course",
          name: "Monster JavaScript Course - 50+ projects and applications",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "Accordion Component",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Alien Invader Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Audio Button Player",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Background Color & Font Color Divs Buttons Changer",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Background Color & Font Color Divs Buttons Changer2",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Background Color Body Buttons Changer",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Building A Flying Bird Game From Scratch",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Calculator Mini Web Application",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Car Driving Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Card War Project",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Catch Element Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Click Popper Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Click Reaction Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Clipboard - Copy And Move Text",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Coin Toss Game Code",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Combination Guessr Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Countdown Timer",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Create Form Validation Using JavaScript",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Creating A Tooltip Popup With JavaScript",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Creating An Image Popup Window On Image Elements",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Current Date(Eastern European Standard Time)",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Document Object Model",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Document Object Model Element Manipulation With JS",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Dom Content Loaded",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Dynamic Editable Shopping List",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "DOM Interaction Application DOMinator",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Dynamic welcome message",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Element Catcher Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Element Mouse And Click Events",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Element Scrolling Content",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Email Extractor Application",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name:
                "Explore JavaScript Cookies While Building Cookie Get Set Tester Web Application",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "From Ten To Zero",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Functionator JavaScript Function practice Code",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Guess The Hidden Word Which Is Scrambled",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "High Low Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Image Carousel Animated Slideshow Application",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Input Field Character Counter",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name:
                "JavaScript Application To Create Files - Google Sheet Data To CSV File",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Just JavaScript Click Counter",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Keyboard Div Mover",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Keyboard Events Tracker",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Magic Eight Ball",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Modal Popup Example",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Number Guessing Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Pattern Matching Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Placeholder Image Path Generator",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Plane Bomber Game Simple JavaScript DOM Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Popup Message",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Random Array Message",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Random Background Color Button Generator",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Rock Paper Scissors Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Simple List",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "deep-list-content-files",
              name: "Some Js Code",
              info: "",
              list: [
                {
                  type: "normal-deep-list-content-files-item",
                  title: "Bubbling & Capturing",
                  info: "",
                  filename: "index",
                  fileExtension: "html",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
                {
                  type: "normal-deep-list-content-files-item",
                  title:
                    "Generating A Random Numbers In A Range That Doesn't Exist In From an Array",
                  info: "",
                  filename: "app",
                  fileExtension: "js",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
                {
                  type: "normal-deep-list-content-files-item",
                  title: "JS Local Strorage",
                  info: "",
                  filename: "index",
                  fileExtension: "html",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
                {
                  type: "normal-deep-list-content-files-item",
                  title: "ProtoType in JS",
                  info: "",
                  filename: "app",
                  fileExtension: "js",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
                {
                  type: "no-deep-list-content-files-item",
                  title: "",
                  info: "",
                  filename: "app",
                  fileExtension: "js",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },

                // Deep Inner List End
              ],
            },
            {
              type: "normal-content-project",
              name: "Some Mouse Events",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Star Rating Project Click And Hover Events",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Tip Calculater",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Try & Catch",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Typing Test Mini Application",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Ultimate Dice Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Word Guessing Hangman Game",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Word Scrumble",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "xHR & Fetch",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "no-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },
        {
          type: "no-content-course",
          name: "React - The Complete Guide (incl Hooks, React Router, Redux)",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },
        {
          type: "normal-content-course",
          name: "The Modern Javascript Bootcamp Course (2020)",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "Coin Chaser",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Practicing Promise, Async& Await",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Practicing Prototypes, Classes, & The New Operator",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Timer",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "no-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },
        {
          type: "no-content-course",
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },

        // List End
      ],

      // Section End
    },

    {
      type: "normal-content-section",
      name: "Youtube",
      info: "",
      classes: "main-section Site",
      list: [
        {
          type: "normal-content-course",
          name: "Ania Kubów JavaScriptGames",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "Candy Crush",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "PACMAN",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "no-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },
        {
          type: "normal-content-course",
          name: "Fireship",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "no-content-project",
              name: "advance-dropdown-menu",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Animated Responsive Navbar With CSS",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: 1.25,
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "no-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },
        {
          type: "normal-content-multi-courses",
          name: "Ghost Tech",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-multi-courses-course",
              name:
                "JavaScript Complete Course 2019- Build Real Projects! __ FOR BEGINNERS",
              list: [
                {
                  type: "normal-content-multi-courses-course-project",
                  name: "",
                  info: "",
                  fileName: "index",
                  fileExtension: "html",
                  difficulty: "",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
                {
                  type: "deep-list-content-multi-courses-course-projects",
                  name: "",
                  info: "",
                  list: [
                    {
                      type:
                        "normal-deep-list-content-multi-courses-course-projects-item",
                      name: "(1)[Using Function&Prototypal Inheritance]",
                      info: "",
                      fileName: "index",
                      fileExtension: "html",
                      difficulty: "",
                      tech: {
                        languages: ["HTML", "CSS", "JavaScript"],
                        libraries: [],
                        frameworks: [],
                        APIs: [],
                      },
                    },
                    {
                      type:
                        "normal-deep-list-content-multi-courses-course-projects-item",
                      name: "(2)[Using Maps&Classes]",
                      info: "",
                      fileName: "index",
                      fileExtension: "html",
                      difficulty: "",
                      tech: {
                        languages: ["HTML", "CSS", "JavaScript"],
                        libraries: [],
                        frameworks: [],
                        APIs: [],
                      },
                    },
                    {
                      type:
                        "no-deep-list-content-multi-courses-course-projects-item",
                      name: "",
                      info: "",
                      fileName: "index",
                      fileExtension: "html",
                      difficulty: "",
                      tech: {
                        languages: ["HTML", "CSS", "JavaScript"],
                        libraries: [],
                        frameworks: [],
                        APIs: [],
                      },
                    },

                    // Deep Inner List End
                  ],
                },
                {
                  type: "normal-content-multi-courses-course-project",
                  name: "Pig Game",
                  info: "",
                  fileName: "index",
                  fileExtension: "html",
                  difficulty: "",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
                {
                  type: "no-content-multi-courses-course-project",
                  name: "",
                  info: "",
                  fileName: "index",
                  fileExtension: "html",
                  difficulty: "",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
              ],
            },
            {
              type: "no-content-multi-courses-course",
              name: "",
              list: [
                {
                  type: "normal-content-multi-courses-course-project",
                  name: "",
                  info: "",
                  fileName: "index",
                  fileExtension: "html",
                  difficulty: "",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
              ],
            },

            // Inner List End
          ],
        },
        {
          type: "normal-content-course",
          name: "Traversy Media",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "Bookmarker Application",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Full screen Image Slider",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "normal-content-project",
              name: "Full Screen Responsive Image Slider",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              type: "no-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },
        {
          type: "no-content-course",
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },

        // List End
      ],

      // Section End
    },

    {
      type: "no-content-section",
      name: "",
      info: "",
      classes: "main-section Site",
      list: [
        {
          type: "normal-content-course",
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              type: "normal-content-project",
              name: "",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: "",
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },

            // Inner List End
          ],
        },

        // List End
      ],

      // Section End
    },

    // End
  ];

  function sectionBuilding() {
    let content = "";

    contentData.forEach(section => {
      if (section.type === "normal-content-section") {
        let tempUrl = section.name;
        content += `
    <section class="${section.classes}">
      <h2>
        ${section.name} 
        <button class="subElemContainngInfo tooltip-section" data-section-content="${section.info || "??"}" data-section-content-show-on-until-click="show">i</button>
        <div class="tooltip-output"></div><ol>
      </h2>
          
        `;

        content += sectionContentBuilder(section.list, tempUrl);

        content += 
        `
    </ol></section>
        `;
      } else if (section.type === "no-content-section") {
        content += `
    <section class="${section.classes}">
        `;

        content +=
        `
    </ol></section>
        `;
      }
    });

    return content;
  }

  function sectionContentBuilder(items, url) {
    let sectionContent = "";
    sectionContent += `
        <ol>
        `;

    items.forEach( item => {//debugger;
      let tempUrl = `${url}/${item.name}`;
      if (item.type === "normal-content-course") {
        sectionContent += `

            <li>
            <section class="${item.classes}">
            <h3>
                ${item.name}
                <button class="subElemContainngInfo tooltip-section" data-section-content="${item.info || "??"}" data-section-content-show-on-until-click="show">i</button>
                <div class="tooltip-output"></div>
            </h3>
        `;

        sectionContent += itemListContentBuilder(item.list, tempUrl);

        sectionContent += `
          </section>
          </li>
        `;
      } else {}
    });

    sectionContent += `
               </ol>
        `;

        return sectionContent;
  }

  function itemListContentBuilder(list, url) {
    let listContent = "";

    listContent += `
                <ol>
    `;

    list.forEach(item => {
      if (item.type === "normal-content-project") {
        let tempUrl = `${url}/${item.name}/${item.fileName}.${item.fileExtension}`;
        listContent += `
                    <li>
                        <a href="${tempUrl}"  target="_blank">
                            ${item.name}
                            <button class="subElemContainngInfo tooltip-section" data-section-content="${item.info || "??"}" data-section-content-show-on-until-click="show">i</button>
                            <div class="tooltip-output"></div>
                        </a>
                    </li>
        `;
        /*
          <li>
              <a href="${url}/${project.projectName}/${project.projectFileType}"  target="_blank">
                ${project.projectName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${project.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                <div class="tooltip-output"></div>
              </a>
              </li>`;
        */
      } else {}
    });

    listContent += `
                </ol>
    `;

    return listContent;
  }

  /*
  function projectsContentHTMLBuilder(projects, url) {
    let deepInnerContent = "";

    projects.forEach((project) => {
      if (project.type === "none") {
        deepInnerContent += `<li>
              <a href="${url}/${project.projectName}/${project.projectFileType}"  target="_blank">
                ${project.projectName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${project.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                <div class="tooltip-output"></div>
              </a>
              </li>`;
      } else if (project.type === "specialCharsChange") {
        url = `${url}/${project.projectName.replace(/[|]/g, "-")}/${
          project.projectFileType
        }`;
        deepInnerContent += `<li>
              <a href="${url}"  target="_blank">
                ${project.projectName}
              </a>
              </li>`;
      } else if (project.type === "innerSubCourse") {
        deepInnerContent += `
            <ol>
              <li>
                <${project.innerCourseProjectsHeadType}>
                  ${project.projectName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${project.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                <div class="tooltip-output"></div>
                </${project.innerCourseProjectsHeadType}>
                <ol>
        `;
        project.innerCourseProjects.forEach((subCourse) => {
          if (subCourse.type === "none" || subCourse.type === undefined) {
            deepInnerContent += `
                  <li>
                    <a
                      href="${url}/${project.projectName}/${subCourse.projectName}/${subCourse.projectFileType}"
                      target="_blank"
                    >
                      ${subCourse.projectName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${subCourse.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                      <div class="tooltip-output"></div>
                    </a>
                  </li>
          `;
          } else if (subCourse.type === "innerSubContent") {
            deepInnerContent += `<li><${project.innerCourseProjectsHeadType}>
              ${subCourse.projectName}   <button class="subElemContainngInfo tooltip-section" data-section-content="${subCourse.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                      <div class="tooltip-output"></div>
            </${project.innerCourseProjectsHeadType}><ol>`;
            subCourse.innerSubContentProjects.forEach((item, idx) => {
              deepInnerContent += `<li>`;
              deepInnerContent += `
                    <a
                      href="${url}/${project.projectName}/${subCourse.projectName}/${item.projectName}/${item.projectFileType}"
                      target="_blank"
                    >
                      ${item.projectName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${item.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                      <div class="tooltip-output"></div>
                    </a>
              `;
              deepInnerContent += `</li>`;
            });
              deepInnerContent += `</ol></li>`;
          }
        });
        deepInnerContent += `
                  <ol>
                  </li>
                </ol>
        `;
      } else if (project.type === "innerSubContent") {
        deepInnerContent += `
        <li><ol>
        <${project.innerSubContentProjectsHeadType}>
          ${project.projectName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${project.projectInfo}" data-section-content-show-on-until-click="show">i</button>
          <div class="tooltip-output"></div>
        </${project.innerSubContentProjectsHeadType}>`;
        project.innerSubContentProjects.forEach((sub) => {
          deepInnerContent += `
                  <li>
                    <a
                      href="${url}/${project.projectName}/${sub.fileName}/${sub.fileType}"
                      target="_blank"
                    >
                      ${sub.fileName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${project.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                      <div class="tooltip-output"></div>
                    </a>
                  </li>
                `;
        });
        deepInnerContent += `</ol></li>`;
      }
    });

    return deepInnerContent;
  }
  */

  function tooltipBuilder() {
    const tooltipSection = document.querySelectorAll(".tooltip-section");
    let currElem,
      currSubElem,
      currOutput,
      show = true;

    function mouseOnOrOf(e) {
      if (e.type === "mousemove" && show) {
        displayBOrN(this, e, "block");
      } else if (e.type === "mouseout" && show) {
        displayBOrN(this, e, "none");
      }
    }

    function displayBOrN(elem, e, type) {
      if (type === "block") {
        let holder = elem.getAttribute("data-section-content");
        currOutput.style.display = "block";
        currOutput.style.top = `${e.clientY + 5}px`;
        currOutput.style.left = `${e.clientX + 5}px`;
        currOutput.innerHTML = holder;
        return;
      }

      currOutput.style.display = "none";
    }

    for (let i = 0; i < tooltipSection.length; i++) {
      currElem = tooltipSection[i];
      currOutput = currElem.parentElement.querySelector(".tooltip-output");
      currElem.addEventListener("mousemove", mouseOnOrOf);
      tooltipSection[i].addEventListener("mouseout", mouseOnOrOf);
      tooltipSection[i].addEventListener(
        "click",
        function (e) {
          e.preventDefault();
          if (show) {
            displayBOrN(this, e, "block");
            show = false;
          } else {
            displayBOrN(this, e, "none");
            show = true;
          }
        },
        false
      );
    }
  }

  return {
    contentData,
    HTMLContent: sectionBuilding,
    tooltipBuilder,
    temp,
  };
})();

let controller = (function (contentBuilder, UICtrl, calcsMaker) {
  let init = function () {
    console.log(contentBuilder.contentData);
    let HTMLContent = contentBuilder.HTMLContent();
    document.body.innerHTML = HTMLContent + "\n" + document.body.innerHTML;
    contentBuilder.tooltipBuilder();

    let variablesString = UICtrl.variables;

    let spinningBackground1 = document.querySelectorAll(
      variablesString.spinningBackground1
    );

    let obj1 = calcsMaker.buildingColorsAndTimesObj(25, 50, -720, 720);
    let colors1 = obj1.colors;
    let range1 = obj1.range;

    UICtrl.spinningBackgroundForMulti(spinningBackground1, colors1, range1);
  };

  return {
    init: init,
    t: contentBuilder.temp,
  };
})(ContentBuilder, UIController, calculationsMaker);

controller.init();
console.log(controller.t);