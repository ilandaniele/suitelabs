{{#unless deleted}}
{{! is favorite  }}
    {{#if isFavorite}}
        <div data-confirm-message class="product-list-details-confirm-message"></div>
        <section class="product-list-details">
            <header class="product-list-details-header">
                <h2 class="product-list-details-title">
                    {{#if isTypePredefined}}{{translate name}}{{else}}{{name}}{{/if}}
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
                {{#if isPriceEnabled}}
                    <h3> {{translate 'Total: '}} {{totalPrice}}</h3>
                {{/if}}
            {{else}}
                <div class="product-list-details-no-items">
                    <h5>{{translate 'You do not have any Favorites listed yet. Please explore the website or search for an item you would like to add.'}}</h5>
                </div>
            {{/if}}
        </section>
    {{else}}
        <h2 class="product-list-main-title">{{translate 'Projects'}}</h2>
        <div data-confirm-message class="product-list-details-confirm-message"></div>
        <section class="product-list-details">
            <header class="product-list-details-header">
                <h2 class="product-list-details-title">
                    {{#if isTypePredefined}}{{translate name}}{{else}}{{name}}{{/if}}
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
                {{#if isPriceEnabled}}
                    <h3> {{translate 'Total: '}} {{totalPrice}}</h3>
                {{/if}}
            {{else}}
                <div class="product-list-details-no-items">
                    {{#if isFavorite}}
                        <h5>{{translate 'You do not have any Favorites listed yet. Please explore the website or search for an item you would like to add.'}}</h5>
                    {{else}}
                        <h5>{{translate 'You do not have any items in this Project yet. Please explore the website or search for an item you would like to add.'}}</h5>
                    {{/if}}

                </div>
            {{/if}}
        </section>
    {{/if}}
{{/unless}}
{{#if deleted}}
    {{#if isFavorite}}
        <h1 class="product-list-main-title"> {{translate 'Favorites have been deleted'}}</h1>
    {{else}}
        <h1 class="product-list-main-title"> {{translate 'Project has been deleted'}} </h1>
    {{/if}}
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
