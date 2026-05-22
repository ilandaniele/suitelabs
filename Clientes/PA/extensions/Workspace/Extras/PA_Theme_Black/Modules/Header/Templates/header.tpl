<div class="section-to-be-fixed-on-scroll">
    <div class="header-message" data-view="Message.Placeholder"></div>
    <div class="home-cms-page-banner-top home-banner-top-message" data-cms-area="home_message_top" data-cms-area-filters="global"></div>
    <div {{#if isRibbonActive}}class="cls-placeholder dod-ribbon-container"{{/if}} data-view="DealOfTheDay.Ribbon"></div>
</div>
<div class="header-main-wrapper">
	<nav class="header-main-nav sc-header-main-nav">
		<div id="banner-header-top" class="content-banner banner-header-top" data-cms-area="header_banner_top" data-cms-area-filters="global"></div>
		{{#if isNotDesktopDevice}}
            <div class="header-content mobile tablet">
                <div class="mobile-header-container">
                    <div class="header-sidebar-toggle-wrapper">
                        <a href="#" class="header-sidebar-toggle" data-action="header-sidebar-show">
                            <img class="header-sidebar-toggle-icon" src="{{getThemeAssetsPath 'img/hamburger.svg'}}">
                            </a>
                    </div>
                    <div class="mobile-logo-contact-container">
                        <div class="header-logo-wrapper cls-placeholder">
                            <div data-view="Header.Logo" class="cls-placeholder"></div>
                        </div>
                        <div class="header-contact-info">
                            <div class="header-contact-info-list">
                                <ul class="header-contact-info-ul">
                                    <!-- <li class="header-cage-code">Cage Code: 87A80</li> -->
                                    <!-- <li class="header-gsa-contract-code">GSA Contract # GS-07F-9557S</li> -->
                                    <!-- <li><i class="header-email-icon"></i> <a href="mailto:info@primaryarms.com">{{translate 'Email Us'}}</a></li>
                                    <li><i class="fa fa-phone"></i><a href="tel: 17133449600">713-344-9600</a></li> -->
                                    {{#if paActiveSalesEnable}}
                                        <li class="clickable-promotion"><i class="icon-promotion"></i><a href="{{promotionPageUrl}}">{{paActiveSalesHeaderCaption}}</a></li>   
                                    {{/if}}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="header-right-menu">
                        <div class="header-menu-profile cls-placeholder" data-view="Header.Profile" > </div>
                        {{#if showLanguagesOrCurrencies}}
                            <div class="header-menu-settings"> <a href="#" class="header-menu-settings-link" data-toggle="dropdown"
                                    title="{{translate 'Settings'}}"> <i class="header-menu-settings-icon"></i> <i class="header-menu-settings-carret"></i>
                                </a>
                                <div class="header-menu-settings-dropdown">
                                    <h5 class="header-menu-settings-dropdown-title">{{translate 'Site Settings'}}</h5>
                                    {{#if showLanguages}}
                                    <div data-view="Global.HostSelector"></div>
                                    {{/if}}
                                    {{#if showCurrencies}}
                                    <div data-view="Global.CurrencySelector"></div>
                                    {{/if}}
                                </div>
                            </div>
                        {{/if}}
                        <div class="header-menu-searchmobile">
                            <button class="header-menu-searchmobile-link" data-action="show-sitesearch" title="{{translate 'Search'}}">
                                <i class="header-menu-searchmobile-icon"></i> </button>
                        </div>
                        <div class="header-menu-cart">
                            <div class="header-menu-cart-dropdown">
                                <div data-view="Header.MiniCart" class="cls-placeholder"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-site-search {{#if allowFullscreenSearchMobile}}fullscreen{{else}}nofullscreen{{/if}}" data-view="SiteSearch" data-tablet-template="sc_typeahead_site_search" data-phone-template="sc_typeahead_site_search" data-type="SiteSearch"></div>        
            </div>
		{{else}}
            <div class="header-content flex-center">

                <div class="header-logo-wrapper">
                    <div data-view="Header.Logo" class="cls-placeholder"></div>
                    <p class="header-gsa-cag-code-wrapper">
                        <!-- <span class="header-cage-code">Cage Code: 87A80</span> -->
                        <!-- <span class="header-gsa-contract-code">GSA Contract # GS-07F-9557S</span> -->
                    </p>
                </div>
                <div class="header-search-wrapper">
                    <div class="row">
                        <div class="col-sm-12">   
                            <div class="top-header-wrapper flex-center">
                                <div class="header-contact-info" >
                                    <div class="header-contact-info-list">
                                        <ul class="header-contact-info-ul">
                                            <!-- <li><i class="header-email-icon"></i> <a href="mailto:info@primaryarms.com">info@primaryarms.com</a></li>
                                            <li><i class="fa fa-phone"></i><a href="tel: 17133449600">713-344-9600</a></li>   -->
                                            {{!-- <li><b>Cage Code: 87A80</b></li> --}}
                                            {{#if paActiveSalesEnable}}
                                                <li class="clickable-promotion"><i class="icon-promotion"></i><a href="{{promotionPageUrl}}">{{paActiveSalesHeaderCaption}}</a></li>                          
                                            {{/if}}
                                        </ul>
                                    </div>
                                </div>
                                <div class="header-right-menu" >
                                    <div class="middle-header-wrapper">                                                       
                                        <div class="header-middle-right-wrapper">
                                            <div class="header-site-search fullscreen cls-placeholder" data-view="SiteSearch" data-type="SiteSearch"></div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="header-menu-profile cls-placeholder" data-view="Header.Profile"> </div>
                                    {{#if showLanguagesOrCurrencies}}
                                    <div class="header-menu-settings"> <a href="#" class="header-menu-settings-link" data-toggle="dropdown"
                                            title="{{translate 'Settings'}}"> <i class="header-menu-settings-icon"></i> <i class="header-menu-settings-carret"></i>
                                        </a>
                                        <div class="header-menu-settings-dropdown">
                                            <h5 class="header-menu-settings-dropdown-title">{{translate 'Site Settings'}}</h5>
                                            {{#if showLanguages}}
                                            <div data-view="Global.HostSelector"></div>
                                            {{/if}}
                                            {{#if showCurrencies}}
                                            <div data-view="Global.CurrencySelector"></div>
                                            {{/if}}
                                        </div>
                                    </div>
                                    {{/if}}                                    
                                </div>
                            </div> 
                        </div>                
                    </div>
                    <!-- <div class="row">
                        <div class="col-sm-12">
                            <div class="middle-header-wrapper">                                                       
                                <div class="header-middle-right-wrapper">
                                    <div class="header-site-search fullscreen cls-placeholder" data-view="SiteSearch" data-type="SiteSearch"></div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>                
                    </div> -->
                </div>        
                <div class="header-cart-wrapper">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="header-menu-searchmobile">
                                <button class="header-menu-searchmobile-link" data-action="show-sitesearch" title="{{translate 'Search'}}">
                                    <i class="header-menu-searchmobile-icon"></i> </button>
                            </div>
                            <div class="header-menu-cart">
                                <div class="header-menu-cart-dropdown">
                                    <div data-view="Header.MiniCart" class="cls-placeholder"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="col-sm-12">
                            <div id="header-email-sign-up-button">
                                <a href="/email-sign-up" data-touchpoint="home" data-hashtag="#/email-sign-up">
                                    <i class="fa fa-envelope"></i> Email Sign Up
                                </a>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
		{{/if}}
		<div id="banner-header-bottom" class="content-banner banner-header-bottom" data-cms-area="header_banner_bottom" data-cms-area-filters="global"></div>
	</nav>

</div>

<div class="header-sidebar-overlay" data-action="header-sidebar-hide"></div>
<div class="header-secondary-wrapper" data-view="Header.Menu" data-phone-template="header_sidebar" data-tablet-template="header_sidebar"></div>

<!-- Modal -->
<div class="modal fade" id="trackingModal" tabindex="-1" role="dialog" aria-labelledby="trackingModalLabel" aria-hidden="true"
    data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <div class="row">
                    <div class="col-sm-6">
                        <p class="modal-title" id="trackingModalLabel">Find My Order</p>
                    </div>
                    <div class="col-sm-6" style="text-align: right;">
                        <button type="button" class="global-views-modal-content-header-close" id="tracking-close"
                            data-dismiss="modal" aria-hidden="true" aria-label="Close"> × </button>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div id="tracking-message" class="col-xs-12"></div>
                    <div id="tracking-form" class="form-group">
                        <div class="col-xs-12 col-sm-6">
                            <label class="header-tracking-label" for="sales-order">Sales Order:</label>
                            <input type="text" class="header-tracking-input" id="sales-order" name="sales-order">
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <label class="header-tracking-label" for="zip-code">Billing Zip Code:</label>
                            <input type="text" class="header-tracking-input" id="zip-code" name="zip-code">
                        </div>
                        <div class="col-xs-12">
                            <button data-action="get-tracking" class="get-tracking-send-button" id="get-tracking-send-button">Send</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer"> </div>
        </div>
    </div>
</div>
{{!----
Use the following context variables when customizing this template:

	profileModel (Object)
	profileModel.addresses (Array)
	profileModel.addresses.0 (Array)
	profileModel.creditcards (Array)
	profileModel.firstname (String)
	profileModel.paymentterms (undefined)
	profileModel.phoneinfo (undefined)
	profileModel.middlename (String)
	profileModel.vatregistration (undefined)
	profileModel.creditholdoverride (undefined)
	profileModel.lastname (String)
	profileModel.internalid (String)
	profileModel.addressbook (undefined)
	profileModel.campaignsubscriptions (Array)
	profileModel.isperson (undefined)
	profileModel.balance (undefined)
	profileModel.companyname (undefined)
	profileModel.name (undefined)
	profileModel.emailsubscribe (String)
	profileModel.creditlimit (undefined)
	profileModel.email (String)
	profileModel.isLoggedIn (String)
	profileModel.isRecognized (String)
	profileModel.isGuest (String)
	profileModel.priceLevel (String)
	profileModel.subsidiary (String)
	profileModel.language (String)
	profileModel.currency (Object)
	profileModel.currency.internalid (String)
	profileModel.currency.symbol (String)
	profileModel.currency.currencyname (String)
	profileModel.currency.code (String)
	profileModel.currency.precision (Number)
	showLanguages (Boolean)
	showCurrencies (Boolean)
	showLanguagesOrCurrencies (Boolean)
	showLanguagesAndCurrencies (Boolean)
	isHomeTouchpoint (Boolean)
	cartTouchPoint (String)

----}}