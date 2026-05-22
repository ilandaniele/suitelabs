<tr class="recordviews-row" data-item-id="{{id}}">
	{{#each columns}}
		<td class="recordviews-{{type}}" data-name="{{name}}">
			{{#if showLabel}}
				<span class="recordviews-label">{{label}}</span>
			{{/if}}
			{{#if isComposite}}
				<span class="recordviews-value" data-view="{{compositeKey}}"></span>
			{{else}}
				<span class="recordviews-value">{{value}}</span>
			{{/if}}
		</td>
	{{/each}}
</tr>