<p class="requestquote-wizard-item-quality-label">{{{itemQualityLabel}}}</p>
<p class="requestquote-wizard-item-quality-value select-line-item-quality-class-wrap">
    <select class="select-line-item-quality-class" {{#if isDisabled}}disabled{{/if}} name="select-line-item-quality" data-action="select-line-item-quality">
        {{#each itemQualities}}
            <option value="{{itemQualityId}}" {{#if selected}} selected {{/if}}>{{itemQualityValue}}</option>
        {{/each}}
    </select>
</p>