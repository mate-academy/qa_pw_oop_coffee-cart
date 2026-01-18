const { step } = require('@playwright/test');

export class BasePage {
  _url;

  constructor(page) {
    this.page = page;
  }

  _pageName() {
    return this.constructor.name.replace('Page', '');
  }

  url() {
    if (this._url) {
      return this._url;
    } else {
      throw Error(`The property '_url' must be implemented`);
    }
  }

  async open() {
    await step(`Open ${this._pageName()} page`, async () => {
      await this.page.goto(this.url());
    });
  }

  async reload() {
    await step(`Reload the ${this._pageName()} Page`, async () => {
      await this.page.reload();
    });
  }

  async waitForLoading() {
    await step(`Wait for ${this._pageName()} page to open`, async () => {
      const urlPattern = this._url.startsWith('http') ? new URL(this._url).pathname : this._url;
      await this.page.waitForURL(urlPattern);
    });
  }
}