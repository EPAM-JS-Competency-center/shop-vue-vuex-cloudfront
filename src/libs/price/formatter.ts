const priceFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

const formatAsPrice = (price: number) => priceFormatter.format(price);

export const formatter = {
	number: formatAsPrice,
};
