{{#unless deleted}}
    <a href="/wishlist" class="product-list-details-button-back">
        <i class="product-list-details-button-back-icon"></i>
        {{translate 'Go to Product Lists'}}
    </a>
    <div data-confirm-message class="product-list-details-confirm-message"></div>
    <section class="product-list-details">
        <header class="product-list-details-header">
            <h2 class="product-list-details-title">
                {{#if isTypePredefined}}aaaa{{translate name}}{{else}}bbbb{{name}}{{/if}}
                {{#if hasItems}}
                <span class="product-list-details-count">({{itemsLength}} {{#if hasOneItem}}{{translate 'Product'}}{{else}}{{translate 'Products'}}{{/if}})</span>
                {{/if}}
            </h2>
            <div data-view="ListHeader" style="{{#unless showListHeader}}display:none{{/unless}}"></div>
        </header>
        {{#if hasItems}}
            <table class="product-list-details-list-items {{#if isChecked}}active{{/if}}" data-type="product-list-items">
                <tbody data-view="ProductList.DynamicDisplay">
                </tbody>
            </table>
        {{else}}
            <div class="product-list-details-no-items">
                <h5>{{translate 'You do not have any Favorites listed yet. Please explore the website or search for an item you would like to add..'}}</h5>
            </div>
        {{/if}}


    </section>
{{/unless}}
{{#if deleted}}
    <h1 class="product-list-main-title"> {{translate 'Favorites have been deleted'}}</h1>
{{/if}}


{{!----
Use the following context variables when customizing this template:

	showListHeader (Boolean)
	isTypePredefined (Boolean)
	name (String)
	hasItems (Boolean)
	itemsLength (Number)
	hasOneItem (Boolean)

----}}
