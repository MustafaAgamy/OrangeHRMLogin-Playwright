import { test, expect, Browser, Page} from '@playwright/test';
import { AdminPage } from './PageObjects/AdminPage';
import { AddUserPage } from './PageObjects/AddUserPage';
import { Login } from './PageObjects/Apis/Login';

test.beforeEach(async ({page}) => {
  const login = new Login();
  await login.login();
  await login.validate();
  if (login.validateCookie) {
    //attach the cookie to the running browser context
    await page.context().addCookies([
      {
        name: login.validateCookie.name,
        value: login.validateCookie.value,
        path: login.validateCookie.path || '/',
        domain: 'opensource-demo.orangehrmlive.com',
        secure: login.validateCookie.secure || false,
        httpOnly: login.validateCookie.httpOnly || false,
        sameSite: (login.validateCookie.sameSite as 'Lax' | 'Strict' | 'None') || 'Lax',
      },
    ]);
  } else {
    throw new Error('Cookie from validate step is null. Cannot proceed.');
  }
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
});

test('Add Users', async ({ page }) => {
  
  const adminPage = new AdminPage(page);
  await adminPage.assertNavigateIsSuccessful();

  const addUserPage = new AddUserPage(page);
  await addUserPage.navigate();
  await addUserPage.assertNavigateIsSuccessful();
  await addUserPage.addUser('Test','Test','P@ssw0rd');
});

test.afterEach(async ({ page }) => {
  await page.close();
});