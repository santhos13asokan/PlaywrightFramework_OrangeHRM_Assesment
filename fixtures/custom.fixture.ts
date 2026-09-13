import { test as base } from '@playwright/test';
import { UIUtil } from '../utils/ui.utils';
import { WaitsUtil } from '../utils/waits.utils';
import { POManager } from '../pages/po-manager';

type FrameworkFixtures = {
  uiUtil: UIUtil;
  
  waitsUtil: WaitsUtil;
  poManager: POManager;
};

export const test = base.extend<FrameworkFixtures>({
  uiUtil: async ({ page }, use) => {
    await use(new UIUtil(page));
  },
  waitsUtil: async ({ page }, use) => {
    await use(new WaitsUtil(page));
  },
  poManager: async ({ uiUtil, waitsUtil }, use) => {
    await use(new POManager(uiUtil, waitsUtil));
  },
});