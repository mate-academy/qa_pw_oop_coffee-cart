const { step } = require('@playwright/test');

export class BasePage {
  _url;

  constructor(page) {
    this.page = page;
  }

  url() {
    if (this._url) {
      return this._url;
    } else {
      throw Error(`The property '_url' must be implemented`);
    }
  }

  _pageName() {
    return this.constructor.name.replace('Page', '');
  }

  async open() {
    await step(`Open the ${this._pageName()} Page`, async () => {
      await this.page.goto(this.url());
    });
  }

  async reload() {
    await step(`Reload the Menu Page`, async () => {
      await this.page.reload();
    });
  }

  async waitForLoading() {
    await step(`Wait for Cart page to open`, async () => {
      await this.page.waitForURL('/cart');
    });
  }
}
