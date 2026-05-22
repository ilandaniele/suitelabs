<div class="pdp-custom-fields-feature-availability">
    {{#if showAvailability}}
        {{#if showIntervalsFields}}
            <div>{{translate 'Future Availability'}}</div>
            {{#each pdpCustomFieldsIntervalsList}}
                <div>{{label}}: {{quantity}}</div>
            {{/each}}
        {{/if}}
    {{/if}}
</div>
