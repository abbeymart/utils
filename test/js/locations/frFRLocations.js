/**
 * Created by abbeymart on 2016-01-03.
 * mconnect solutions information, globally (via namespace) available to all mconnect solutions/packages
 * French-France version
 */
const frFRLocations = [
    {
        locCode : 'CA',
        locName : 'Canada',
        locType : 'Country',
        partOf  : 'NA',
        locDesc : 'Canada land',
        isActive: true,
    },
    {
        locCode : 'ON',
        locName : 'Ontario',
        locType : 'Province',
        partOf  : 'CA',
        locDesc : 'Province of Ontario, Canada',
        isActive: true,
    },
    {
        locCode : 'YYZ',
        locName : 'Toronto',
        locType : 'City',
        partOf  : 'ON',
        locDesc : 'Toronto, Canada',
        isActive: true,
    },
    {
        locCode : 'US',
        locName : 'United States',
        locType : 'Country',
        partOf  : 'NA',
        locDesc : 'United States of America',
        isActive: true,
    },
];

module.exports = frFRLocations;
