<section class="pacejet-rates-card">
    <span class="pacejet-rates-card-content">
        {{#if show}}
            {{translate "Get it by:"}}
            <br />
            {{translate "Fastest - Get as soon as $(0) - $$(1)" rates.fastestArrivalDate rates.fastestConsigneeFreight}}
            <br />
            {{translate "Cheapest - Pay as low as $$(0) and get it by $(1)" rates.lowestCostConsigneeFreight rates.lowestCostArrivalDate}}
        {{else}}
            {{translate "Please enter a valid zip code to show delivery estimates and prices"}}
        {{/if}}
    </span>
</section>
