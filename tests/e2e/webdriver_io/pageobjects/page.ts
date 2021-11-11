import { WdioElement, WdioElements } from '../types/models';
import { invisibilityOf } from 'wdio-wait-for';

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
     * define selectors using getter methods
     */
    // header elements
    get header(): WdioElement {
        return $('.v-application--wrap > header.v-app-bar');
    }

    get headerHomeLink(): WdioElement {
        return this.header.$('a.home-link');
    }

    get headerAccountMenuBtn(): WdioElement {
        return this.header.$('button[data-test-id="account-button"]');
    }

    get headerAccountMenuList(): WdioElement {
        return $('div[role="menu"] > div[data-test-id="account-menu"]');
    }

    get headerAccountMenuListItems(): WdioElements {
        return this.getMenuItems(this.headerAccountMenuList);
    }

    get headerLanguageMenuBtn(): WdioElement {
        return this.header.$('button:last-child');
    }

    get headerLanguageMenuList(): WdioElement {
        return $('div.menuable__content__active');
    }

    get headerLanguageMenuListItems(): WdioElements {
        return this.getMenuItems(this.headerLanguageMenuList);
    }

    get headerCartLink(): WdioElement {
        return this.header.$('a[data-test-id="cart-link"]');
    }

    get headerCartLinkBadge(): WdioElement {
        return this.headerCartLink.$('.v-badge__wrapper span');
    }

    // main content elements
    get mainContent(): WdioElement {
        return $('.v-application--wrap > main.v-main');
    }

    // footer elements
    get footer(): WdioElement {
        return $('.v-application--wrap > footer.v-footer');
    }

    get footerSubTitle(): WdioElement {
        return this.footer.$('.text-subtitle1');
    }

    get footerCopyright(): WdioElement {
        return this.footer.$('.text-body2');
    }

    get networkMessageCloseBtn(): WdioElement {
        return $('div.v-snack__action button.v-snack__btn');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    getMenuItems(menu: WdioElement): WdioElements {
        return menu.$$('.v-list-item');
    }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open(path: string = ''): Promise<string> {
        return browser.url(path);
    }

    async closeNetworkMessage(): Promise<void> {
        if (await this.networkMessageCloseBtn.isDisplayedInViewport()) {
            await this.networkMessageCloseBtn.click();

            await browser.waitUntil(invisibilityOf(this.networkMessageCloseBtn), { interval: 500 });
        }
    }
}
