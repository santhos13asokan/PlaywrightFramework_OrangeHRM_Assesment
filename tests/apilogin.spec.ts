import { test, expect } from '../fixtures/custom.fixture';

test('Should login and create a new employee', async ({ apiUtil }) => {
  
  await apiUtil.login();

  
  const response = await apiUtil.createEmployee({
    empId: '9001',
    firstName: 'Alex',
    middleName: 'R',
    lastName: 'Morgan',
  });

 
  expect(response.status()).toBe(200);
});