import { test as base, expect as baseExpect} from '@playwright/test';
import { UIUtil } from '../utils/ui.utils';
import { WaitsUtil } from '../utils/waits.utils';
import { APIUtil } from '../utils/api.utils';
import { POManager } from '../pages/po-manager';

type FrameworkFixtures = {
  uiUtil: UIUtil;
  apiUtil: APIUtil;
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
  apiUtil: async ({ request }, use) => {
    await use(new APIUtil(request));
  },
  poManager: async ({ uiUtil, waitsUtil }, use) => {
    await use(new POManager(uiUtil, waitsUtil));
  },
});

export const expect = baseExpect;