/**
 * Created by abbeymart on 2017-08-04
 */

const test = {
    servicePath  : 'asset',
        serviceName  : 'Asset Management',
    isActive     : true,
    packageGroups: [
    {
        servicePath: 'assetPlan',
        serviceName: 'Plan & Acquire',
        isActive   : true,
        packages   : [
            {
                servicePath: 'assetNeed',
                serviceName: 'Need Analysis',
                isActive   : true,
            },
            {
                servicePath: 'assetCost',
                serviceName: 'Costing',
                isActive   : true,
            },
            {
                servicePath: 'assetAcquire',
                serviceName: 'Acquisition (Build or Buy)',
                isActive   : true,
            },
        ]
    },
    {
        servicePath: 'assetInfo',
        serviceName: 'Information',
        isActive   : true,
        packages   : [
            {
                servicePath: 'assetProfile',
                serviceName: 'Asset Profile',
                isActive   : true,
            },
            {
                servicePath: 'assetStorage',
                serviceName: 'Inventory',
                isActive   : true,
            },
            {
                servicePath: 'assetMaintain',
                serviceName: 'Maintenance',
                isActive   : true,
            },
            {
                servicePath: 'assetValue',
                serviceName: 'Valuation',
                isActive   : true,
            },
            {
                servicePath: 'assetDispose',
                serviceName: 'Asset Disposal',
                isActive   : true,
            },
        ]
    },
    {
        servicePath: 'assetMaintain',
        serviceName: 'Maintenance',
        isActive   : true,
        packages   : [
            {
                servicePath: 'mtSchedule',
                serviceName: 'Schedule',
                isActive   : true,
            },
            {
                servicePath: 'mtTrack',
                serviceName: 'Maintenance Tracking',
                isActive   : true,
            },
            {
                servicePath: 'mtAssess',
                serviceName: 'Assessment',
                isActive   : true,
            },
        ]
    },
]
};