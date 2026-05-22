<div class="product-lists-single product-details-full-actions-addtowishlist">
    <button class="product-list-control-single-button-wishlist" data-type="add-product-to-single-list" data-action="add-product-to-single-list" type="button" >
        {{#if isProductAlreadyAdded}}
            <i class="pdp-favorites-unselected-icon item-added"></i>
            <span>{{translate 'Remove from Favorites'}}</span>
        {{else}}
            <i class="pdp-favorites-unselected-icon"></i>
            <span>{{translate 'Add to Favorites'}}</span>
        {{/if}}
    </button>
</div>