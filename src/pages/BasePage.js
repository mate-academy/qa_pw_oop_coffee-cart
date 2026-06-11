import { test as base } from '@playwright/test';

export class BasePage {
  _url;  
  constructor(page) {
    this.page = page;
  }

  async step(title, stepToRun) {
    return await base.step(title, stepToRun);
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
    await this.step(`Open ${this._pageName()} page`, async () => {
      await this.page.goto(this.url());
    });
  }
  async reload() {
    await this.step(`Reload the ${this._pageName()} Page`, async () => {
      await this.page.reload();
    });
  }

  async waitForLoading() {
    await this.step(`Wait for ${this._pageName()} page to open`, async () => {
      await this.page.waitForURL(this
        .url()
        .replace('https://coffee-cart.app', ''));
    });
  }
}
