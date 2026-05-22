<div class="product-details-information-content">
	{{#if showInformation}}

		{{#if isNotPageGenerator}}
			{{#each details}}
				{{!-- Mobile buttons --}}
				<button class="product-details-information-pusher" data-target="product-details-information-{{ @index }}" data-type="sc-pusher">
					{{ name }} <i></i>
					<p class="product-details-information-hint"> {{{trimHtml content 150}}} </p>
				</button>
			{{/each}}
		{{/if}}

			<div class="product-details-information-content-container">

				<div id="banner-content-top" class="content-banner banner-content-top"></div>

				{{#if isNotPageGenerator}}
					<div role="tabpanel">
						{{!-- When more than one detail is shown, these are the tab headers  --}}
						<ul class="product-details-information-content-tabs" role="tablist">
							{{#each details}}
								<li class="product-details-information-tab-title {{#if @first}} active {{/if}}" role="presentation">
									<a href="#" data-action="selected-tab" data-id="{{@index}}" data-target="#product-details-information-tab-{{@index}}" data-toggle="tab">{{name}}</a>
								</li>
							{{/each}}
						</ul>
						{{!-- Tab Contents --}}
						<div class="product-details-information-tab-content" data-type="information-content" data-action="tab-content">
							{{#each details}}
								<div role="tabpanel" class="product-details-information-tab-content-panel {{#if @first}}active{{/if}}" id="product-details-information-tab-{{@index}}" itemprop="{{itemprop}}" data-action="pushable" data-id="product-details-information-{{ @index }}">
									{{#if ../showHeader}}<p class="product-details-information-tab-content-panel-title">{{name}}</p>{{/if}}
									{{#if promoCheck}}
										<div class="promo-container row nomargin">
											<div class="col-xs-4 nopadding">
												<span class="promotion-link-button" data-action="promotion.link.button">
													<img src="{{promoImageLink}}">
												</span>
											</div>
											<div class="col-xs-8">
												<p><span class="promotion-link-button" data-action="promotion.link.button"><b>{{promoHeadline}}</b></span></p>
												<p><span class="promotion-link-button" data-action="promotion.link.button">{{promoDetails}}</span></p>
											</div>
										</div>
									{{/if}}
									<meta itemprop="description" content="{{content}}" />
									<div id="product-details-information-tab-content-container-{{@index}}" class="product-details-information-tab-content-container active" data-type="information-content-text"><div class="product-details-information-tab-content-container-length">{{{content}}}</div></div><a class="pa-show-less-more-link">See More</a>
								</div>
							{{/each}}
						</div>
					</div>
				{{else}}
					<div>
					{{#each details}}
						<p class="product-details-information-tab-name">{{name}}</p>
						<div class="product-details-information-tab-content" data-type="information-content" >
								<div class="product-details-information-tab-content-panel active" id="product-details-information-tab-{{@index}}" itemprop="{{itemprop}}" data-id="product-details-information-{{ @index }}">
									{{#if ../showHeader}}<p class="product-details-information-tab-content-panel-title">{{name}}</p>{{/if}}
									{{#if promoCheck}}
										<div class="promo-container row nomargin">
											<div class="col-xs-4 nopadding">
												<span class="promotion-link-button" data-action="promotion.link.button">
													<img src="{{promoImageLink}}">
												</span>
											</div>
											<div class="col-xs-8">
												<p><span class="promotion-link-button" data-action="promotion.link.button"><b>{{promoHeadline}}</b></span></p>
												<p><span class="promotion-link-button" data-action="promotion.link.button">{{promoDetails}}</span></p>
											</div>
										</div>
									{{/if}}
									<div id="product-details-information-tab-content-container-{{@index}}" class="product-details-information-tab-content-container active" data-type="information-content-text"><div class="product-details-information-tab-content-container-length">{{{content}}}</div></div><a class="pa-show-less-more-link">See More</a>
								</div>
						</div>
					{{/each}}
					</div>
				{{/if}}
				<div id="banner-content-bottom" class="content-banner banner-content-bottom"></div>
			</div>
	{{/if}}
</div>



{{!----
Use the following context variables when customizing this template:

	showInformation (Boolean)
	showHeader (Boolean)
	details (Array)

----}}
