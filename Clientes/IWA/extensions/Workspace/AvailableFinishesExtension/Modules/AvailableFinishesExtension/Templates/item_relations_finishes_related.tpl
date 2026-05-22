{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

{{#if showCells}}
	<aside class="item-relations-related">
		<h3>{{translate 'Available Finishes'}}</h3>
		<div class="item-relations-related-row">
			<div data-type="backbone.collection.view.rows"><h5>{{translate 'No Items related'}}</h5></div>
		</div>
	</aside>
{{/if}}



{{!----
Use the following context variables when customizing this template:

	collection (Array)
	showCells (Boolean)

----}}
