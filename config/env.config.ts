import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '../.env') });


const currentEnv = (process.env.ENV || 'dev').toLowerCase();

let selectedEnv;

if (currentEnv === 'test') {
  selectedEnv = {
    baseUrl: process.env.TEST_BASE_URL || 'https://test-app.example.com',
    apiUrl: process.env.TEST_API_URL || 'https://test-api.example.com',
   
  };
} else {
 
  selectedEnv = {
    baseUrl: process.env.DEV_BASE_URL || 'https://dev-app.example.com',
    apiUrl: process.env.DEV_API_URL || 'https://dev-api.example.com',
    
  };
}

export const Config = {
  envName: currentEnv,
  baseUrl: selectedEnv.baseUrl,
  apiUrl: selectedEnv.apiUrl,
  username: process.env.ADMIN_USERNAME || 'Admin',
  password: process.env.ADMIN_PASSWORD || 'admin123',
 
};
