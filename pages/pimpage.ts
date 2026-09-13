import { expect, type Locator } from '@playwright/test';
import { UIUtil } from '../utils/ui.utils';
import { WaitsUtil } from '../utils/waits.utils';
import {BasePage }from './base.page';

export class PimPage extends BasePage {

  readonly pimMenuItem: Locator;
  readonly headerTitle: Locator;
  readonly addButton: Locator;
  readonly mainTitle: Locator;
  readonly employeeNameInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly tableBody: Locator;
  readonly tableCardRows: Locator;
  readonly confirmDeleteButton: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly savePersonalDetailsBtn: Locator;
  

  constructor(uiUtil: UIUtil, waitsUtil: WaitsUtil) {
    super(uiUtil, waitsUtil);
    this.pimMenuItem = this.page.getByRole('link', { name: 'PIM' });
    this.headerTitle = this.page.locator('h6.oxd-topbar-header-title');
    this.addButton = this.page.getByRole('button', { name: 'Add' });
    this.mainTitle = this.page.locator('h6.orangehrm-main-title');
    this.employeeNameInput = this.page
      .locator('.oxd-input-group', { hasText: 'Employee Name' })
      .locator('input');
    this.searchButton = this.page.locator('button[type="submit"]');
    this.resetButton = this.page.locator('button[type="reset"]');
    this.tableBody = this.page.locator('.oxd-table-body');
    this.tableCardRows = this.page.locator('.oxd-table-card');
    this.confirmDeleteButton = this.page.locator('button:has-text("Yes, Delete")');
    this.firstNameInput = this.page.locator('input[name="firstName"]');
    this.middleNameInput = this.page.locator('input[name="middleName"]');
    this.lastNameInput = this.page.locator('input[name="lastName"]');
  this.savePersonalDetailsBtn = this.page.getByRole('button', { name: 'Save' }).first();
  }

  async navigateToPimMenu() {
    await this.pimMenuItem.click();
    await this.waitForPageLoad();
  }

  async clickAddButton() {
    await this.addButton.click();
    await this.waitForPageLoad();
  }

  async verifyOnAddEmployeePage() {
    await expect(this.mainTitle).toHaveText('Add Employee');
  }

  async searchEmployeeByName(employeeName: string, selectFirstHint: boolean = true): Promise<void> {
    await this.fillText(this.employeeNameInput, employeeName);
    await this.clickElement(this.searchButton);
    await this.waitForPageLoad();
  }

  async verifyTableDetails(firstNameMiddle: string, lastName: string): Promise<void> {
    const rowCells = this.tableCardRows.first().locator('.oxd-table-cell');
    await expect(rowCells.nth(2)).toContainText(firstNameMiddle);
    await expect(rowCells.nth(3)).toContainText(lastName);
  }

  async clickEditEmployee(identifier: string): Promise<void> {
    const editBtn = this.page.locator('.oxd-table-card', { hasText: identifier }).locator('button:has(.bi-pencil-fill)');
    await this.clickElement(editBtn);
    await this.waitForPageLoad();
  }

  async clickDeleteEmployee(identifier: string, confirmDelete: boolean = true): Promise<void> {
    const deleteBtn = this.page.locator('.oxd-table-card', { hasText: identifier }).locator('button:has(.bi-trash)');
    await this.clickElement(deleteBtn);

    if (confirmDelete) {
      await this.clickElement(this.confirmDeleteButton);
      await this.waitForPageLoad();
    }

  }
  async editEmployeeFullName(firstName: string, middleName: string, lastName: string): Promise<void> {
    await this.fillText(this.firstNameInput, firstName);
    await this.fillText(this.middleNameInput, middleName);
    await this.fillText(this.lastNameInput, lastName);
    await this.waitForPageLoad();
    await this.clickElement(this.savePersonalDetailsBtn);
    await this.waitForPageLoad();
  }
}