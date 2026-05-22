{{#if isItemSelected}}
	<div class="itemssearcher-category-item" data-url="{{model.relatedLink}}">
		<a data-hashtag="{{model.relatedLink}}" data-touchpoint="home" >
			{{highlightKeywords model.correctedSearchTerm common_keywords}} <span style="font-size:11px;font-style:italic;">{{{model.instruction}}}</span>
		</a>
		<span class="hide">{{currentQuery}}</span>
	</div>
{{else}}
	<!-- <div class="itemssearcher-item-shadow"></div> -->
	{{#if hasResults}}
		<!-- <div class="itemssearcher-item-all-results">
			{{translate 'See all results'}}
			<span class="hide">{{currentQuery}}</span>
		</div> -->
	{{else}}
		{{#if isAjaxDone}}
			<div class="itemssearcher-item-no-results">
				{{translate 'No Categories Found'}}
				<span class="hide">{{currentQuery}}</span>
			</div>
		{{else}}
			<div class="itemssearcher-item-searching">
				{{translate 'Searching...'}}
				<span class="hide">{{currentQuery}}</span>
			</div>
		{{/if}}
	{{/if}}
{{/if}}
{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context variables in the Console of your browser's developer tools.

----}}
