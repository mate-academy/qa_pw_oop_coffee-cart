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
    await step(`Open ${this._pageName()} page`, async () => {
      await this.page.goto(this.url());
    });
  }

  async reload() {
    await step(`Reload ${this._pageName()} page`, async () => {
      await this.page.reload();
    });
  }

  async waitForLoading() {
    await step(`Wait for ${this._pageName()} page to load`, async () => {
      await this.page.waitForURL(this.url());
    });
  }
}
