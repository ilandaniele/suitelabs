<section>
    <div class="multi-add-to-left-row">
        <img class="ezcrowns-image" src= {{ getExtensionAssetsPath "img/logo-white.jpg" }} alt="EZCrowns">
        {{#if items}}
            <div><span class="multi-add-to-heading-line">{{translate 'Order Summary'}}</span></div>
        {{/if}}
    </div>

    <div class="multi-add-to-left-row multi-add-to-left-items">
    {{#each items}}
        <div class="item-component">
            <div class="column left">{{name}}</div>
            <div class="column middle">&#8212;</div>
            <div class="column right">{{quantity}}</div>
        </div>
    {{/each}}
    </div>

    <div class="multi-add-to-left-row">
        <div class="progress-bar-frame">
            <div id="progress-bar-legend" class="progress-bar-legend"> {{translate 'Hang tight!'}}</br>
                {{translate 'Items are being added to your cart'}}</div>
            <div id="progress-bar-container" class="progress-bar-container">
                <div id="progress-bar" class="progress-bar"></div>
            </div>
        </div>
        <button class="multipaddto-addtocart-button multipaddto-add-all" {{#unless hasItemSelected}}disabled{{/unless}}>
            {{translate 'Add To Cart'}}
        </button>
        <a data-touchpoint="viewcart" data-hashtag="#cart" class="multipaddto-addtocart-button-legend">{{translate 'View cart'}}</span>
    </div>
</section>
