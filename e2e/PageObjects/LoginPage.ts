import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly loginPageTitle: Locator;
  private readonly userNameField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly profilePic: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.loginPageTitle = page.getByRole('heading',{name: 'Login'});
    this.userNameField = page.getByPlaceholder('Username');
    this.passwordField = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', {name : 'Login'})
    this.profilePic = page.getByRole('banner').getByRole('img', { name: 'profile picture' });

  }

  //////////////// Actions ///////////////////
  public async navigate() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  public async login(userName: string, password: string) {
    await this.userNameField.fill(userName);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  };


  //////////////// Validations ///////////////////

  public async assertNavigateIsSuccessful() {
    await expect(this.loginPageTitle).toBeVisible();
  }

  public async assertloginIsSuccessful() {
    await expect(this.profilePic).toBeVisible();
  }
}