import { testStep } from '../common/helpers/pwHelpers';

export class BasePage{
  _url;

  constructor(page) {
    this.page = page;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
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
    await this.step(`Reload the Cart Page`, async () => {
      await this.page.reload();
    });
  }

  async waitForLoading() {
    await this.step(`Wait for Cart page to open`, async () => {
      await this.page.waitForURL('/cart');
    });
  }

  _pageName() {
    return this.constructor.name.replace('Page', '');
  }
}
