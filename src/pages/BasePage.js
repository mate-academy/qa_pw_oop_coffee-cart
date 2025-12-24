import {step} from '@playwright/test';
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

  async waitForLoading() {
    await step(`Wait for ${this._pageName()} page to open`, async () => {
      await this.page.waitForURL(this.url());
    });
  }

  async reload() {
    await step(`Reload the Cart Page`, async () => {
      await this.page.reload();
    });
  }

  async open() {
    await step(`Open ${this._pageName()} page`, async () => {
      await this.page.goto(this.url());
    });
  }

  _pageName() {
    return this.constructor.name.replace('Page', '');
  }
}