export default `
const handleMainSpecialColor = () => {
  const body = document.body;
  const forSpecialColor1 = ['theme-light-1', 'theme-light-2', 'theme-light-2'];
  const forSpecialColor2 = ['theme-dark-1', 'theme-dark-2', 'theme-dark-2'];

  if (forSpecialColor1.some((theme) => body.classList.contains(theme))) {
    body.style.setProperty('--main-special-color', 'var(--special-color-1)');
  } else if (forSpecialColor2.some((theme) => body.classList.contains(theme))) {
    body.style.setProperty('--main-special-color', 'var(--special-color-2)');
  }
};

handleMainSpecialColor();
`;
