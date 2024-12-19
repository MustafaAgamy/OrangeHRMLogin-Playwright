import { expect, type Locator, type Page } from '@playwright/test';

export class AddUserPage {
 private readonly page: Page;
 private readonly addUserTab: Locator;
 private readonly addUserPageTitle: Locator;
 private readonly userRoleDropDown: Locator;
 private readonly userESSRole: Locator;
 private readonly userStatusDropDown: Locator;
 private readonly enabledOption: Locator;
 private readonly employeeNameField: Locator;
 private readonly employeeNameOption: Locator;
 private readonly userNameField: Locator;
 private readonly passwordField: Locator;
 private readonly confirmPasswordField: Locator;
 private readonly saveButton: Locator;

 public constructor(page: Page) {
    this.page = page;
    this.addUserTab = page.getByRole('button', { name: ' Add' });
    this.addUserPageTitle = page.getByRole('heading', { name: 'Add User' });
    this.userRoleDropDown = page.locator('form i').first();
    this.userESSRole = page.getByRole('option', { name: 'ESS' });
    this.employeeNameField = page.getByPlaceholder('Type for hints...');
    this.employeeNameOption = page.getByRole('option', { name: 'Timothy Lewis Amiano' });
    this.userStatusDropDown = page.locator('form i').nth(1);
    this.enabledOption = page.getByRole('option', { name: 'Enabled' });
    this.userNameField = page.getByRole('textbox').nth(2);
    this.passwordField = page.getByRole('textbox').nth(3);
    this.confirmPasswordField = page.getByRole('textbox').nth(4);
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  //////////////// Actions ///////////////////
  public async navigate() {
    await this.addUserTab.click();
  }

  public async addUser(employeeName: string, userName: string, password: string) {
    await this.userRoleDropDown.click();
    await this.userESSRole.click();
    await this.employeeNameField.fill(employeeName);
    await this.userNameField.fill(userName);
    await this.userStatusDropDown.click();
    await this.enabledOption.click();
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
    await this.saveButton.click();
  };


  //////////////// Validations ///////////////////

  public async assertNavigateIsSuccessful() {
    await expect(this.addUserPageTitle).toBeVisible();
  }

  public async assertloginIsSuccessful() {
  }
}