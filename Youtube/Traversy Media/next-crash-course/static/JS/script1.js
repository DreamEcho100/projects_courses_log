export default `
const body = document.body;
const forSpecialColor1 = [
	{
		theme: 'theme-light-1',
		colors: {
      bgColor1: '--theme-light-1-bg-color-1',
      fontColor1: '--theme-light-1-font-color-1',
			specialColor1: '--theme-light-1-special-color-1',
			specialColor2: '--theme-light-1-special-color-2',
		},
	},
	{
		theme: 'theme-light-2',
		colors: {
      bgColor1: '--theme-light-2-bg-color-1',
      fontColor1: '--theme-light-2-font-color-1',
			specialColor1: '--theme-light-2-special-color-1',
			specialColor2: '--theme-light-2-special-color-2',
		},
	},
	{
		theme: 'theme-light-3',
		colors: {
      bgColor1: '--theme-light-3-bg-color-1',
      fontColor1: '--theme-light-3-font-color-1',
			specialColor1: '--theme-light-3-special-color-1',
			specialColor2: '--theme-light-3-special-color-2',
		},
	},
];
const forSpecialColor2 = [
	{
		theme: 'theme-dark-1',
		colors: {
      bgColor1: '--theme-dark-1-bg-color-1',
      fontColor1: '--theme-dark-1-font-color-1',
			specialColor1: '--theme-dark-1-special-color-1',
			specialColor2: '--theme-dark-1-special-color-2',
		},
	},
	{
		theme: 'theme-dark-2',
		colors: {
      bgColor1: '--theme-dark-2-bg-color-1',
      fontColor1: '--theme-dark-2-font-color-1',
			specialColor1: '--theme-dark-2-special-color-1',
			specialColor2: '--theme-dark-2-special-color-2',
		},
	},
	{
		theme: 'theme-dark-3',
		colors: {
      bgColor1: '--theme-dark-3-bg-color-1',
      fontColor1: '--theme-dark-3-font-color-1',
			specialColor1: '--theme-dark-3-special-color-1',
			specialColor2: '--theme-dark-3-special-color-2',
		},
	},
];
const currentThemes = [...forSpecialColor1, ...forSpecialColor2];
let currentThemeIndex;
let currentTheme =
	JSON.parse(localStorage.getItem('WebDevNewsCurrentTheme')) &&
	JSON.parse(localStorage.getItem('WebDevNewsCurrentTheme')).theme
		? JSON.parse(localStorage.getItem('WebDevNewsCurrentTheme')).theme
		: currentThemes.filter((obj, index) => {

			if (body.classList.contains(obj.theme)) {
				currentThemeIndex = index;
				return true;
			}
		});

if(!currentThemeIndex) {
	currentThemeIndex = currentThemes.findIndex((obj) => {
		if (currentTheme){
			return obj.theme === currentTheme;
		} else if (body.classList.contains(obj.theme)) {
			currentTheme = obj.theme;
			return true;
		}
	});;
}

const setMainThemeAndMainSpecialColor = () => {
  body.classList.add(currentThemes[currentThemeIndex].theme);
  
  /*body.style.setProperty(
    '--main-bg-color',
    \`var(\${currentThemes[currentThemeIndex].colors.bgColor1})\`
  );
  body.style.setProperty(
    '--main-font-color',
    \`var(\${currentThemes[currentThemeIndex].colors.fontColor1})\`
  );
  body.style.setProperty(
    '--main-special-color-1',
    \`var(\${currentThemes[currentThemeIndex].colors.specialColor1})\`
  );
	body.style.setProperty(
		'--main-special-color-2',
		\`var(\${currentThemes[currentThemeIndex].colors.specialColor2})\`
	);*/

  localStorage.setItem('WebDevNewsCurrentTheme', JSON.stringify(currentThemes[currentThemeIndex]))
};

setMainThemeAndMainSpecialColor();
`;
