{{#if isActive}}
    <div class="additional-links-wrapper start">
        <a class="header-menu-agencies-button" id="header-menu-agencies-button" href="/agencies-dealers" data-action="navigateToagenciesPage" data-touchpoint="home" data-hashtag="#/agencies-dealers"> {{translate 'Agencies & Dealers'}}</a>
    </div>
    <div class="deal-ribbon-wrapper {{#if showDealCounter}}active{{/if}} {{#if showScheduledBanner}}active-banner{{/if}}" style="background:{{!dealRibbonBackgroundColor}}">
        <div class="deal-counter-box">
            <div class="deal-click-here-box {{#if inBetweenDeal}}active{{/if}}">
                <a href="{{sale_link}}" data-touchpoint="home" data-hashtag="#{{sale_link}}">{{translate 'CLICK HERE'}}</a>
            </div>
            <div class="deal-sale-name-label">
                <p>{{{sale_name}}}</p>
                <p>
                    {{#if beginingOfDeal}}
                        {{translate 'starts in'}}
                    {{/if}}
                    {{#if inBetweenDeal}}
                        {{translate 'ends in'}}
                    {{/if}}
                    {{#if endOfDeal}}
                        {{translate 'ended'}}
                    {{/if}}
                </p>
            </div>
            <div id="deal-mobile-divider"></div>
            <div class="deal-show-in-tab-only">
                <p>
                    {{#if beginingOfDeal}}
                        {{translate 'starts in'}}
                    {{/if}}
                    {{#if inBetweenDeal}}
                        {{translate 'ends in'}}
                    {{/if}}
                    {{#if endOfDeal}}
                        {{translate 'ended'}}
                    {{/if}}
                </p>
            </div>
            <div class="deal-header-clock" data-view="deal-clock"></div>
        </div>
        <div class="deal-shipping-box banner">
                <span class="deal-shipping-box-message">{{{ScheduledBannerMessage}}}</span>
        </div>
       {{#unless hideFreeshippingBanner}}
        <div class="deal-shipping-box">
            {{#if shipping_message_link}}
                <a class="deal-shipping-box-message" href="{{shipping_message_link}}" data-touchpoint="home" data-hashtag="#{{shipping_message_link}}">{{freeshipping_msg}}</a>
            {{else}}
                <span class="deal-shipping-box-message">{{freeshipping_msg}}</span>
            {{/if}}
        </div>
        {{/unless}}
        {{#if isShowCloseButton}}
            <a class="deal-ribbon-close-button" data-action="hide-deal-ribbon">
                <span></span><i class="deal-ribbon-close"></i>
            </a>
        {{/if}}
    </div>
    <div class="additional-links-wrapper end">
        <a href="http://track.primaryarms.com/" target="_blank"> 
            {{translate 'Track Your Order'}} 
        </a>
    </div>
{{/if}}
