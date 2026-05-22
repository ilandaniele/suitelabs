/* eslint-disable consistent-return */
define('MultiAddToCart.Model', [
    'Application',
    'Configuration',
    'SiteSettings.Model',
    'Utils'
], function MultiAddToCartModel(
    Application,
    Configuration,
    SiteSettingsModel,
    Utils
) {
    var Categories;
    function findCategoriesByFullUrl(categories, fullurl) {
        var i;
        var recursiveResult;
        for (i = 0; i < categories.length; i++) {
            if (categories[i] && categories[i].fullurl === fullurl) {
                return categories[i];
            }
            if (categories[i].categories) {
                recursiveResult = findCategoriesByFullUrl(categories[i].categories, fullurl);
                if (recursiveResult) {
                    return recursiveResult;
                }
            }
        }
    }

    function searchCategoryItems(fullurl) {
        var SiteSettings;
        var Environment;
        var ITEM_SEARCH_ENDPOINT;
        var locale;
        var language;
        var country;
        var currency;
        var usePcv;
        var baseUrl;
        var itemSearchEndpointURL;
        var requestHeader;
        var itemSearchResponse;
        var items;
        try {
            SiteSettings = SiteSettingsModel.get();
            Environment = Application.getEnvironment(request);

            ITEM_SEARCH_ENDPOINT = '/api/cacheable/items?';
            locale =
                (Environment.currentLanguage && Environment.currentLanguage.locale) || '';
            language = locale.split('_')[0];
            country = locale.split('_')[1];
            currency =
                Environment && Environment.currentCurrency && Environment.currentCurrency.code;
            usePcv = SiteSettings.isPersonalizedCatalogViewsEnabled ? 'T' : 'F';
            baseUrl = Utils.trim(Configuration.get().cms.baseUrl || '') ||
                (Utils.isHttpsSupported() || Utils.isInCheckout()
                    // eslint-disable-next-line no-useless-escape
                    ? request.getURL().match(/(^https?:\/\/[^\/]+)/i)[0]
                    : 'https://' + Environment.shoppingDomain);
            itemSearchEndpointURL = baseUrl +
                ITEM_SEARCH_ENDPOINT + 'use_pcv=' + usePcv +
                '&n=' + SiteSettings.siteid + '&c=' + Environment.companyId +
                '&currency=' + currency + '&language=' + language +
                '&country=' + country +
                '&fieldset=search&sort=storedisplayname:asc&commercecategoryurl=' + fullurl;
            nlapiLogExecution('DEBUG', 'Calling itemSearchEndpointURL api ', itemSearchEndpointURL);
            requestHeader = {
                Accept: 'application/json',
                Cookie: Utils.replaceNewLineByASpace(request.getHeader('cookie'))
            };
            itemSearchResponse = nlapiRequestURL(itemSearchEndpointURL, null, requestHeader);

            items = JSON.parse(itemSearchResponse.getBody()) && JSON.parse(itemSearchResponse.getBody()).items;
            nlapiLogExecution('DEBUG', 'searchCategoryItems items ', JSON.stringify(items));

            return items;
        } catch (e) {
            nlapiLogExecution('ERROR', 'Calling getCategoryHierarchy error', JSON.stringify(e));
        }
    }

    function getCategoriesItems(categories) {
        var i;
        for (i = 0; i < categories.length; i++) {
            if (categories[i].categories && categories[i].categories.length === 0) {
                categories[i].items = searchCategoryItems(categories[i].fullurl);
            }
            if (categories[i].categories && categories[i].categories.length !== 0) {
                getCategoriesItems(categories[i].categories);
            }
        }
    }

    Categories = {
        getCategoryHierarchy: function getCategoryHierarchy(fullurl) {
            var SiteSettings;
            var Environment;
            var CATEGORY_TREE_ENDPOINT;
            var excludeEmptyCategories;
            var locale;
            var language;
            var country;
            var currency;
            var usePcv;
            var baseUrl;
            var categoriesEndpointURL;
            var requestHeader;
            var enpointResponse;
            var categoryTree;
            var categories;
            try {
                SiteSettings = SiteSettingsModel.get();
                Environment = Application.getEnvironment(request);
                CATEGORY_TREE_ENDPOINT = '/api/navigation/v1/categorynavitems/tree?';

                excludeEmptyCategories = Configuration.get(
                    'categories.excludeEmptyCategories'
                );
                locale =
                    (Environment.currentLanguage && Environment.currentLanguage.locale) || '';
                language = locale.split('_')[0];
                country = locale.split('_')[1];
                currency =
                    Environment && Environment.currentCurrency && Environment.currentCurrency.code;
                usePcv = SiteSettings.isPersonalizedCatalogViewsEnabled ? 'T' : 'F';
                baseUrl = Utils.trim(Configuration.get().cms.baseUrl || '') ||
                    (Utils.isHttpsSupported() || Utils.isInCheckout()
                        // eslint-disable-next-line no-useless-escape
                        ? request.getURL().match(/(^https?:\/\/[^\/]+)/i)[0]
                        : 'https://' + Environment.shoppingDomain);
                categoriesEndpointURL = baseUrl + CATEGORY_TREE_ENDPOINT +
                    'use_pcv=' + usePcv + '&site_id=' + SiteSettings.siteid +
                    '&c=' + Environment.companyId + '&exclude_empty=' + excludeEmptyCategories +
                    '&currency=' + currency + '&language=' + language + '&country=' + country;
                nlapiLogExecution('ERROR', 'Calling categoriesEndpointURL api ', categoriesEndpointURL);

                requestHeader = {
                    Accept: 'application/json',
                    Cookie: Utils.replaceNewLineByASpace(request.getHeader('cookie'))
                };
                enpointResponse = nlapiRequestURL(categoriesEndpointURL, null, requestHeader);
                categoryTree = JSON.parse(enpointResponse.getBody()) && JSON.parse(enpointResponse.getBody()).data;
                categories = findCategoriesByFullUrl(categoryTree, fullurl);

                nlapiLogExecution('ERROR', 'getCategoryHierarchy categories ', JSON.stringify(categories));
                getCategoriesItems(categories.categories);
                nlapiLogExecution('ERROR', 'after getCategoriesItems ', JSON.stringify(categories));

                return categories;
            } catch (e) {
                nlapiLogExecution('ERROR', 'Calling getCategoryHierarchy error', JSON.stringify(e));
            }
        }
    };

    return Categories;
});
