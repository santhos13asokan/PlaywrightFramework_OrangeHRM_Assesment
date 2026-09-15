import type { Locator } from '@playwright/test';
import { UIUtil } from '../utils/ui.utils';
import { WaitsUtil } from '../utils/waits.utils';
import { BasePage } from './base.page'; 

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutTab: Locator;
 readonly logoutOption:Locator;

  constructor(uiUtil: UIUtil, waitsUtil: WaitsUtil) {
    super(uiUtil, waitsUtil);
    this.usernameInput = this.page.getByPlaceholder('Username');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.logoutTab = this.page.locator('.oxd-userdropdown-name');
    this.logoutOption = this.page.getByRole('menuitem', { name: 'Logout' });
  }

  async gotoLoginPage() {
    await this.navigateTo('/');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitForPageLoad();
  }

  async logout(){
    await this.logoutTab.click();
    await this.logoutOption.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.close();

  }
}