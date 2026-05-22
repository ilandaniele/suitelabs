{{#if enableTopBrands}}
    {{#if topBrandsTitle}}
        <div class="home-merch-title"> {{topBrandsTitle}} </div>
    {{/if}}
    
    <ul class="top-brands">
        {{#each topBrands}}
            <li {{objectToAtrributes this}}>
                <a href="{{bannerHref}}">
                    <img src="{{bannerUrl}}" alt="{{bannerTitle}}" />
                </a>
            </li>
        {{/each}}
    </ul>
    
{{/if}}