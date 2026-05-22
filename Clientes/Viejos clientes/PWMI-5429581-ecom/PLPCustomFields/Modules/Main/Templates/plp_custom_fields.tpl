{{#each additionalFields}}
    {{#if fieldID}}
        {{#if show}}
        <div class="custom-plp-fields-container">
            <span class="custom-plp-fields-label">
                {{#if showLabel}}
                    {{{fieldLabel}}}
                {{/if}}
                {{fieldID}}
            </span>
        </div>
        {{/if}}
    {{/if}}
{{/each}}
