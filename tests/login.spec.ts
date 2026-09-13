import { test } from '../fixtures/custom.fixture';
import * as testData from '../testdata/test.json';
import * as path from 'path';
import { loginPageConst, pimPageConst, adminConst, addEmployeeConst } from '../constants/data.constant';



test.describe('Login and PIM Tests', () => {


  test.beforeEach(async ({ poManager, uiUtil }) => {
    const loginPage = poManager.getLoginPage();
    await loginPage.gotoLoginPage();
    await uiUtil.assertTitle(loginPageConst.title);
  });

  test('Login with admin', async ({ poManager, uiUtil, waitsUtil }) => {
    const loginPage = poManager.getLoginPage();
    await loginPage.login(testData.admin.userName, testData.admin.password);
    await uiUtil.assertVisible(loginPage.page.getByRole('heading', { name: adminConst.headers }));
  });

  test('Navigate to PIM and add employee', async ({ poManager, uiUtil }) => {
    const loginPage = poManager.getLoginPage();
    const pimPage = poManager.getPimPage();
    const addEmployeePage = poManager.getAddEmployeePage();
    const randomId = uiUtil.getRandomEmployeeId();
    const imagePath = path.join(__dirname, '../testdata/test.jpg');


    await loginPage.login(testData.admin.userName, testData.admin.password);
    await uiUtil.assertVisible(loginPage.page.getByRole('heading', { name: adminConst.headers }));

    await pimPage.navigateToPimMenu();
    await uiUtil.assertVisible(loginPage.page.getByRole('heading', { name: pimPageConst.headers }));

    await pimPage.clickAddButton();
    await pimPage.verifyOnAddEmployeePage();

    await addEmployeePage.verifyOnAddEmployeePage();


    await addEmployeePage.addEmployee(
      addEmployeeConst.firstName,
      addEmployeeConst.lastName,
      addEmployeeConst.middleName,
      randomId,
      imagePath);


    await uiUtil.assertTextVisible(addEmployeeConst.successMessage);

    await pimPage.navigateToPimMenu();
    await uiUtil.assertVisible(loginPage.page.getByRole('heading', { name: pimPageConst.headers }));
  });

  test('Search for an employee by name', async ({ poManager, uiUtil }) => {
    const loginPage = poManager.getLoginPage();
    const pimPage = poManager.getPimPage();

    await loginPage.login(testData.admin.userName, testData.admin.password);
    await uiUtil.assertVisible(loginPage.page.getByRole('heading', { name: adminConst.headers }));


    await pimPage.navigateToPimMenu();
    await uiUtil.assertVisible(loginPage.page.getByRole('heading', { name: pimPageConst.headers }));

    const fullName = addEmployeeConst.firstName + ' ' + addEmployeeConst.middleName;

    await pimPage.searchEmployeeByName(fullName);
await pimPage.page.waitForSelector('.oxd-table-card', { state: 'visible' });
await pimPage.verifyTableDetails(fullName, addEmployeeConst.lastName);


  });

  test('Edit employeename', async ({ poManager, uiUtil,waitsUtil }) => {
    const loginPage = poManager.getLoginPage();
    const pimPage = poManager.getPimPage();

    await loginPage.login(testData.admin.userName, testData.admin.password);
    await uiUtil.assertVisible(loginPage.page.getByRole('heading', { name: adminConst.headers }));


    await pimPage.navigateToPimMenu();
    await uiUtil.assertVisible(loginPage.page.getByRole('heading', { name: pimPageConst.headers }));

    const fullName = addEmployeeConst.firstName + ' ' + addEmployeeConst.middleName;

    await pimPage.searchEmployeeByName(fullName);
    await pimPage.page.waitForSelector('.oxd-table-card', { state: 'visible' });
    await pimPage.verifyTableDetails(fullName, addEmployeeConst.lastName);

    await pimPage.clickEditEmployee(fullName);

    await waitsUtil.forLoadState("networkidle");
    

    await pimPage.editEmployeeFullName(addEmployeeConst.updatedFirstName, addEmployeeConst.updatedMiddleName, addEmployeeConst.updatedLastName);

    
    await uiUtil.assertTextVisible(addEmployeeConst.successfullyUpdated);

    await pimPage.navigateToPimMenu();
    await uiUtil.assertVisible(loginPage.page.getByRole('heading', { name: pimPageConst.headers }));

    const updatedFullName = addEmployeeConst.updatedFirstName + ' ' + addEmployeeConst.updatedMiddleName;

    await pimPage.searchEmployeeByName(updatedFullName);
    await pimPage.page.waitForSelector('.oxd-table-card', { state: 'visible' });
    await pimPage.verifyTableDetails(updatedFullName, addEmployeeConst.updatedLastName);



  });
})