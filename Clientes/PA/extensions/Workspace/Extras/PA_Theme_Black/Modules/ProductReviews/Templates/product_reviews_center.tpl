<section class="product-reviews-center-content">
	<button class="product-reviews-center-pusher" data-target="product-reviews-center-review" data-type="sc-pusher">
		<span class="product-reviews-center-pusher-title">{{ translate 'Reviews' }}</span>
		<div class="product-reviews-center-pusher-rating" data-view="Global.StarRating.Mobile"></div>
		<i class="product-reviews-center-pusher-icon"></i>
	</button>
	<div class="product-reviews-center-more-info-content-container" data-action="pushable" data-id="product-reviews-center-review">
		<div class="product-reviews-center">
			{{#if itemCount}}
				<div class="product-reviews-center-container">
					<div class="product-reviews-center-container-header">
						<p class="product-reviews-center-container-header-title">{{translate 'Ratings &amp; Reviews'}}</p>
						<p class="product-reviews-center-container-header-number">
							{{#if hasOneReview}}
								{{translate '1 review'}}
							{{else}}
								{{translate '$(0) reviews' itemCount}}
							{{/if}}
						</p>
						<div data-view="Global.StarRating"></div>
					</div>
					<div class="product-reviews-center-container-wrapper">
						<div data-view="Global.RatingByStar"></div>
					</div>
					<div class="product-reviews-center-container-footer">
						<span onclick="window.open('{{itemUrl}}/newReview', '_self'); event.stopPropagation(); return false;" class="product-reviews-center-container-footer-button">{{translate 'Write a Review'}}</span>
					</div>
				</div>

				<section class="product-reviews-center-list">
					<div  data-view="ListHeader.View"></div>
					{{#if totalRecords}}
						<div data-view="ProductReviews.Review" class="product-reviews-center-review-container"></div>
					{{else}}
						{{translate 'There are no reviews available for your selection'}}
					{{/if}}
				</section>

				<div class="product-reviews-center-footer">
					<div data-view="GlobalViews.Pagination"></div>
				</div>
			{{else}}
				<div class="product-reviews-center-container">
					<div class="product-reviews-center-container-header">
						<p class="product-reviews-center-container-header-title">{{translate 'Ratings &amp; Reviews'}}</p>
						<p class="product-reviews-center-container-header-title">{{translate 'No reviews available'}}</p>
						<p class="pa-first-to-add-review">{{translate 'Be the first to'}} <span onclick="window.open('{{itemUrl}}/newReview', '_self'); event.stopPropagation(); return false;"  class="product-reviews-center-container-button">{{translate 'Write a Review'}}</span></p>
					</div>
				</div>
			{{/if}}
		</div>
	</div>
</section>



{{!----
Use the following context variables when customizing this template:

	itemCount (Number)
	hasOneReview (Boolean)
	itemUrl (String)
	totalRecords (Number)

----}}
