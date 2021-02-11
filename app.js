let UIController = (function () {
	const variablesString = {
		spinningBackground1: '.spinningBackground1',
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
		if (type === 'deg' || type === 'rgbColor') {
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
				valColor1 = action('rgbColor', obj.color1, randomNum(1, 0), 0, 256);
				valColor2 = action('rgbColor', obj.color2, randomNum(10, 0), 0, 256);
				valColor3 = action('rgbColor', obj.color3, randomNum(1, 0), 0, 256);
				valDeg = action('deg', obj.deg, randomNum(5, 1), 0, maxDeg);
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
	const contentTemplate = {
		types: ['no-content-section'],
		name: '',
		info: '',
		classes: 'main-section Site',
		list: [
			{
				types: ['no-content-course'],
				name: '',
				info: '',
				classes: 'spinningBackground1',
				list: [
					{
						types: ['no-content-project'],
						name: '',
						info: '',
						fileName: 'index',
						fileExtension: 'html',
						difficulty: '',
						tech: {
							languages: ['HTML', 'CSS', 'JavaScript'],
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
	};
	const contentData = [];

	contentData.push(DevelopedbyedContent);
	contentData.push(MDNWebDocsContent);
	contentData.push(PersonalProjectsContent);
	contentData.push(UdacityContent);
	contentData.push(UdemyContent);
	contentData.push(YotubeContent);
	contentData.push(contentTemplate);

	function specialCharactersType1(text, swapingCharacters) {
		const specialCharactersToRemove = Object.keys(swapingCharacters);
		const specialCharactersToAdd = Object.values(swapingCharacters);

		let newText = text;

		specialCharactersToRemove.forEach((character, index) => {
			newText = newText.replace(character, specialCharactersToAdd[index]);
		});

		return newText;
	}

	function sectionBuilding() {
		let content = '';

		contentData.forEach((section) => {
			if (section.types.includes('no-content-section')) {
				content += `
    <section class="${section.classes}">
      <h2>
        ${section.name} 
        <button class="subElemContainngInfo tooltip-section" data-section-content="${
					section.info || '???'
				}" data-section-content-show-on-until-click="show"><i class="fa fa-info" aria-hidden="true"></i></button>
        <div class="tooltip-output"></div><ol>
      </h2>
          
        `;

				content += sectionContentBuilder(section.list);

				content += `
    </ol></section>
        `;
			} else if (section.types.includes('normal-content-section')) {
				let tempUrl = section.name;

				content += `
    <section class="${section.classes}">
      <h2>
        ${section.name} 
        <button class="subElemContainngInfo tooltip-section" data-section-content="${
					section.info || section.name
				}" data-section-content-show-on-until-click="show"><i class="fa fa-info" aria-hidden="true"></i></button>
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
		let sectionContent = '';
		sectionContent += `
        <ol>
        `;

		items.forEach((item) => {
			let tempUrl = `${url}/${item.name}`;

			if (item.types.includes('no-content-course')) {
				sectionContent += `

            <li>
            <section class="${item.classes}">
            <h3>
                ${item.name}
                <button class="subElemContainngInfo tooltip-section" data-section-content="${
									item.info || '???'
								}" data-section-content-show-on-until-click="show"><i class="fa fa-info" aria-hidden="true"></i></button>
                <div class="tooltip-output"></div>
            </h3>
        `;

				sectionContent += itemListContentBuilder(item.list);

				sectionContent += `
          </section>
          </li>
        `;
			} else if (item.types.includes('normal-content-course')) {
				sectionContent += `

            <li>
            <section class="${item.classes}">
            <h3>
                ${item.name}
                <button class="subElemContainngInfo tooltip-section" data-section-content="${
									item.info || item.name
								}" data-section-content-show-on-until-click="show"><i class="fa fa-info" aria-hidden="true"></i></button>
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
		let listContent = '';
		listContent += `
                <ol>
    `;

		list.forEach((item) => {
			if (item.types.includes('deep-list-content-files')) {
				let tempUrl = `${url}/${item.name}`;

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
			} else if (item.types.includes('no-content-project')) {
				listContent += `
                    <li>
                      Nothing Yet :/
                    </li>
            `;
			} else if (item.types.includes('normal-content-project')) {
				let tempUrl;
				if (item.types.includes('extra-url-after-name')) {
					if (item.types.includes('special-characters-type-1')) {
						tempUrl = console.log(true);
						`${url}/${specialCharactersType1(
							item.name,
							item.specialCharactersType1
						)}/${item.extraUrlAfterName}/${specialCharactersType1(
							item.fileName,
							item.specialCharactersType1
						)}.${item.fileExtension}`;
					} else {
						tempUrl = `${url}/${item.name}/${item.extraUrlAfterName}/${item.fileName}.${item.fileExtension}`;
					}
				} else {
					if (item.types.includes('special-characters-type-1')) {
						console.log(true);
						tempUrl = `${url}/${specialCharactersType1(
							item.name,
							item.specialCharactersType1
						)}/${specialCharactersType1(
							item.fileName,
							item.specialCharactersType1
						)}.${item.fileExtension}`;
					} else {
						tempUrl = `${url}/${item.name}/${item.fileName}.${item.fileExtension}`;
					}
				}

				listContent += `
                    <li>
                        <a href="${tempUrl}"  target="_blank">
                            ${item.name}
                            <button class="subElemContainngInfo tooltip-section" data-section-content="${
															item.info || item.name
														}" data-section-content-show-on-until-click="show"><i class="fa fa-info" aria-hidden="true"></i></button>
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
		let deepListContent = '';

		items.forEach((item) => {
			let tempUrl = item.types.includes('special-characters-type-1')
				? `${url}/${specialCharactersType1(
						item.title,
						specialCharactersType1
				  )}/${specialCharactersType1(item.filename, specialCharactersType1)}.${
						item.fileExtension
				  }`
				: `${url}/${item.title}/${item.filename}.${item.fileExtension}`;
			if (item.types.includes('normal-deep-list-content-files-item')) {
				deepListContent += `
                        <li>
							<a href="${tempUrl}"  target="_blank">
	                            ${item.title}
	                            <button class="subElemContainngInfo tooltip-section" data-section-content="${
																item.info || item.title
															}" data-section-content-show-on-until-click="show"><i class="fa fa-info" aria-hidden="true"></i></button>
	                            <div class="tooltip-output"></div>
	                        </a>
                        </li>
        `;
			} else if (item.types.includes('no-deep-list-content-files-item')) {
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
		const tooltipSection = document.querySelectorAll('.tooltip-section');
		let currElem,
			currSubElem,
			currOutput,
			show = true;

		function mouseOnOrOf(e) {
			if (e.type === 'mousemove' && show) {
				displayBOrN(this, e, 'block');
			} else if (e.type === 'mouseout' && show) {
				displayBOrN(this, e, 'none');
			}
		}

		function displayBOrN(elem, e, type) {
			if (type === 'block') {
				let holder = elem.getAttribute('data-section-content');
				currOutput.style.display = 'block';
				currOutput.style.top = `${e.clientY + 5}px`;
				currOutput.style.left = `${e.clientX + 5}px`;
				currOutput.innerHTML = holder;
				return;
			}

			currOutput.style.display = 'none';
		}

		for (let i = 0; i < tooltipSection.length; i++) {
			currElem = tooltipSection[i];
			currOutput = currElem.parentElement.querySelector('.tooltip-output');
			currElem.addEventListener('mousemove', mouseOnOrOf);
			tooltipSection[i].addEventListener('mouseout', mouseOnOrOf);
			tooltipSection[i].addEventListener(
				'click',
				function (e) {
					e.preventDefault();
					if (show) {
						displayBOrN(this, e, 'block');
						show = false;
					} else {
						displayBOrN(this, e, 'none');
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
		document.body.innerHTML = HTMLContent + '\n' + document.body.innerHTML;
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
