{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="product-list-bulk-actions-button-group">
    {{#unless isFavorite}}
        <a href="{{pdfUrl}}" class="product-list-bulk-actions-button-download" target="_blank" data-action="print"><i class="print-icon" data-toggle="tooltip" title="{{translate 'Download Project'}}"></i></a>

        <!--{{#if isAtLeastOneItemChecked}}
			<a href="{{tearsheetUrl}}" target="_blank" data-action="download-tearsheet"><button class="product-list-bulk-actions-button-download">{{translate 'Download Spec Sheet(s)'}}</button></a>
		{{else}}
			<button class="product-list-bulk-actions-button-download" disabled>{{translate 'Download Spec Sheet(s)'}}</button>
		{{/if}}-->
    {{/unless}}
    {{#if isAddToCartEnabled}}
        <button class="product-list-bulk-actions-button-addtocart" data-action="add-items-to-cart">{{translate 'Add Selected Items to Cart'}}
        </button>
        <!-- <button class="product-list-bulk-actions-button-request-quote" data-action="button-add-items-to-quote"><a data-action="add-items-to-quote" data-touchpoint="customercenter" data-hashtag="#request-a-quote">{{translate 'Request a Quote'}}
	</a></button> -->
    {{else}}
        <button class="product-list-bulk-actions-button-addtocart" disabled data-action="add-items-to-cart">{{translate 'Add Selected Items to Cart'}}</button>
        <!-- <button class="product-list-bulk-actions-button-request-quote button-primary-disabled" data-action="button-add-items-to-quote"><a data-action="add-items-to-quote" data-touchpoint="customercenter" data-hashtag="#request-a-quote">{{translate 'Request a Quote'}} </a></button>-->
    {{/if}}
    <div class="product-list-bulk-actions-delete-wrapper">
        <button class="product-list-bulk-actions-button-wishlist" data-action="delete-project">{{translate 'Delete This Project'}}</button>
        <button class="product-list-bulk-actions-button-remove" data-action="delete-items" {{#unless isAtLeastOneItemChecked}}disabled{{/unless}}>{{translate 'Remove Items'}}</button>
    </div>

</div>
