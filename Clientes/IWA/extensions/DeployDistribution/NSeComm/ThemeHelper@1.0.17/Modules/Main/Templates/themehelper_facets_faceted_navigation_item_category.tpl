{{#if showFacet}}
<div class="facets-faceted-navigation-item-category">

	<div class="facets-faceted-navigation-item-category-facet-group" data-type="rendered-facet"
		data-facet-id="{{facetId}}" id="{{htmlId}}">

		<div class="{{#if isCollapsed}} collapse {{else}} collapse in {{/if}} facets-faceted-navigation-item-category-facet-group-wrapper"
			id="{{htmlId}}-category-wrapper">
			<div class="facets-faceted-navigation-item-category-facet-group-content">
				<ul class="facets-faceted-navigation-item-category-facet-optionlist">
					{{#each displayValues}}
					<li>
						<a class="facets-faceted-navigation-item-category-facet-option {{#if isActive}}option-active{{/if}}"
							href="{{link}}" title="{{label}}">
							{{displayName}}
						</a>
					</li>
					{{/each}}
				</ul>

				{{#if showExtraValues}}
				<ul class="facets-faceted-navigation-item-category-facet-optionlist-extra collapse">
					{{#each extraValues}}
					<li>
						<a class="facets-faceted-navigation-item-category-facet-option {{#if isActive}}option-active{{/if}}"
							href="{{link}}" title="{{label}}">
							{{displayName}}
						</a>
					</li>
					{{/each}}
				</ul>

				<div class="facets-faceted-navigation-item-category-optionlist-extra-wrapper">
					<button class="facets-faceted-navigation-item-category-optionlist-extra-button"
						data-toggle="collapse"
						data-target="#{{htmlId}} .facets-faceted-navigation-item-category-facet-optionlist-extra"
						data-action="see-more">
						<span data-type="see-more">
							{{translate 'See More'}}
						</span>
						<span data-type="see-less" class="facets-faceted-navigation-item-category-alt-caption">
							{{translate 'See Less'}}
						</span>
					</button>
				</div>
				{{/if}}


			</div>
		</div>
	</div>
</div>
{{/if}}




{{!----
Use the following context variables when customizing this template:

htmlId (String)
facetId (String)
showFacet (Boolean)
values (Array)
displayValues (Array)
extraValues (Array)
showExtraValues (Boolean)
isUncollapsible (Boolean)
isCollapsed (Boolean)
parentName (String)

----}}