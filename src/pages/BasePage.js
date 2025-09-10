const { step } = require('@playwright/test');

export class BasePage {
  /** @protected */ _url;

  constructor(page) {
    this.page = page;
  }

  async step(title, body) {
    await step(title, body);
  }

  url() {
    if (this._url) {
      return this._url;
    }
    throw Error(`The property '_url' must be implemented`);
  }

  _pageName() {
    return this.constructor.name.replace('Page', '');
  }

  async open() {
    await this.step(`Open ${this._pageName()} page`, async () => {
      await this.page.goto(this.url());
    });
  }

  async reload() {
    await this.step(`Reload ${this._pageName()} page`, async () => {
      await this.page.reload();
    });
  }

  async waitForLoading() {
    await this.step(`Wait for ${this._pageName()} page to open`, async () => {
      await this.page.waitForURL(this.url());
    });
  }
}
