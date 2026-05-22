<div class="container">
<div class="ratings-reviews-box">
    <div class="row">
        <div class="col-xs-12" data-cms-area="store_reviews_main_a" data-cms-area-filters="path">
        </div>
        <div class="ratings-reviews-header">
            <h1>Store Rating: <span>{{rating}}</span> out of 10</h1>
            <h2>Total reviews: {{totalReviews}}</h2>
            <p>
                <a href="https://www.resellerratings.com/store/Primary_Arms" target="_blank">See all of our store reviews</a>
            </p>
            <p><a class="button-primary" href="https://www.resellerratings.com/store/survey/Primary_Arms" target="_blank">Write a Review</a></p>
        </div>
        {{#each reviews}}
            <div class="col-xs-12">
                <div class="ratings-reviews-rating">
                    <div class="global-views-star-rating" data-validation="control-group">
                        <div class="global-views-star-rating-area" data-toggle="rater" data-validation="control" data-name="" data-max="5" data-value="{{this.stars}}">
                            <div class="global-views-star-rating-area-empty">
                                <div class="global-views-star-rating-area-empty-content">
                                    {{#each ../maxStars}}
                                        <i class="global-views-star-rating-empty"></i>
                                    {{/each}}
                                </div>
                            </div>
                            <meta itemprop="bestRating" content="5">
                            <meta itemprop="worstRating" content="0">
                            <div class="global-views-star-rating-area-fill" data-toggle="ratting-component-fill">
                                <div class="global-views-star-rating-area-filled">
                                    {{#each this.stars}}
                                        <i class="global-views-star-rating-filled"></i>
                                    {{/each}}
                                </div>
                            </div>
                        </div> 
                        <meta itemprop="ratingValue" content="5">
                        <meta itemprop="reviewCount" content="0">
                    </div>
                
                    <span><small>{{this.date}}</small></span>
                    <h4 class="ratings-title">
                        <a href="{{this.url}}" target="_blank">{{this.title}}</a>
                    </h4>
                    <h5 class="ratings-answers">
                        <a href="{{this.url}}" target="_blank">{{this.answers}}</a>
                    </h5> 
                    <div class="ratings-comment">
                        <div>"{{this.comment}}"</div>
                    </div>
                </div>
            </div>
        {{/each}}
        <div class="see-all-reviews">
            <a href="https://www.resellerratings.com/store/Primary_Arms" target="_blank">See all of our store reviews</a>
        </div>
        <div class="col-xs-12" data-cms-area="store_reviews_main_a" data-cms-area-filters="path">
        </div>
    </div>
</div>
</div>