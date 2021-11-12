import { WdioElement } from '../types/models';

export async function clickOnElementTimes(element: WdioElement, count: number = 1): Promise<void> {
	for (const _ of Array(count)) {
		await element.click();
	}
}
