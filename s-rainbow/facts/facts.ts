import type {FactSupplier} from '../types';

const facts: [string, FactSupplier][] = [
    ['platform', () => 'mobile'],
    ['pageType', () => 'pageType'],
    ['pagePaywallLevel', () => 'pagePaywallLevel'],
    ['referrerUrl', () => 'referrerUrl'],
    ['authors', () => 'authors'],
    ['purchaseVisit', () => 'purchaseVisit'],
    ['marketingToolsStats', () => 'marketingToolsStats'],
    ['sessionDetails', () => 'sessionDetails'],
    ['personalizedCampaigns', () => 'personalizedCampaigns'],
    ['testGroups', () => 'testGroups']
];

export default facts;