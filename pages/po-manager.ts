import { UIUtil } from '../utils/ui.utils';
import { WaitsUtil } from '../utils/waits.utils';
import { LoginPage } from './loginpage';
import {DashboardPage} from './dashboardpage';
import{ PimPage} from './pimpage';
import { AddEmployeePage } from './addemployeepage';


export class POManager {
  readonly loginPage: LoginPage;
  readonly homePage: DashboardPage;
  readonly pimPage: PimPage;
  readonly addEmployeePage: AddEmployeePage;
 

  constructor(uiUtil: UIUtil, waitsUtil: WaitsUtil) {
    this.loginPage = new LoginPage(uiUtil, waitsUtil);
    this.homePage = new DashboardPage(uiUtil, waitsUtil);
    this.pimPage = new PimPage(uiUtil, waitsUtil);
    this.addEmployeePage = new AddEmployeePage(uiUtil, waitsUtil);
    
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getDashBoardPage(): DashboardPage {
    return this.homePage;
  }
  getPimPage(): PimPage {
    return this.pimPage;
  }

  getAddEmployeePage(): AddEmployeePage {
    return this.addEmployeePage;
  }
 
}