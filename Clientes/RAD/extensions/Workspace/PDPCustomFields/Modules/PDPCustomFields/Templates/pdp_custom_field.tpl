<div {{#if quickView}} class="product-details-quickview-specs" {{/if}}>
    {{#if showCustomFields}}
        {{#each pdpCustomFieldsList}}
            {{#unless inactive}}
                {{#if displayInPDP}}
                    {{#if data}}
                        <div>{{translate pdpLabel}} {{data}}</div>
                    {{/if}}
                {{/if}}
            {{/unless}}
        {{/each}}
    {{/if}}
</div>
