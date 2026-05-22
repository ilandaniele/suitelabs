<input data-type="search-input" class="itemssearcher-input typeahead"
	placeholder="Search for Products"
	type="search" autocomplete="off"
	{{#if showId}} id="{{id}}" {{/if}} {{#if showName}} name="{{name}}" {{/if}}
	maxlength="{{maxLength}}" aria-label="Search" />




{{!----
Use the following context variables when customizing this template: 
	
	placeholderLabel (String)
	maxLength (Number)
	showId (Boolean)
	showName (Boolean)
	id (String)
	name (String)

----}}
