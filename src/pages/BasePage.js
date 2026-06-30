


  export class BasePage{
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
  async step(name, action) {
  console.log(`Step: ${name}`);
  await action();
}

  
   async open() {
    await this.step(`Open ${this._pageName()} page`, async () => {
      await this.page.goto(this.url());
    });
  }
    _pageName() {
    return this.constructor.name.replace('Page', '');
  }


    async waitForLoading() {
      await this.step(`Wait for ${this._pageName()} page to open`, async () => {
        await this.page.waitForURL(this.url());
      });
    }
  
    async reload() {
      await this.step(`Reload ${this._pageName()} page`, async () => {
        await this.page.reload();
      });
    }


 

}
