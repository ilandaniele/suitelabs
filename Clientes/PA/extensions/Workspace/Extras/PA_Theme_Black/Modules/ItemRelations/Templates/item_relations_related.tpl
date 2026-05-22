{{#if showCells}}
	{{#if title}}
		<h2 class="home-title-header">{{translate title}}</h2>
	{{else}}
		<p class="item-relations-related-title">{{relatedItemSliderTitle}}</p>
	{{/if}}
	
	<div class="deal-products-wrapper">

		<aside class="item-relations-related">
			
			<div class="item-relations-related-row">
				<div data-type="backbone.collection.view.rows"></div>
			</div>
		</aside>

	</div>
{{/if}}



{{!----
Use the following context variables when customizing this template: 
	
	collection (Array)
	showCells (Boolean)

----}}
