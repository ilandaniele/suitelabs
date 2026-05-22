{{#if showTrendingProducts}}
    <div class="top-trending-products">
    <div class="label-top-trending-products">
        <strong>Trending Products</strong>
    </div>
        <ul>
            {{#each trendingSearchProducts}}
                <li>
                    <div class="trending-product" >
                        <div class="trending-product-wrapper">
                            <a class="trending-product-link" data-hashtag="{{custrecord_tsi_item_url_component}}" data-touchpoint="home" >
                                <img src="{{brightedgeImageDomain 'noWebsiteDomain' 'thumbnail'}}{{#if ../isImageOptimizationEnabled}}/{{/if}}{{resizeImage custrecord_tsi_item_image  'thumbnail' 'removeImageUrlProtocol'}}" alt="{{custrecord_tsi_item_description}}" height="97" width="144">
                            </a>
                        </div>
                        <div class="trending-product-info">
                            <div class="item-name">
                                <a class="trending-product-link" data-hashtag="{{custrecord_tsi_item_url_component}}" data-touchpoint="home" >
                                    {{custrecord_tsi_item_description}}
                                </a>
                            </div>   
                                               
                            <div class="item-sku">
                                SKU : {{custrecord_tsi_item_name}}
                            </div>                            
                            <div class="item-manufacturer">
                                Manufactured by {{custrecord_tsi_item_manufacturer}}
                            </div>

                            <div class="item-rating-wrapper">
                                <div class="item-rating" style="width:{{custrecord_tsi_item_review_rating_percent}}%;"></div>
                            </div>  
                        </div>
                    </div>                
                </li>
            {{/each}}
        </ul>
    </div> 
{{/if}}