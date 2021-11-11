import Page from './page';
import { WdioElement, WdioElements } from '../types/models';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ManageOrderPage extends Page {

	get manageOrdersContainer(): WdioElement {
		return $('div.container')
	}

	get manageOrdersHeader(): WdioElement {
		return this.manageOrdersContainer.$('h5')
	}

	get manageOrdersTable(): WdioElement {
		return this.manageOrdersContainer.$('div.v-data-table__wrapper table');
	}

	get manageOrdersPagination(): WdioElement {
		return this.manageOrdersContainer.$('div.v-data-footer');
	}

	get manageOrdersTableColumnHeaders(): WdioElements {
		return this.manageOrdersContainer.$$('thead tr th[role="columnheader"');
	}

	get manageOrdersTableRows(): WdioElements {
		return this.manageOrdersContainer.$$('tbody tr');
	}

	get manageOrderButton(): WdioElement {
		// @ts-ignore
		return this.manageOrdersTableRows[0].$('a[data-testid="manage-order"]');
	}

	get manageOrderHeader(): WdioElement {
		return this.manageOrdersContainer.$('h4')
	}

	get manageOrderStatusInfoTable(): WdioElement {
		return this.manageOrdersContainer.$('div.v-data-table table');
	}

	get manageOrderAddressInfo(): WdioElement {
		// @ts-ignore
		return this.manageOrdersContainer.$$('div.row')[1].$$('div.col')[0];
	}

	get manageOrderAddressTotal(): WdioElement {
		// @ts-ignore
		return this.manageOrderAddressInfo.$$('div[role="list"]')[0];
	}

	get manageOrderAddress(): WdioElement {
		// @ts-ignore
		return this.manageOrderAddressInfo.$$('div[role="list"]')[1];
	}

	get manageOrderChangeStatus(): WdioElement {
		// @ts-ignore
		return this.manageOrdersContainer.$$('div.row')[1].$('div.col div.v-card');
	}

	get manageOrderChangeStatusTitle(): WdioElement {
		return this.manageOrderChangeStatus.$('div.v-card__title');
	}

	get manageOrderChangeStatusSelect(): WdioElement {
		return this.manageOrderChangeStatus.$('div.v-card__text div.v-input__control div[role="button"]');
	}

	get manageOrderChangeStatusSelectOptions(): WdioElements {
		return $$('div.v-menu__content div[role="option"]');
	}

	open(path: string = '/admin/orders'): Promise<string> {
		return super.open(path);
	}
}

export default new ManageOrderPage();
