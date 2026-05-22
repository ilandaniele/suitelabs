{{#if stockStatus}}
<div class="facets-item-stock-availability">
    <label>{{ translate 'Availability:'}} </label> <span>{{stockStatus}}</span>
</div>
{{/if}}

{{#if inStockDate}}
<div class="facets-item-stock-availability">
    <label>{{ translate 'In Stock Date:'}} </label> <span>{{inStockDate}}</span>
</div>
{{/if}}