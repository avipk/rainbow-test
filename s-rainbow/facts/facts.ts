import type {FactSupplier, JsonValue} from '../types';

function randomValueTimeout(values: JsonValue[], timeout: number) {
    return (() => {
        const p = new Promise<JsonValue>(function(resolve) {        
            const valueIndex = Math.floor(Math.random() * values.length);
            const selectedValue = values[valueIndex];

            setTimeout(() => resolve(selectedValue), timeout);
        });

        return p;
    });
}

const facts: [string, FactSupplier][] = [
    ['platform', randomValueTimeout(['mobile', 'desktop'], 2000)],
    ['pageType', randomValueTimeout(['Section', 'StandardArticle', 'OpinionArticle'], 1000)],
    ['pagePaywallLevel', () => 'pagePaywallLevel'],
    ['referrerUrl', () => window.document.referrer],
    ['authors', () => 'authors'],
    ['purchaseVisit', randomValueTimeout([0, 2, 6], 1000)],
    ['marketingToolsStats', () => 'marketingToolsStats'],
    ['sessionDetails', () => 'sessionDetails'],
    ['personalizedCampaigns', () => 'personalizedCampaigns'],
    ['testGroups', () => 'testGroups']
];

export default facts;