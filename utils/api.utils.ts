import type { APIRequestContext, APIResponse } from '@playwright/test';
import * as testData from '../testdata/test.json';

export interface EmployeePayload {
  empId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}

export class APIUtil {
  private baseUrl: string;

  constructor(private request: APIRequestContext) {
    this.baseUrl = testData.Api_url;
  }

  async get(endpoint: string, options?: { params?: Record<string, string | number | boolean>; headers?: Record<string, string> }): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}${endpoint}`, {
      params: options?.params,
      headers: options?.headers,
    });
  }

  async post(endpoint: string, payload: object, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl}${endpoint}`, {
      data: payload,
      headers: options?.headers,
    });
  }

  async put(endpoint: string, payload: object, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    return await this.request.put(`${this.baseUrl}${endpoint}`, {
      data: payload,
      headers: options?.headers,
    });
  }

  async delete(endpoint: string, payload?: object): Promise<APIResponse> {
    return await this.request.delete(`${this.baseUrl}${endpoint}`, {
      data: payload,
    });
  }

 async getEmployeeById(empId: string) {
  const response = await this.get('/web/index.php/api/v2/pim/employees', {
    params: { model: 'detailed', empId: empId },
  });

  const body = await response.json();
  return body.data?.[0] || null;
}

  async createEmployee(employee: EmployeePayload) {
    return await this.post('/web/index.php/api/v2/pim/employees', {
      empId: employee.empId,
      firstName: employee.firstName,
      middleName: employee.middleName || '',
      lastName: employee.lastName,
    });
  }
}