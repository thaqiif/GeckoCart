/**
 * Converts a hex color to RGBA format with specified opacity
 * @param hex - Hex color code (3 or 6 digits with optional #)
 * @param alpha - Opacity value between 0 and 1
 * @returns RGBA color string
 * @throws Error if the hex format is invalid
 */
export function hexToRGBA(hex: string, alpha: number = 1): string {
	// Validate hex format with regex
	const hexRegex = /^#?([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

	if (!hexRegex.test(hex)) {
		throw new Error('Invalid hex color format. Must be 3 or 6 hex digits with optional #');
	}

	// Clamp alpha between 0 and 1
	const safeAlpha = Math.max(0, Math.min(1, alpha));

	// Remove the hash if it exists
	hex = hex.replace('#', '');

	// Parse the hex values
	let r: number, g: number, b: number;

	if (hex.length === 3) {
		// For shorthand hex (#RGB)
		r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
		g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
		b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
	} else {
		// For standard hex (#RRGGBB)
		r = parseInt(hex.substring(0, 2), 16);
		g = parseInt(hex.substring(2, 4), 16);
		b = parseInt(hex.substring(4, 6), 16);
	}

	// Return the rgba string
	return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
}

/**
 * Converts a number to a formatted currency string with commas and dollar sign
 * @param value - The number to format
 * @returns Formatted currency string (e.g., "$84,246.54")
 */
export function formatToCurrency(value: number): string {
	// Use Intl.NumberFormat to handle the formatting with commas
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formatter.format(value);
}

export const formatNumber = (value: number | string) => {
	const number = Number(value);
	if (isNaN(number)) return '-';
	return number.toLocaleString('en-US', {
		maximumFractionDigits: 2,
	});
};

export const isValidQuantity = (value: string) => {
	const regex = /^(?!0\d)\d*\.?\d{0,5}$/; // up to 5 decimal places, no leading zeros unless it's "0."
	return regex.test(value) && parseFloat(value) > 0;
};
