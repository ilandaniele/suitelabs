<div class="header-menu-favorites">
    <a class="header-menu-favorites-button dropdown-toggle {{#if showLines}}header-mini-cart-menu-cart-link-enabled{{/if}}" role="button" id="header-menu-favorites-dropdown" data-type="mini-favorites" href="#" data-touchpoint="customercenter" data-hashtag="{{url}}" title="{{translate 'Favorites'}}">
        <i class="pdp-favorites-unselected-icon" data-toggle="tooltip"></i>
        <span class="header-mini-cart-menu-cart-legend">
            {{#if isLoading}}
                <span class="header-mini-cart-summary-cart-ellipsis"></span>
            {{else}}
                {{translate '$(0) ' ItemsCount}}
            {{/if}}
        </span>
    </a>
    <div class="dropdown-menu header-menu-favorites-dropdown" aria-labelledby="header-menu-favorites-dropdown">
        {{#if showLines}}
            <h4>{{translate 'Favorites'}}</h4>
            <div data-view="Header.MiniFavoritesItemCell" class="header-mini-cart-container"></div>
            <div class="header-mini-cart-subtotal">
                <div class="header-mini-cart-subtotal-items">
                    {{translate '$(0) items' ItemsCount}}
                </div>
                {{#if showCost}}
                    <div class="header-mini-cart-subtotal-amount">
                        {{translate 'Total Cost: $(0)' totalCost}}
                    </div>
                {{/if}}
            </div>
            <div class="header-mini-cart-buttons">
                <div class="header-mini-cart-buttons-right">
                    <a href="#" class="header-mini-cart-button-checkout" data-touchpoint="customercenter" data-hashtag="#/favoriteslist/{{id}}">
                        {{translate 'View Favorites'}}
                    </a>
                </div>
            </div>
        {{else}}
            <div class="header-mini-cart-empty">
                <a>
                    {{#if isLoading}}
                        {{translate 'Your Favorites are loading'}}
                    {{else}}
                        {{translate 'You have no Favorites'}}
                    {{/if}}
                </a>
            </div>
        {{/if}}
    </div>
</div>

