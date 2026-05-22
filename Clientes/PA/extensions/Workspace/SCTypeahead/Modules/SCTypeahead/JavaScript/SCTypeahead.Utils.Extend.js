define('SCTypeahead.Utils.Extend', [
    'Backbone',
    'jQuery',
    'Utils',
    'underscore'
], function(
    Backbone,
    jQuery,
    Utils,
    _
) {
    'use strict';

    function setRecentlySearchKeywordOnCookie(recentlySearchKeyword, action, keywordLimit, expiry)
    {

        recentlySearchKeyword = jQuery.trim(recentlySearchKeyword);

        var recentlySearchKeywordsArray = getRecentlySearchKeywordFromCookie(),
        isRecentlySearchDataIsArray = Array.isArray(recentlySearchKeywordsArray);

        if(isRecentlySearchDataIsArray && !!recentlySearchKeyword)
        {
            var lowerCaseRecentlySearchKeywordsArray = _.map(recentlySearchKeywordsArray, function(keyword){ return keyword.toLowerCase(); }),
                lowerCaseRecentlySearchKeyword = recentlySearchKeyword.toLowerCase(),
                recentlySearchKeywordIndex = lowerCaseRecentlySearchKeywordsArray.indexOf(lowerCaseRecentlySearchKeyword);

            if(recentlySearchKeywordIndex > -1)
            {
                recentlySearchKeywordsArray.splice(recentlySearchKeywordIndex, 1);
                if(action === 'add') recentlySearchKeywordsArray.unshift(recentlySearchKeyword);
            }
            else 
            {
                if(recentlySearchKeywordsArray.length < keywordLimit)
                {
                    recentlySearchKeywordsArray.unshift(recentlySearchKeyword);
                }
                else
                {
                    recentlySearchKeywordsArray.pop();
                    recentlySearchKeywordsArray.unshift(recentlySearchKeyword);
                }
            }
        }

        jQuery.cookie('recentlySearchKeywords',  recentlySearchKeywordsArray, { path: '/', expires: expiry });
    }

    function getRecentlySearchKeywordFromCookie()
    {
        var recentlySearchKeywordsArray = jQuery.cookie('recentlySearchKeywords') || [];
        return recentlySearchKeywordsArray;
    }

    function highlightKeywords(text, keywords) {
        text = text || '';
        text = _.escape(text);
        if (!keywords || !keywords.length) {
            return text;
        }
    
        for( var i=0; i<keywords.length; i++)
        {
            var keyword = keywords[i].trim().replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    
            text = text.replace(new RegExp('(' + keyword + ')', 'ig'), function($1, match) {
                return '<strong>' + match + '</strong>';
            });
        }
    
        return text;
    }

    function setSearchResultUrlCookie(url)
    {
        try 
        {
          url = JSON.stringify(url);
          jQuery.cookie('searchResultUrl',  url, { path: '/', expires: 365 });  
        } 
        catch (ex) 
        {
            console.log('exception in setSearchResultUrlCookie : ',ex);
        }

    }

    function getSearchResultUrlCookie()
    {
        try 
        {
          var url = jQuery.cookie('searchResultUrl') || '';
          return url;
        } 
        catch (ex) 
        {
          console.log('exception in getSearchResultUrlCookie : ',ex);
        }            
    }

    function trackSearchResultUrl()
    {
        try 
        {
            var searchResultUrl = getSearchResultUrlCookie(),
                fargmentOfUrl = JSON.stringify(Backbone.history.fragment);

            if(searchResultUrl.charAt(1) === '/')
            {
                searchResultUrl = searchResultUrl.replace("/","");
            }

            if(searchResultUrl !== fargmentOfUrl)
            {
                setSearchResultUrlCookie('');
            }
        } 
        catch (ex) 
        {
            console.warn('exception in trackSearchResultUrl : ',ex);
        }  
    }

    function isiOS() 
    {
        return [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }

    return _.extend(Utils,{
        highlightKeywords: highlightKeywords,
        setSearchResultUrlCookie: setSearchResultUrlCookie,
        getSearchResultUrlCookie: getSearchResultUrlCookie,
        trackSearchResultUrl: trackSearchResultUrl,
        setRecentlySearchKeywordOnCookie: setRecentlySearchKeywordOnCookie,
        getRecentlySearchKeywordFromCookie: getRecentlySearchKeywordFromCookie,
        isiOS: isiOS
    });
});
