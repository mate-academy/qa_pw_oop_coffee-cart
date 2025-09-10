// src/pages/BasePage.js
import { step as pwStep } from '@playwright/test';

export class BasePage {
  /** @protected */ _url;

  constructor(page) {
    this.page = page;
  }

  async step(title, body) {
    // keep PW's step behind an instance method
    await pwStep(title, body);
  }

  url() {
    if (this._url) return this._url;
    throw new Error(`The property '_url' must be implemented`);
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