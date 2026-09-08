const { expect, step } = require('@playwright/test');

export class BasePage {
  _url;
  constructor(page) {
    this.page = page;
    this.step = step;
  }

  url() {
    if (this._url) {
      return this._url;
    } else {
      throw Error(`The property '_url' must be implemented`);
    }
  }

  async open() {
    await this.step(`Open ${this._pageName()} page`, async () => {
      await this.page.goto(this.url());
    });
  }

  _pageName() {
    return this.constructor.name.replace('Page', '');
  }

  async reload() {
    await this.step(`Reload the ${this._pageName()}`, async () => {
      await this.page.reload();
    });
  }

  async waitForLoading() {
    await this.step(`Wait for ${this._pageName()} to open`, async () => {
      await this.page.waitForURL(this.url());
    });
  }
}
