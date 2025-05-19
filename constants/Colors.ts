const darkestSlate = '#314158';
const darkerSlate = '#45556C';
const lightDarkSlate = '#8087AF';
const pureWhite = '#FFFFFF';
export const white = '#E2E8F0';
const green = '#357B5D';
const red = '#7B3545';

export default (() => {
	const colors = {
		primaryText: white,
		secondaryText: pureWhite,
		primaryBackground: darkestSlate,
		secondaryBackground: darkerSlate,
		hintBackground: lightDarkSlate,
		whiteBackground: white,
		blackText: darkestSlate,
		success: green,
		danger: red,
	};

	return {
		light: colors,
		dark: colors,
	};
})();
