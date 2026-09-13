import { expect, type Locator } from '@playwright/test';
import { UIUtil } from '../utils/ui.utils';
import { WaitsUtil } from '../utils/waits.utils';
import { BasePage } from './base.page';

export class AddEmployeePage extends BasePage {
  
  readonly mainTitle: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly fileInput: Locator;
  readonly createLoginDetailsToggle: Locator;

  constructor(uiUtil: UIUtil, waitsUtil: WaitsUtil) {
    super(uiUtil, waitsUtil);

    this.mainTitle = this.page.locator('h6.orangehrm-main-title');
    this.firstNameInput = this.page.locator('input[name="firstName"]');
    this.middleNameInput = this.page.locator('input[name="middleName"]');
    this.lastNameInput = this.page.locator('input[name="lastName"]');
    
   
    this.employeeIdInput = this.page
      .locator('.oxd-input-group', { hasText: 'Employee Id' })
      .locator('input');
      
    this.fileInput = this.page.locator('input[type="file"]');
    this.createLoginDetailsToggle = this.page.locator('.oxd-switch-input');
    this.saveButton = this.page.locator('button[type="submit"]');
    this.cancelButton = this.page.locator('button', { hasText: 'Cancel' });
  }

  
  async verifyOnAddEmployeePage(): Promise<void> {
    await expect(this.mainTitle).toHaveText('Add Employee');
  }

  async uploadProfilePicture(filePath: string): Promise<void> {
    await this.uploadFile(this.fileInput, filePath);
  }
  
  async addEmployee(
    firstName: string,
    lastName: string,
    middleName?: string,
    employeeId?: string,
    imagePath?: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);

    if (middleName) {
      await this.middleNameInput.fill(middleName);
    }

    await this.lastNameInput.fill(lastName);

    if (employeeId) {
      await this.employeeIdInput.clear();
      await this.employeeIdInput.fill(employeeId);
    }

    if (imagePath) {
      await this.fileInput.setInputFiles(imagePath);
    }

    await this.saveButton.click();
    await this.waitForPageLoad();
  }

  
  async enableCreateLoginDetails(): Promise<void> {
    await this.createLoginDetailsToggle.click();
  }
}