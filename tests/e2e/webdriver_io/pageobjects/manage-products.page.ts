import Page from './page';
import { WdioElement, WdioElements } from '../types/models';

class ManageProductsPage extends Page {
	readonly cartButtonSelector = 'button[data-test-id="add-product-button"]';

	get manageProductsContainer(): WdioElement {
		return $('div.container');
	}

	get manageProductsImportHeader(): WdioElement {
		return this.manageProductsContainer.$('h5.text-h5');
	}

	get manageProductsImportForm(): WdioElement {
		return this.manageProductsContainer.$('form.v-form.my-4');
	}

	get manageProductsImportFormInput(): WdioElement {
		return this.manageProductsImportForm.$('div.v-input__control div.v-input__slot input');
	}

	get manageProductsTable(): WdioElement {
		return this.manageProductsContainer.$('div.v-data-table__wrapper table');
	}

	get manageProductsTableColumnHeaders(): WdioElements {
		return this.manageProductsTable.$$('tr th[role="columnheader"]');
	}

	get manageProductsTableRows(): WdioElements {
		return this.manageProductsTable.$$('tbody tr');
	}

	get manageProductsTablePagination(): WdioElement {
		return this.manageProductsContainer.$('div.v-data-footer');
	}

	get manageProductsPaginationItemsPerPage(): WdioElement {
		return this.manageProductsTablePagination.$('div.v-data-footer__select');
	}

	get manageProductsPaginationItemsShownCount(): WdioElement {
		return this.manageProductsTablePagination.$('div.v-data-footer__pagination');
	}

	get manageProductsPaginationPreviousPageBtn(): WdioElement {
		return this.manageProductsTablePagination.$('div.v-data-footer__icons-before button');
	}

	get manageProductsPaginationNextPageBtn(): WdioElement {
		return this.manageProductsTablePagination.$('div.v-data-footer__icons-after button');
	}

	get manageProductsItemsPerPageSelect(): WdioElement {
		return this.manageProductsPaginationItemsPerPage.$('div.v-select__slot');
	}

	get manageProductsItemsPerPageSelectOptions(): WdioElements {
		return $$('div[role="listbox"] div[role="option"]')
	}

	getTableColumnHeaderSortBtn(columnHeader: WdioElement): WdioElement {
		return columnHeader.$('i.v-data-table-header__icon');
	}

	getTableRowTitleCell(row: WdioElement): WebdriverIO.Element | undefined {
		return row.$$('td')[0];
	}

	getTableRowDescriptionCell(row: WdioElement): WebdriverIO.Element | undefined {
		return row.$$('td')[1];
	}

	getTableRowPriceCell(row: WdioElement): WebdriverIO.Element | undefined {
		return row.$$('td')[2];
	}

	getTableRowCountCell(row: WdioElement): WebdriverIO.Element | undefined {
		return row.$$('td')[3];
	}

	getTableRowActionCellManageBtn(row: WdioElement): WdioElement {
		// @ts-ignore
		return row.$$('td')[4].$('a');
	}

	open(path: string = '/admin/products'): Promise<string> {
		return super.open(path);
	}
}

export default new ManageProductsPage();
