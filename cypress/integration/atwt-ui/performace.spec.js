const constants = require('../../support/constants');

describe('Performance Test with Lighthouse and Pa11y', () => {
    context('With Lighthouse', () => {
        it('Lighthouse test with default settings', () => {
            cy.visit('https://github.com/trongtuyen96');
            cy.lighthouse();
        })

        it('Lighthouse with custom threshold', () => {
            cy.visit('https://github.com/trongtuyen96');
            const customThresholds = {
                performance: 50,
                accessibility: 50,
                seo: 70,
                'first-contentful-paint': 2000,
                'largest-contentful-paint': 3000,
                'cumulative-layout-shift': 0.1,
                'total-blocking-time': 500,
                interactive: 2000,
                pwa: 50,
            };

            const desktopConfig = {
                formFactor: 'desktop',
                screenEmulation: constants.screenEmulationMetrics.desktop
            };

            cy.lighthouse(customThresholds, desktopConfig);
        })
    })

    context('With Pa11y', () => {
        it('Perform test', () => {
            cy.visit('https://github.com/trongtuyen96');
            cy.pa11y();
        })
    })
})