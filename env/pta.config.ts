import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    globalSetup: require.resolve('../scr/utils/globalSetup'),
    testDir: '../scr/e2e',
    // testMatch: ['validation-report.spec.ts'],
    //testMatch: ['report.temperature.spec.ts'],
    // testMatch: ['geozone.spec.ts','generate-api.spec.ts', 'subscription.spec.ts', 'history-on-map.spec.ts','geozone.hexa.spec.ts', 'validation-report.spec.ts','journey-report.spec.ts'],
    // testMatch: ['history-on-map.spec.ts','journey-report.spec.ts'],
    // testMatch: ['subscription.spec.ts'],
    testMatch: ['create-material.spec.ts', 'edit-material.spec.ts'],
    // testMatch: ['create-material.spec.ts'],
    // testMatch: ['edit-material.spec.ts'],
    /* Maximum time one test can run for. */
    timeout: 240 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        headless: true,
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,
        timezoneId: 'Europe/Zurich',


        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        baseURL:'https://pta.logifleet360.ch',
        storageState: './session/pta_user_admin_rootgroup.json',
        // storageState: './session/pta_user_admin_subgroup.json',
        // storageState: './session/pta_user_manager_rootgroup.json',
        // storageState: './session/pta_user_manager_subgroup.json',
        video : 'on',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                viewport: {width: 1980, height: 1024}
            },
        },

        // {
        //   name: 'firefox',
        //   use: {
        //     ...devices['Desktop Firefox'],
        //   },
        // },
        //
        // {
        //   name: 'webkit',
        //   use: {
        //     ...devices['Desktop Safari'],
        //   },
        // },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: {
        //     ...devices['Pixel 5'],
        //   },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: {
        //     ...devices['iPhone 12'],
        //   },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: {
        //     channel: 'msedge',
        //   },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: {
        //     channel: 'chrome',
        //   },
        // },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    // outputDir: 'test-results/',

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   port: 3000,
    // },
};

export default config;
