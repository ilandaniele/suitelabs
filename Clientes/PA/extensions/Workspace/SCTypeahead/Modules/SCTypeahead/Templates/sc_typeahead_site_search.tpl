{{#if allowFullscreenSearchMobile}}
    <div class="site-search {{extraClass}}" data-type="site-search"> 
        <div class="site-search-content">
            
            <div class="site-search-content-input-sample-wrapper" >
                <div class="site-search-content-input {{extraClass}}">
                    <div class="itemssearcher-input-sample-wrapper" data-type="sc-pusher" data-target="website-search-pushable">
                        <input class="itemssearcher-input itemssearcher-input-sample typeahead" placeholder="What are you looking for today?" type="text" autocomplete="off" maxlength="{{maxLength}}" />
                    </div>
                    <i class="site-search-input-icon"></i>
                    <a class="site-search-input-reset" data-type="search-reset"><i class="site-search-input-reset-icon"></i></a>
                </div>
                <button class="site-search-button-submit {{extraClass}}" type="submit">{{translate 'Go'}}</button>     
            </div>  
            
            
            <div class="sc-site-search-nav-pusher-wrapper" style="display: none;">
                <div data-action="pushable" data-id="website-search-pushable">
                    <form class="site-search-content-form" method="GET" action="/search" data-action="search">
                        <div class="sc-site-search-nav">
                            <div class="site-search-content-input">
                                <div data-view="ItemsSeacher"></div>
                                <i class="site-search-input-icon"></i>
                                <a class="site-search-input-reset" data-type="search-reset"><i class="site-search-input-reset-icon"></i></a>
                            </div>
                            <button class="site-search-button-submit" type="submit">{{translate 'Go'}}</button>
                            <div class="clearfix"></div>
                            <div data-view="Trending.Recently.Searches"></div>
                        </div>                    
                    </form>
                </div>
            </div>
        </div>
    </div>
{{else}}
    <div class="site-search {{extraClass}}" data-type="site-search"> 
        <div class="site-search-content">
            <form class="site-search-content-form" method="GET" action="/search" data-action="search">
                <div class="site-search-content-input">
                    <div data-view="ItemsSeacher"></div>
                    <i class="site-search-input-icon"></i>
                    <a class="site-search-input-reset" data-type="search-reset"><i class="site-search-input-reset-icon"></i></a>
                </div>
                <button class="site-search-button-submit" type="submit">{{translate 'Go'}}</button>
                <div class="clearfix"></div>                
            </form>            
        </div>
        <div data-view="Trending.Recently.Searches"></div>
    </div>
{{/if}}

{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context variables in the Console of your browser's developer tools.

----}}
