import { test } from '@playwright/test';

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
   await test.step(`Open ${this._pageName()} page`, async () => {
     await this.page.goto(this.url());
   });
 }
  
  async reload() {
    await test.step(`Reload the ${this._pageName()}`, async () => {
      await this.page.reload();
    });
  }

  async waitForLoading() {
    await test.step(`Wait for ${this._pageName()} to open`, async () => {
      await this.page.waitForURL(this.url());
    });
  }
}