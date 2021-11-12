import { ManageProducts } from '../pageobjects';
import { WdioElement } from '../types/models';

interface SortedProductText {
	initial: string;
	ascending: string;
	descending: string;
}

describe('Manage Products page', () => {
	let firstTableRow: WdioElement;

	const checkTableHeaderSorting = async (titleColumnHeader: WdioElement, productTexts: SortedProductText) => {
		const titleSortBtn = await ManageProducts.getTableColumnHeaderSortBtn(titleColumnHeader);
		const headerTitle = await titleColumnHeader.getText();
		const { initial, ascending, descending } = productTexts;

		await expect(titleColumnHeader).toHaveAttr('aria-sort', 'none');
		await expect(titleColumnHeader).toHaveAttr('aria-label', `${ headerTitle }: Not sorted. Activate to sort ascending.`)
		await expect(firstTableRow).toHaveText(initial);

		await titleSortBtn.click();

		await expect(titleColumnHeader).toHaveAttr('aria-sort', 'ascending');
		await expect(titleColumnHeader).toHaveAttr('aria-label', `${ headerTitle }: Sorted ascending. Activate to sort descending.`);
		await expect(firstTableRow).toHaveText(ascending);

		await titleSortBtn.click();

		await expect(titleColumnHeader).toHaveAttr('aria-sort', 'descending');
		await expect(titleColumnHeader).toHaveAttr('aria-label', `${ headerTitle }: Sorted descending. Activate to remove sorting.`);
		await expect(firstTableRow).toHaveText(descending);

		await titleSortBtn.click();

		await expect(titleColumnHeader).toHaveAttr('aria-sort', 'none');
		await expect(titleColumnHeader).toHaveAttr('aria-label', `${ headerTitle }: Not sorted. Activate to sort ascending.`)
		await expect(firstTableRow).toHaveText(initial);
	}

	beforeAll(async () => {
		await ManageProducts.open();

		// @ts-ignore
		firstTableRow = ManageProducts.manageProductsTableRows[0];
	});

	it('should contain import Products from file section', async () => {
		await expect(ManageProducts.manageProductsImportHeader).toHaveText('Import Product CSV');
		await expect(ManageProducts.manageProductsImportForm).toBeDisplayedInViewport();
		await expect(ManageProducts.manageProductsImportForm).toHaveText('Attach csv file, click here');
		await expect(ManageProducts.manageProductsImportFormInput).toHaveAttr('type', 'file');
		await expect(ManageProducts.manageProductsImportFormInput).toHaveAttr('accept', '.cvs');
		await expect(ManageProducts.manageProductsImportFormInput).toHaveText('');
	});

	it('should be displayed table with 5 columns', async () => {
		await expect(ManageProducts.manageProductsTable).toBeDisplayedInViewport();
		await expect(ManageProducts.manageProductsTableColumnHeaders).toBeElementsArrayOfSize(5);
		await expect(ManageProducts.manageProductsTableColumnHeaders[0]).toHaveText('Title');
		await expect(ManageProducts.manageProductsTableColumnHeaders[1]).toHaveText('Description');
		await expect(ManageProducts.manageProductsTableColumnHeaders[2]).toHaveText('Price');
		await expect(ManageProducts.manageProductsTableColumnHeaders[3]).toHaveText('Count');
		await expect(ManageProducts.manageProductsTableColumnHeaders[4]).toHaveText('Action');
	});

	it('should be listed 8 products row in table', async () => {
		await expect(ManageProducts.manageProductsTableRows).toBeElementsArrayOfSize(8);
		await expect(ManageProducts.getTableRowTitleCell(firstTableRow)).toHaveText('[MOCK] ProductOne');
		await expect(ManageProducts.getTableRowDescriptionCell(firstTableRow)).toHaveText('[MOCK] Short Product Description1');
		await expect(ManageProducts.getTableRowPriceCell(firstTableRow)).toHaveText('2.4');
		await expect(ManageProducts.getTableRowCountCell(firstTableRow)).toHaveText('4');
		await expect(ManageProducts.getTableRowActionCellManageBtn(firstTableRow)).toHaveText('MANAGE');
	});

	it('should be redirected to edit product form when click on MANAGE row button', async () => {
		await ManageProducts.getTableRowActionCellManageBtn(firstTableRow).click();

		await expect(browser).toHaveUrlContaining('/admin/product-form/');
		await ManageProducts.open();
	});

	describe('Table Sorting', () => {
		it('should be sorted rows by title', async () => {
			// @ts-ignore
			const titleColumnHeader = ManageProducts.manageProductsTableColumnHeaders[0] as WdioElement;
			const productTexts: SortedProductText = {
				initial: '[MOCK] ProductOne [MOCK] Short Product Description1 2.4\n4\nMANAGE\nDELETE',
				ascending: '[MOCK] Product [MOCK] Short Product Description2 23\n7\nMANAGE\nDELETE',
				descending: '[MOCK] ProductTop [MOCK] Short Product Description2 23\n7\nMANAGE\nDELETE'
			};

			await checkTableHeaderSorting(titleColumnHeader, productTexts);
		});

		it('should be sorted rows by description', async () => {
			// @ts-ignore
			const descriptionColumnHeader = ManageProducts.manageProductsTableColumnHeaders[1] as WdioElement;
			const productTexts: SortedProductText = {
				initial: '[MOCK] ProductOne [MOCK] Short Product Description1 2.4\n4\nMANAGE\nDELETE',
				ascending: '[MOCK] Product2 [MOCK] Short Product Descriptio1 23\n2\nMANAGE\nDELETE',
				descending: '[MOCK] ProductNew Short Product Description3 10\n6\nMANAGE\nDELETE'
			};

			await checkTableHeaderSorting(descriptionColumnHeader, productTexts);
		});

		it('should be sorted rows by price', async () => {
			// @ts-ignore
			const priceColumnHeader = ManageProducts.manageProductsTableColumnHeaders[2] as WdioElement;
			const productTexts: SortedProductText = {
				initial: '[MOCK] ProductOne [MOCK] Short Product Description1 2.4\n4\nMANAGE\nDELETE',
				ascending: '[MOCK] ProductOne [MOCK] Short Product Description1 2.4\n4\nMANAGE\nDELETE',
				descending: '[MOCK] ProductTop [MOCK] Short Product Description2 23\n7\nMANAGE\nDELETE'
			};

			await checkTableHeaderSorting(priceColumnHeader, productTexts);
		});

		it('should be sorted rows by count', async () => {
			// @ts-ignore
			const countColumnHeader = ManageProducts.manageProductsTableColumnHeaders[3] as WdioElement;
			const productTexts: SortedProductText = {
				initial: '[MOCK] ProductOne [MOCK] Short Product Description1 2.4\n4\nMANAGE\nDELETE',
				ascending: '[MOCK] Product2 [MOCK] Short Product Descriptio1 23\n2\nMANAGE\nDELETE',
				descending: '[MOCK] ProductTitle [MOCK] Short Product Description7 15\n12\nMANAGE\nDELETE'
			};

			await checkTableHeaderSorting(countColumnHeader, productTexts);
		});
	});

	describe('Table Pagination', () => {
		beforeAll(async () => {
			await ManageProducts.closeNetworkMessage();
		});

		it('should be selected 10 items per page and disabled navigation buttons', async () => {
			await expect(ManageProducts.manageProductsPaginationItemsPerPage).toHaveText('Rows per page:\n10');
			await expect(ManageProducts.manageProductsPaginationItemsShownCount).toHaveText('1-8 of 8');
			await expect(ManageProducts.manageProductsPaginationPreviousPageBtn).toBeDisabled();
			await expect(ManageProducts.manageProductsPaginationNextPageBtn).toBeDisabled();
		});

		it('should be selected 5 items per page and enabled next page button', async () => {
			await ManageProducts.manageProductsItemsPerPageSelect.click();
			await ManageProducts.manageProductsItemsPerPageSelectOptions[0]?.click();

			await expect(ManageProducts.manageProductsPaginationItemsPerPage).toHaveText('Rows per page:\n5');
			await expect(ManageProducts.manageProductsPaginationItemsShownCount).toHaveText('1-5 of 8');
			await expect(ManageProducts.manageProductsPaginationPreviousPageBtn).toBeDisabled();
			await expect(ManageProducts.manageProductsPaginationNextPageBtn).toBeEnabled();
		});

		it('should be change showed products count when click on prev/next page', async () => {
			await ManageProducts.manageProductsPaginationNextPageBtn.click();

			await expect(ManageProducts.manageProductsPaginationItemsShownCount).toHaveText('6-8 of 8');
			await expect(ManageProducts.manageProductsPaginationPreviousPageBtn).toBeEnabled();
			await expect(ManageProducts.manageProductsPaginationNextPageBtn).toBeDisabled();

			await ManageProducts.manageProductsPaginationPreviousPageBtn.click();

			await expect(ManageProducts.manageProductsPaginationItemsShownCount).toHaveText('1-5 of 8');
		});
	});
});
