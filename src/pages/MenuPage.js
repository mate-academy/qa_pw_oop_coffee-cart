// src/pages/MenuPage.js
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class MenuPage extends BasePage {
  constructor(page) {
    super(page);
    this._url = '/';

    this.cartLink = page.getByLabel('Cart page');
    this.totalCheckout = page.getByTestId('checkout');
    this.promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );
    this.yesPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.noPromoButton = page.getByRole('button', { name: "Nah, I'll skip." });
  }

  coffeeCupLocator(coffeeName) {
    const testId = coffeeName.replace(' ', '_');
    return this.page.getByTestId(testId);
  }

  coffeeCupCostLocator(coffeeName) {
    const coffeeCup = this.coffeeCupLocator(coffeeName);
    return this.page.getByRole('listitem').filter({ has: coffeeCup });
  }

  async clickCoffeeCup(coffeeName) {
    await this.step(`Click ${coffeeName} cup`, async () => {
      await this.coffeeCupLocator(coffeeName).click();
    });
  }

  async clickCartLink() {
    await this.step(`Click 'Cart' link`, async () => {
      await this.cartLink.click();
    });
  }

  async clickYesPromoButton() {
    await this.step(`Click 'Yes' promo button`, async () => {
      await this.yesPromoButton.click();
    });
  }

  async clickNoPromoButton() {
    await this.step(`Click 'No' promo button`, async () => {
      await this.noPromoButton.click();
    });
  }

  async assertTotalCheckoutContainsValue(value) {
    await this.step(`Assert Total checkout has value: ${value}`, async () => {
      await expect(this.totalCheckout).toContainText(value);
    });
  }

  async assertCoffeeCupCostHasValue(coffee, value) {
    await this.step(`Assert ${coffee} cup cost has value: ${value}`, async () => {
      await expect(this.coffeeCupCostLocator(coffee)).toContainText(value);
    });
  }

  async assertPromoMessageIsVisible() {
    await this.step(`Assert promo message is visible`, async () => {
      await expect(this.promoMessage).toBeVisible();
    });
  }
}