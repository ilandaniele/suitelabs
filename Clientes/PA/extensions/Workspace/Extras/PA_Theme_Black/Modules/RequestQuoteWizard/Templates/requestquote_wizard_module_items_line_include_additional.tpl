<p class="requestquote-wizard-item-quality-label">{{{includeAdditionalLabel}}}</p>
<p class="requestquote-wizard-item-quality-value  select-line-item-quality-class-wrap">
    <select class="select-line-item-quality-class" {{#if isDisabled}}disabled{{/if}} name="select-line-include-additional" data-action="select-line-include-additional">
        {{#each includeAdditionals}}
            <option value="{{includeAdditionalId}}" {{#if selected}} selected {{/if}}>{{includeAdditionalValue}}</option>
        {{/each}}
    </select>
</p>