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
  const contentData = [
    {
      types: ["normal-content-section"],
      name: "personalProjects",
      info: "",
      classes: "main-section Site",
      list: [
        {
          types: ["normal-content-course"],
          name: "1",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["normal-content-project"],
              name: "HTML-CSS-JavaScript Demos",
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
              types: ["no-content-project"],
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
      types: ["normal-content-section"],
      name: "Developedbyed",
      info: "",
      classes: "main-section Site",
      list: [
        {
          types: ["normal-content-course"],
          name: "The Creative Front End Development Bundle",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
          types: ["normal-content-course"],
          name: "The Creative HTML5 & CSS3 Course",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["normal-content-project", "special-characters-type-1"],
              specialCharactersType1: {
                "|": "-"
              },
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
              types: ["normal-content-project"],
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
          types: ["no-content-course"],
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["no-content-project"],
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
      types: ["no-content-section"],
      name: "GitHub",
      info: "",
      classes: "main-section Site",
      list: [
        {
          types: ["no-content-course"],
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["no-content-project"],
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
      types: ["no-content-section"],
      name: "Khan Academy",
      info: "",
      classes: "main-section Site",
      list: [
        {
          types: ["no-content-course"],
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["no-content-project"],
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
      types: ["normal-content-section"],
      name: "Udacity",
      info: "",
      classes: "main-section Site",
      list: [
        {
          types: ["normal-content-course"],
          name: "Web Development Professional Nanodegree Program",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["normal-content-project"],
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
              types: ["link-content-project"],
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
              types: ["no-content-project"],
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
          types: ["no"],
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["normal-content-project"],
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
      types: ["normal-content-section"],
      name: "Udemy",
      info: "",
      classes: "main-section Site",
      list: [
        {
          types: ["normal-content-course"],
          name: "Monster JavaScript Course - 50+ projects and applications",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["deep-list-content-files"],
              name: "Some Js Code",
              info: "",
              list: [
                {
                  types: ["normal-deep-list-content-files-item"],
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
                  types: ["normal-deep-list-content-files-item"],
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
                  types: ["normal-deep-list-content-files-item"],
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
                  types: ["normal-deep-list-content-files-item"],
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
                  types: ["no-deep-list-content-files-item"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["no-content-project"],
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
          types: ["no-content-course"],
          name: "React - The Complete Guide (incl Hooks, React Router, Redux)",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["no-content-project"],
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
          types: ["normal-content-course"],
          name: "The Modern Javascript Bootcamp Course (2020)",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
              name: "Maze",
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
              types: ["normal-content-project"],
              name: "Movies Fight",
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
              name: "Secret Message Sharing App",
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
              types: ["normal-content-project"],
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
              types: ["no-content-project"],
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
          types: ["no-content-course"],
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["no-content-project"],
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

    {//Chris Courses\canvas-game-1
      types: ["normal-content-section"],
      name: "Youtube",
      info: "",
      classes: "main-section Site",
      list: [
        {
          types: ["normal-content-course"],
          name: "Ania Kubów JavaScriptGames",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["normal-content-project"],
              name: "Candy Crush",
              info: "Doodle Jump",
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
              types: ["normal-content-project"],
              name: "Doodle Jump",
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
              types: ["normal-content-project"],
              name: "NOKIA 3310 SNAKE",
              info:
                "A vanilla JavaScript grid-based game | In this tutorial you will learn how to make a fully functional game of Nokia 3310 Snake.\n" +
                "This is a total BEGINNERS introduction to JavaScript, in which you will cover the following:\n" +
                "- project set up\n" +
                "- linking your JavaScript and CSS files to your HTML file\n" +
                "- event listeners\n" +
                "- query Selectors\n" +
                "- arrow functions\n" +
                "- forEach\n" +
                "- setting time intervals and countdowns",
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
              name: "Tic-Tac-Toe",
              info:
                "This is a a tic-tac-toe walkthrough for those who have never, I mean NEVER touched code before in their life. I decided to do so as I realise my videos are for those who already have an understanding of JavaScript, and would like to practice and get better by making games, or learning different approaches to solving problems. I am going to go super slow on this one and try to explain as much as I can. Obviously, I’m sure there will be things I miss out, so if you want to ask me anything please comment below and I will get back to you. Remember this video is for you to learn and have an awesome game to show for it by the end.",
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
              types: ["no-content-project"],
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
          types: ["normal-content-course"],
          name: "Chris Courses",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["normal-content-project"],
              name: "canvas-game-1",
              info: "",
              fileName: "index",
              fileExtension: "html",
              difficulty: 4,
              tech: {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
            },
            {
              types: ["no-content-project"],
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
          types: ["normal-content-course"],
          name: "Fireship",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["no-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["no-content-project"],
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
          types: ["normal-content-multi-courses"],
          name: "Ghost Tech",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["normal-content-multi-courses-course"],
              name:
                "JavaScript Complete Course 2019- Build Real Projects! __ FOR BEGINNERS",
              list: [
                {
                  types: ["normal-content-multi-courses-course-project"],
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
                  types: ["deep-list-content-multi-courses-course-projects"],
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
                  types: ["normal-content-multi-courses-course-project"],
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
                  types: ["no-content-multi-courses-course-project"],
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
              types: ["no-content-multi-courses-course"],
              name: "",
              list: [
                {
                  types: ["normal-content-multi-courses-course-project"],
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
          types: ["normal-content-course"],
          name: "Traversy Media",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["normal-content-project"],
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
              types: ["no-content-project"],
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
          types: ["no-content-course"],
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["no-content-project"],
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
      types: ["no-content-section"],
      name: "",
      info: "",
      classes: "main-section Site",
      list: [
        {
          types: ["no-content-course"],
          name: "",
          info: "",
          classes: "spinningBackground1",
          list: [
            {
              types: ["no-content-project"],
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

  function specialCharactersType1(text, swapingCharacters) {
    const specialCharactersToRemove = Object.keys(swapingCharacters);
    const specialCharactersToAdd = Object.values(swapingCharacters);
  
    let newText = text;
  
    specialCharactersToRemove.forEach((character, index) => {
      console.log(newText.replace(character, specialCharactersToAdd[index]));
      newText = newText.replace(character, specialCharactersToAdd[index]);
    });
  
    return newText;
  }  

  function sectionBuilding() {
    let content = "";

    contentData.forEach((section) => {
      if (section.types.includes("no-content-section")) {
        content += `
    <section class="${section.classes}">
      <h2>
        ${section.name} 
        <button class="subElemContainngInfo tooltip-section" data-section-content="${
          section.info || "??"
        }" data-section-content-show-on-until-click="show">i</button>
        <div class="tooltip-output"></div><ol>
      </h2>
          
        `;

        content += sectionContentBuilder(section.list);

        content += `
    </ol></section>
        `;
      } else if (section.types.includes("normal-content-section")) {
        let tempUrl = section.name;
        content += `
    <section class="${section.classes}">
      <h2>
        ${section.name} 
        <button class="subElemContainngInfo tooltip-section" data-section-content="${
          section.info || "??"
        }" data-section-content-show-on-until-click="show">i</button>
        <div class="tooltip-output"></div><ol>
      </h2>
          
        `;

        content += sectionContentBuilder(section.list, tempUrl);

        content += `
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

    items.forEach((item) => {
      let tempUrl = `${url}/${item.name}`;

      if (item.types.includes("no-content-course")) {
        sectionContent += `

            <li>
            <section class="${item.classes}">
            <h3>
                ${item.name}
                <button class="subElemContainngInfo tooltip-section" data-section-content="${
                  item.info || "??"
                }" data-section-content-show-on-until-click="show">i</button>
                <div class="tooltip-output"></div>
            </h3>
        `;

        sectionContent += itemListContentBuilder(item.list);

        sectionContent += `
          </section>
          </li>
        `;
      } else if (item.types.includes("normal-content-course")) {
        sectionContent += `

            <li>
            <section class="${item.classes}">
            <h3>
                ${item.name}
                <button class="subElemContainngInfo tooltip-section" data-section-content="${
                  item.info || "??"
                }" data-section-content-show-on-until-click="show">i</button>
                <div class="tooltip-output"></div>
            </h3>
        `;

        sectionContent += itemListContentBuilder(item.list, tempUrl);

        sectionContent += `
          </section>
          </li>
        `;
      }
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

    list.forEach((item) => {
      
      if (item.types.includes("deep-list-content-files")) {
        let tempUrl = `${url}/${item.name}`;
/*        let tempUrl = item.types.includes("special-characters-type-1") ?
          `${url}/${specialCharactersType1(item.name, item.specialCharactersType1)}/${item.fileName}.${item.fileExtension}` :
          `${url}/${item.name}/${item.fileName}.${item.fileExtension}`;*/
        listContent += `
                    <li>
                      <h3>${item.name}</h3>
                      <ol>
        `;
        
        listContent += deepListContentFilesItemsHandler(item.list, tempUrl);

        listContent += `
                      </ol>
                    </li>
        `;
      } else if (item.types.includes("no-content-project")) {
        listContent += `
                    <li>
                      Nothing Yet :/
                    </li>
            `;
      } else if (item.types.includes("normal-content-project")) {
        let tempUrl = item.types.includes("special-characters-type-1") ?
          `${url}/${specialCharactersType1(item.name, item.specialCharactersType1)}/${specialCharactersType1(item.fileName, item.specialCharactersType1)}.${item.fileExtension}` :
          `${url}/${item.name}/${item.fileName}.${item.fileExtension}`;
        listContent += `
                    <li>
                        <a href="${tempUrl}"  target="_blank">
                            ${item.name}
                            <button class="subElemContainngInfo tooltip-section" data-section-content="${
                              item.info || "??"
                            }" data-section-content-show-on-until-click="show">i</button>
                            <div class="tooltip-output"></div>
                        </a>
                    </li>
        `;
      }
    });

    listContent += `
                </ol>
    `;

    return listContent;
  }

  function deepListContentFilesItemsHandler(items, url) {
    let deepListContent = "";

    items.forEach((item) => {
      let tempUrl = item.types.includes("special-characters-type-1") ?
        `${url}/${specialCharactersType1(item.title, specialCharactersType1)}/${specialCharactersType1(item.filename, specialCharactersType1)}.${item.fileExtension}` :
        `${url}/${item.title}/${item.filename}.${item.fileExtension}`;
      if (item.types.includes("normal-deep-list-content-files-item")) {
        deepListContent += `
                        <li>
							<a href="${tempUrl}"  target="_blank">
	                            ${item.title}
	                            <button class="subElemContainngInfo tooltip-section" data-section-content="${
                                item.info || "??"
                              }" data-section-content-show-on-until-click="show">i</button>
	                            <div class="tooltip-output"></div>
	                        </a>
                        </li>
        `;
      } else if (item.types.includes("no-deep-list-content-files-item")) {
        deepListContent += `
                        <li>
                          Nothing Yet :/
                        </li>
        `;
      }
    });
    return deepListContent;
  }

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
  };
})();

let controller = (function (contentBuilder, UICtrl, calcsMaker) {
  let init = function () {
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
  };
})(ContentBuilder, UIController, calculationsMaker);

controller.init();
