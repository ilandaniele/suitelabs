<div class="global-views-star-rating" data-validation="control-group">
	{{#if showRating}}
		<div class="global-views-star-rating-container" data-action="scroll-to-reviews">
			{{#if showLabelRating}}
				<div class="global-views-star-rating-content-rating">
					<span class="global-views-star-rating-label-visible">
						{{translate 'Rating'}}
					</span>
				</div>
			{{/if}}

			{{#if showLabel}}
				<div class="global-views-star-rating-content-label">
					<span class="global-views-star-rating-label" for="{{name}}">
						{{label}}
					</span>
				</div>
			{{/if}}

			<div id="{{name}}" class="global-views-star-rating-area {{#if isReviewMode}}global-views-star-rating-area-review-mode{{/if}}" data-toggle='rater' data-validation="control" data-name="{{name}}" data-max="{{maxValue}}" data-value="{{value}}">

				{{#if isWritable}}
					<div class="global-views-star-rating-area-writable{{className}}">
						{{#each buttons}}
							<button type="button" aria-label="{{translate 'Rate this item with $(0) stars' @indexPlusOne 'Button that allows to rate an item'}}" data-action="rate" name="{{name}}" value="{{@indexPlusOne}}"></button>
						{{/each}}
					</div>
				{{/if}}

				<div class="global-views-star-rating-area-empty">
					<div class="global-views-star-rating-area-empty-content">
						{{#each buttons}}
							<i class="global-views-star-rating-empty{{className}}"></i>
						{{/each}}
					</div>
				</div>

				<div class="global-views-star-rating-area-fill" data-toggle='ratting-component-fill' {{#if isViewMode}} style="width: {{filledBy}}%"{{/if}}>
					<div class="global-views-star-rating-area-filled">
						{{#if isReviewMode}}
							{{#each ratedStars}}
								<i class="global-views-star-rating-filled{{className}} {{#unless ../isWritable}}global-views-star-rating-filled-rated-star{{/unless}}"></i>
							{{/each}}
						{{else}}
							{{#each buttons}}
								<i class="global-views-star-rating-filled{{className}}"></i>
							{{/each}}
						{{/if}}
					</div>
				</div>
			</div>

			{{#if showValue}}
				<span class="global-views-star-rating-value">
					{{value}}
				</span>
			{{/if}}

			{{#if showRatingCount}}
				<span class="global-views-star-rating-review-total">

					{{#if ratingCountGreaterThan0}}
						{{#if hasOneReview}}
							<span class="global-views-star-rating-review-total-review">{{ translate '($(0) Review)' ratingCount}}</span>
						{{else}}
							<span class="global-views-star-rating-review-total-review">{{ translate '($(0) Reviews)' ratingCount}}</span>
						{{/if}}
					{{else}}
						<span class="global-views-star-rating-review-total-empty-number">({{ratingCount}})</span>
						<span class="global-views-star-rating-review-total-no-review">{{ translate ' No Reviews yet'}}</span>
					{{/if}}
				</span>
			{{/if}}
		</div>

		{{#if showNoReviewsLink}}
			<a class="global-views-star-rating-no-reviews-link" href="#" data-touchpoint="home" data-hashtag="{{newReviewLink}}">{{ translate newReviewLabel }}</a>
		{{/if}}
	{{/if}}
</div>
