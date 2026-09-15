import type { APIRequestContext, APIResponse } from '@playwright/test';
import { Config } from '../config/env.config';
import { testData } from '../testdata';


export class APIUtil {
  private sessionCookie = '';

  constructor(private request: APIRequestContext) {}

  async login(): Promise<void> {
    const baseUrl = Config.baseUrl;

    
    const loginPage = await this.request.get(`${baseUrl}/index.php/auth/login`);
    const htmlText = await loginPage.text();
    const initialCookie = loginPage.headers()['set-cookie'] || '';

  
    const tokenPart = htmlText.split(':token="&quot;')[1] || htmlText.split(':token="')[1];
    
    if (!tokenPart) {
      throw new Error('Could not find CSRF token on login page');
    }
    
    const csrfToken = tokenPart.split('&quot;')[0].split('"')[0];

   
    const loginResponse = await this.request.post(`${baseUrl}/index.php/auth/validate`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': initialCookie,
      },
      form: {
        _token: csrfToken,
        username: testData.admin.userName,
        password: testData.admin.password,
      },
      maxRedirects: 0,
    });

    
    const validateCookie = loginResponse.headers()['set-cookie'] || '';
    this.sessionCookie = validateCookie ? `${initialCookie}; ${validateCookie}` : initialCookie;
  }



  private async sendRequest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    options?: { data?: object; params?: Record<string, string | number> }
  ): Promise<APIResponse> {
    const url = `${Config.apiUrl}${endpoint}`;

    return await this.request.fetch(url, {
      method,
      data: options?.data,
      params: options?.params,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': this.sessionCookie,
      },
    });
  }


  async get(endpoint: string, params?: Record<string, string | number>): Promise<APIResponse> {
    return await this.sendRequest('GET', endpoint, { params });
  }

  async post(endpoint: string, data: object): Promise<APIResponse> {
    return await this.sendRequest('POST', endpoint, { data });
  }

  async put(endpoint: string, data: object): Promise<APIResponse> {
    return await this.sendRequest('PUT', endpoint, { data });
  }

  async delete(endpoint: string, data?: object): Promise<APIResponse> {
    return await this.sendRequest('DELETE', endpoint, { data });
  }

  
  async createEmployee(employee: { empId: string; firstName: string; middleName?: string; lastName: string }): Promise<APIResponse> {
    return await this.post('/pim/employees', {
      empId: employee.empId,
      firstName: employee.firstName,
      middleName: employee.middleName || '',
      lastName: employee.lastName,
    });
  }

  
  async getEmployeeById(empId: string) {
    const response = await this.get('/pim/employees', { model: 'detailed', empId });

    if (!response.ok()) {
      return null;
    }

    const result = await response.json();
    return result.data?.[0] || null;
  }
}