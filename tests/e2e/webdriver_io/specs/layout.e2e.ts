import { MainPage } from '../pageobjects';

describe('Main layout', () => {
	beforeAll(async () => {
		await MainPage.open();
	});

	describe('Header Layout', () => {
		afterEach(async () => {
			await MainPage.header.click();
		})

		it('should be present header and it\'s elements', async () => {
			await expect(MainPage.header).toBeExisting();
			await expect(MainPage.headerHomeLink).toBeExisting();
			await expect(MainPage.headerAccountMenuBtn).toBeExisting();
			await expect(MainPage.headerCartLink).toBeExisting();
			await expect(MainPage.headerLanguageMenuBtn).toBeExisting();
		});

		describe('Account Menu', () => {
			it('should be opened account menu with correct menu items', async () => {
				await MainPage.headerAccountMenuBtn.click();

				await expect(MainPage.headerAccountMenuList).toBeDisplayedInViewport();
				await expect(MainPage.headerAccountMenuListItems).toBeElementsArrayOfSize(3);
				await expect(MainPage.headerAccountMenuListItems[0]).toHaveHrefContaining('/admin/orders');
				await expect(MainPage.headerAccountMenuListItems[1]).toHaveHrefContaining('/admin/products');
				await expect(MainPage.headerAccountMenuListItems[2]).toHaveHrefContaining('/admin/product-form');
			});

			it('should redirect to orders page', async () => {
				await MainPage.headerAccountMenuBtn.click();
				await (await MainPage.headerAccountMenuListItems)[0].click();

				await expect(browser).toHaveUrlContaining('/admin/orders');
			});

			it('should redirect to manage products page', async () => {
				await MainPage.headerAccountMenuBtn.click();
				await (await MainPage.headerAccountMenuListItems)[1].click();

				await expect(browser).toHaveUrlContaining('/admin/products');
			});

			it('should redirect to create product page', async () => {
				await MainPage.headerAccountMenuBtn.click();
				await (await MainPage.headerAccountMenuListItems)[2].click();

				await expect(browser).toHaveUrlContaining('/admin/product-form');
			});

			it('should redirect back to home page', async () => {
				await MainPage.headerAccountMenuBtn.click();
				await (await MainPage.headerAccountMenuListItems)[2].click();
				await MainPage.headerHomeLink.click();

				await expect(browser).not.toHaveUrlContaining('/admin/product-form');
				await expect(browser).not.toHaveUrlContaining('/admin/orders');
				await expect(browser).not.toHaveUrlContaining('/admin/products');
			});
		});

		describe('Language Menu', () => {
			afterEach(async () => {
				await MainPage.header.click();
			})

			it('should be opened language menu with correct menu items', async () => {
				await MainPage.headerLanguageMenuBtn.click();

				await expect(MainPage.headerLanguageMenuList).toBeDisplayedInViewport();
				await expect(MainPage.headerLanguageMenuListItems).toBeElementsArrayOfSize(3);
				await expect(MainPage.headerLanguageMenuListItems[0]).toHaveText('RU');
				await expect(MainPage.headerLanguageMenuListItems[1]).toHaveText('EN');
				await expect(MainPage.headerLanguageMenuListItems[2]).toHaveText('ZH');
			});
		});

		describe('Cart link', () => {
			it('should present cart link in header', async () => {
				await expect(MainPage.headerCartLink).toBeDisplayedInViewport();
				await expect(MainPage.headerCartLink).toHaveHref('/cart');
			});

			it('should navigate to cart page', async () => {
				await MainPage.headerCartLink.click();

				await expect(browser).toHaveUrlContaining('/cart');
			});
		});
	});

	describe('Footer Layout', () => {
		it('should be displayed footer', async  () => {
			await expect(MainPage.footer).toBeDisplayedInViewport();
		});

		it('should be displayed sub-title in footer', async  () => {
			await expect(MainPage.footerSubTitle).toHaveText('Thank you for your purchase!');
		});

		it('should be displayed copyright in footer', async  () => {
			await expect(MainPage.footerCopyright).toHaveTextContaining('Copyright');
		});
	});
});
