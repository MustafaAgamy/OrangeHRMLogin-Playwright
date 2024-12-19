import { expect, type Locator, type Page } from '@playwright/test';

export class AdminPage {
  private readonly page: Page;
  private readonly adminPageTitle: Locator;
  private readonly adminTab: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.adminTab = page.getByRole('link', { name: 'Admin' });
    this.adminPageTitle = page.getByRole('heading', { name: 'System Users' });
  }

  //////////////// Actions ///////////////////
  public async navigate() {
    // await this.adminTab.click();
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  }

  //////////////// Validations ///////////////////
  public async assertNavigateIsSuccessful() {
    await expect(this.adminPageTitle).toBeVisible();
  }

}