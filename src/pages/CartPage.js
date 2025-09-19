// src/pages/CartPage.js
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this._url = '/cart';

    this.cartListLocator = page.getByRole('list').nth(1);
    this.notCoffeeMessage = page.getByText('No coffee, go add some.');
    this.totalCheckout = page.getByTestId('checkout');
  }

  coffeeItem(name) {
    return this.cartListLocator.getByRole('listitem').filter({ hasText: name });
  }
  coffeeListItemNameCell(name) { return this.coffeeItem(name).locator('div').nth(0); }
  coffeeListItemUnitCell(name) { return this.coffeeItem(name).locator('div').nth(1); }
  coffeeListItemTotalCostCell(name) { return this.coffeeItem(name).locator('div').nth(3); }

  coffeeListItemRemoveAllButton(name) { return this.page.getByLabel(`Remove all ${name}`); }
  coffeeListItemRemoveOneButton(name) { return this.page.getByLabel(`Remove one ${name}`).nth(1); }
  coffeeListItemAddOneButton(name) { return this.page.getByLabel(`Add one ${name}`).nth(1); }

  async clickCoffeeListItemRemoveAllButton(name) {
    await this.step(`Click 'Remove All' button for ${name} list item`, async () => {
      await this.coffeeListItemRemoveAllButton(name).click();
    });
  }
  async clickCoffeeListItemRemoveOneButton(name) {
    await this.step(`Click 'Remove One' button for ${name} list item`, async () => {
      await this.coffeeListItemRemoveOneButton(name).click();
    });
  }
  async clickCoffeeListItemAddOneButton(name) {
    await this.step(`Click 'Add One' button for ${name} list item`, async () => {
      await this.coffeeListItemAddOneButton(name).click();
    });
  }

  async assertCoffeeItemIsVisible(name) {
    await this.step(`Assert the ${name} list item is visible`, async () => {
      await expect(this.coffeeItem(name)).toBeVisible();
    });
  }
  async assertCoffeeItemIsHidden(name) {
    await this.step(`Assert the ${name} coffee item is hidden`, async () => {
      await expect(this.coffeeItem(name)).toBeHidden();
    });
  }
  async assertCoffeeNameContainsCorrectText(name) {
    await this.step(`Assert the ${name} coffee item name is visible`, async () => {
      await expect(this.coffeeListItemNameCell(name)).toBeVisible();
    });
  }
  async assertCoffeeUnitContainsCorrectText(name, text) {
    await this.step(`Assert the ${name} units has correct amount`, async () => {
      await expect(this.coffeeListItemUnitCell(name)).toContainText(text);
    });
  }
  async assertCoffeeTotalCostContainsCorrectText(name, text) {
    await this.step(`Assert the ${name} total cost has correct amount`, async () => {
      await expect(this.coffeeListItemTotalCostCell(name)).toContainText(text);
    });
  }
  async assertNoCoffeeMessageIsVisible() {
    await this.step(`Assert 'No coffee' message is visible`, async () => {
      await expect(this.notCoffeeMessage).toBeVisible();
    });
  }
  async assertTotalCheckoutContainsValue(value) {
    await this.step(`Assert Total Checkout has value ${value}`, async () => {
      await expect(this.totalCheckout).toContainText(value);
    });
  }
}