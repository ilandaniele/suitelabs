<div class="requestquote-wizard-module-items">
    {{#if showTitle}}
        <h3 class="requestquote-wizard-module-items-title">
            {{title}}
        </h3>
    {{/if}}

    {{#if hasItems}}
        <div data-type="alert-placeholder-header"></div>
        <button class="quote-wizard-actions-button-addtocart" data-action="add-items-to-cart" {{#unless
                isAtLeastOneItemChecked}} disabled {{/unless}}>
            {{translate 'Add Items to Cart'}}
        </button>
        <button class="quote-wizard-actions-button-download" {{#unless allowShare}} disabled {{/unless}}>
            <a href="{{pdfUrl}}" target="_blank" data-action="print">
                <i class="print-icon" data-toggle="tooltip" title="{{translate 'Download Project'}}"></i>
            </a>
        </button>

        <table class="requestquote-wizard-module-items-table">
            {{#if showHeaders}}
                <thead class="requestquote-wizard-module-items-header" item-id="{{itemId}}" data-id="{{itemId}}">
                {{#if showSelectAll}}
                    <th class="list-header-view-select-all">
                        <label class="list-header-view-select-all-label" for="select-all">
                            {{#if unselectedLength}}
                                <input type="checkbox" name="select-all" id="select-all"
                                       data-action="select-all">{{translate 'Select All ($(0))' collectionLength}}
                            {{else}}
                                <input type="checkbox" name="select-all" id="select-all" data-action="unselect-all"
                                       checked>{{translate 'Unselect All ($(0))' collectionLength}}
                            {{/if}}
                        </label>
                    </th>
                {{/if}}
                <th class="requestquote-wizard-module-items-header-image" name="item-image">
                    {{translate 'Item'}}
                </th>
                <th class="requestquote-wizard-module-items-header-totalprice" name="item-totalprice">
                    <!-- {{translate 'List Price'}} -->
                </th>
                <th class="requestquote-wizard-module-items-header-quantity" name="item-quantity">
                    {{translate 'Quantity'}}
                </th>
                <th class="requestquote-wizard-module-items-header-actions" name="item-actions">
                    <!-- {{translate 'Quantity'}} -->
                </th>
                </thead>
            {{/if}}
            <tbody data-view="Items.Collection" data-generalClass="requestquote-wizard-module-items-item"></tbody>
        </table>
        <h3 class="item-list-total">{{translate 'Total: '}}{{totalPrice}}</h3>
    {{/if}}
</div>



{{!----
Use the following context variables when customizing this template:

	showTitle (Boolean)
	title (String)
	showHeaders (Boolean)
	hasItems (Boolean)

----}}
