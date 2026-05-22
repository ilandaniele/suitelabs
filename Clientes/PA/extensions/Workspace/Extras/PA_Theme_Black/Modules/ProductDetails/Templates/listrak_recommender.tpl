{{#if enabledListrakRecommender}}
    <div class="product-detail-full-related-correlated-wrap listrak-recommender">
        <div class="product-details-full-content-correlated-items product-details-full-content-related-items">
            <p class="item-relations-related-title">{{{listrakRecommenderTitle}}}</p>
            <div class="listrak-recommender-items-wrapper">
                <aside class="item-relations-correlated">
                    <div class="item-relations-correlated-row item-relations-related-row">
                        <ul data-ltk-merchandiseblock="7819f896-cec1-424d-a5ca-c2f888e38cfc">
                            <script type="text/html">
                                <li class="item-relations-cell">
                                    <div class="item-relations-wrapper">
                                        <a class="item-relations-related-item-thumbnail" href="https://www.primaryarms.com/@Recommendation.LinkUrl" title="View @Recommendation.Title recommended for you">
                                            <img class="listraklink" onload="formStarRating(this)" src="@Recommendation.ImageUrl" alt="View @Recommendation.Title recommended for you"/>
                                        </a>
                                        <a class="item-relations-related-item-title" href="https://www.primaryarms.com/@Recommendation.LinkUrl" title="View @Recommendation.Title recommended for you">
                                            <strong class="listraklink">@Recommendation.Title</strong>
                                        </a>
                                        <div class="item-relations-related-item-rating">
                                            <div class="global-views-star-rating">
                                                <div class="global-views-star-rating-container">
                                                    <div class="global-views-star-rating-area">
                                                        <div class="global-views-star-rating-area-empty">
                                                            <div class="global-views-star-rating-area-empty-content">
                                                                <i class="global-views-star-rating-empty"></i>
                                                                <i class="global-views-star-rating-empty"></i>
                                                                <i class="global-views-star-rating-empty"></i>
                                                                <i class="global-views-star-rating-empty"></i>
                                                                <i class="global-views-star-rating-empty"></i>
                                                            </div>
                                                        </div>
                                                        <div class="global-views-star-rating-area-fill ltk-star-rating" data-rating="@Recommendation.StarRating" >
                                                            <div class="global-views-star-rating-area-filled">
                                                                <i class="global-views-star-rating-filled"></i>
                                                                <i class="global-views-star-rating-filled"></i>
                                                                <i class="global-views-star-rating-filled"></i>
                                                                <i class="global-views-star-rating-filled"></i>
                                                                <i class="global-views-star-rating-filled"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="clearfix"></div>
                                        <div class="product-views-price-lead">$@((Recommendation.Price).toFixed(2))</div>
                                        <div class="clearfix"></div>
                                        <a href="https://www.primaryarms.com/@Recommendation.LinkUrl" class="facet-item-view-more-button listraklink">View Details</a>
                                    </div>									
                                </li>
                            </script>
                        </ul>	
                    </div>							
                </aside>						
            </div>
        </div>
    </div>

    <script>
        function formStarRating(image)
        {
            if( image )
            {
                const ratingWrapper = image.parentElement.parentElement.querySelector('.ltk-star-rating');
                if(ratingWrapper)
                {
                    const rating = ratingWrapper.getAttribute('data-rating');
                    const percent = (rating * 100) / 5;
                    ratingWrapper.style.width = percent + '%';
                }                
            }            
        }
    </script>
{{/if}}