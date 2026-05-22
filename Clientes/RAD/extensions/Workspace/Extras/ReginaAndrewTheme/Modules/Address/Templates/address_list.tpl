{{#if showBackToAccount}}
	<a href="/" class="address-list-button-back">
		<i class="address-list-button-back-icon"></i>
		{{translate 'Back to Account'}}
	</a>
{{/if}}

<section class="address-list">
	<h2>{{pageHeader}}</h2>
    <a class="button-cuaternary button-small" href="/addressbook/new" data-toggle="show-in-modal">
            {{translate 'Add New Address'}}
    </a>
	<div class="address-list-default-addresses">
		<div data-view="Addresses.Collection"></div>
	</div>
    <div data-view="AddressBook.AfterAddressesList"></div>
</section>




{{!----
Use the following context variables when customizing this template:

	pageHeader (String)
	isAddressCollectionLengthGreaterThan0 (Boolean)
	showBackToAccount (Boolean)

----}}
