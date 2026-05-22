<div class="multiaddtocart-full-content>
    <section class="multiaddtocart-main-content">
        <div class="multiaddtocart-main-content-left">
            <div data-view="MultiAddToCart.Display.View"></div>
        </div>
        <div class="multiaddtocart-main-content-center">
            <section class="multip-add-to-cart">
                {{#each categories }}
                <div class="col-md-4  multipaddto-category-{{@index}}">
                    <div class="multipaddto-category">{{name}}</div>
                    {{#each categories}}
                        {{#if items.length}}
                        <section class="multipaddto-subcategory" data-id="{{internalid}}" data-subcategory="{{internalid}}">
                            <div>
                                <h4 class="multipaddto-subcategory-name" data-id="{{internalid}}" data-subcategory="{{internalid}}">{{name}} <i class="category-dropdown-down-icon" data-id="{{internalid}}" data-subcategory="{{internalid}}"></i></h4>   
                            </div>
                            <div class="multipaddto-items" data-section="{{internalid}}">
                                {{#each items}}
                                <div class="multipaddto-item">
                                    <div class="multipaddto-item-name">{{storedisplayname}}</div>
                                    <input class="multipaddto-item-quantity" data-item="{{internalid}}" data-name="{{storedisplayname}}" min="0" max="{{quantityAvailable}}" data-line="{{lineid}}" size="10" type="number" value="0" {{#unless ispurchasable}}disabled{{/unless}}>
                                </div>
                                {{/each}}
                            </div>
                        </section>
                        {{/if}}
                    {{/each}}
                </div>
                {{/each}}  
            </section>
        </div>
        <div class="multiaddtocart-main-content-right">
            <div data-cms-area="multiaddtocart_top_right_cms_area" data-cms-area-filters="path"></div>
        </div>
    </section>
    <section class="multiaddtocart-bottom-content">
        <div data-cms-area="multiaddtocart_bottom_cms_area" data-cms-area-filters="path"></div>
    </section>
</div>