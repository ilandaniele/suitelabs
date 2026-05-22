<div class="pdp-custom-fields-vectary-3d-model-container">
{{#if showFinishes}}
    {{#each pdpCustomFieldsFinishes}}
    <div class="pdp-custom-fields-vectary-3d-model">
        <div class="pdp-custom-fields-vectary-3d-model-heading">{{this.name}}</div>
        {{#each this.Finishes}}
            <span data-toggle="tooltip" data-original-title="{{this.name}}" data-placement="bottom" class="3d-model-finish" data-modelid="{{this.id}}"></span>
        {{/each}}
    </div>
    {{/each}}
{{/if}}
