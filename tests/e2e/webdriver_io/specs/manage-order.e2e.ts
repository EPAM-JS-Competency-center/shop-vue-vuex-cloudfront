import { ManageOrder } from '../pageobjects';

describe('Manage Orders page', () => {
	beforeAll(async () => {
		await ManageOrder.open();
	});

	it('should be present table with existing orders', async () => {
		await expect(ManageOrder.manageOrdersHeader).toHaveText('Manage orders');
		await expect(ManageOrder.manageOrdersTable).toBeDisplayedInViewport();

		await expect(ManageOrder.manageOrdersTableColumnHeaders).toBeElementsArrayOfSize(5);
		await expect(ManageOrder.manageOrdersTableColumnHeaders[0]).toHaveText('From');
		await expect(ManageOrder.manageOrdersTableColumnHeaders[1]).toHaveText('Items count');
		await expect(ManageOrder.manageOrdersTableColumnHeaders[2]).toHaveText('Address');
		await expect(ManageOrder.manageOrdersTableColumnHeaders[3]).toHaveText('Status');
		await expect(ManageOrder.manageOrdersTableColumnHeaders[4]).toHaveText('Action');

		await expect(ManageOrder.manageOrdersTableRows).toBeElementsArrayOfSize(1);
		await expect(ManageOrder.manageOrdersTableRows[0])
			.toHaveText('firstName lastName\n1\naddress details APPROVED (MOCK)\nMANAGE\nDELETE');

		await expect(ManageOrder.manageOrdersPagination).toHaveText('Rows per page:\n10\n1-1 of 1');
	});

	it('should navigate to order details page when clock on order MANAGE button', async () => {
		await ManageOrder.manageOrderButton.click();

		await expect(browser).toHaveUrlContaining('/admin/order/');
	});

	describe('Edit Order', () => {
		it('should be displayed manage order sections', async () => {
			await expect(ManageOrder.manageOrderHeader).toHaveText('Manage order');
			await expect(ManageOrder.manageOrderStatusInfoTable).toBeDisplayedInViewport();
			await expect(ManageOrder.manageOrderAddressInfo).toBeDisplayedInViewport();
			await expect(ManageOrder.manageOrderChangeStatus).toBeDisplayedInViewport();
		});

		it('should be displayed table with order\'s status, date and comment', async () => {
			await expect(ManageOrder.manageOrdersTable).toBeDisplayedInViewport();

			await expect(ManageOrder.manageOrdersTableColumnHeaders).toBeElementsArrayOfSize(3);
			await expect(ManageOrder.manageOrdersTableColumnHeaders[0]).toHaveText('Status');
			await expect(ManageOrder.manageOrdersTableColumnHeaders[1]).toHaveText('Date and Time');
			await expect(ManageOrder.manageOrdersTableColumnHeaders[2]).toHaveText('Comment');

			await expect(ManageOrder.manageOrdersTableRows).toBeElementsArrayOfSize(1);
			await expect(ManageOrder.manageOrdersTableRows[0])
				.toHaveText('approved (MOCK) Invalid Date');

			await expect(ManageOrder.manageOrdersPagination).toHaveText('Rows per page:\n10\n1-1 of 1');
		});

		it('should be displayed order\'s shipping address', async () => {
			await expect(ManageOrder.manageOrderAddressTotal).toHaveText('Shipping address\nFree\nTotal\n$0.00');
			await expect(ManageOrder.manageOrderAddress).toHaveText('Shipping address\nfirstName lastName\naddress details\nComment:');
		});

		it('should be displayed order\'s change status cart with available status options', async () => {
			await expect(ManageOrder.manageOrderChangeStatusTitle).toHaveText('Status');
			await expect(ManageOrder.manageOrderChangeStatusSelect).toHaveText('Status');

			await ManageOrder.manageOrderChangeStatusSelect.click();

			await expect(ManageOrder.manageOrderChangeStatusSelectOptions).toBeElementsArrayOfSize(6);
			await expect(ManageOrder.manageOrderChangeStatusSelectOptions[0]).toHaveText('Open');
			await expect(ManageOrder.manageOrderChangeStatusSelectOptions[1]).toHaveText('Approved');
			await expect(ManageOrder.manageOrderChangeStatusSelectOptions[2]).toHaveText('Confirmed');
			await expect(ManageOrder.manageOrderChangeStatusSelectOptions[3]).toHaveText('Sent');
			await expect(ManageOrder.manageOrderChangeStatusSelectOptions[4]).toHaveText('Completed');
			await expect(ManageOrder.manageOrderChangeStatusSelectOptions[5]).toHaveText('Cancelled');
		});

		it('should be changed order status according to selected option', async () => {
			await expect(ManageOrder.manageOrderChangeStatus).toHaveText('Status\nCurrent status\nComment\nCHANGE STATUS');

			// @ts-ignore
			await ManageOrder.manageOrderChangeStatusSelectOptions[2].click();

			await expect(ManageOrder.manageOrderChangeStatus).toHaveText('Status\nConfirmed\nCurrent status\nComment\nCHANGE STATUS');
		});
	});
});
