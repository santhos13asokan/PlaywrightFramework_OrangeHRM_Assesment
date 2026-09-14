import type { Locator } from '@playwright/test';
import { UIUtil } from '../utils/ui.utils';
import { WaitsUtil } from '../utils/waits.utils';
import {BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly pimMenuItem: Locator;
  readonly adminMenuItem: Locator;
  readonly leaveMenuItem: Locator;

  constructor(uiUtil: UIUtil, waitsUtil: WaitsUtil) {
    super(uiUtil, waitsUtil);
    this.pimMenuItem = this.page.getByRole('link', { name: 'PIM', exact: true });
    this.adminMenuItem = this.page.getByRole('link', { name: 'Admin', exact: true });
    this.leaveMenuItem = this.page.getByRole('link', { name: 'Leave', exact: true });
  }

 
  async clickPIMMenuItem(): Promise<void> {
    await this.uiUtil.click(this.pimMenuItem);
    
  }

  
  async clickSideMenuItem(menuName: string): Promise<void> {
    const itemLocator = this.page.getByRole('link', { name: menuName, exact: true });
    await this.uiUtil.click(itemLocator);
    await this.waitForPageLoad();
  }
}