<div class="product-details-image-gallery product-details-lightbox-gallery gallery">
	{{#if showImages}}
		{{#if showImageSlider}}
			<ul class="bxslider" data-slider>
				{{#each images}}
					<li data-zoom class="product-details-image-gallery-container" >
						<a data-lightbox-elem href="{{ main }}" data-is-video="{{ isVideo }}">
							{{#if isVideo}}
								<i class="yt-icon"></i>
							{{/if}}
							<img
								src="{{ main }}"
								alt="{{ altimagetext }}"
								itemprop="image"
								data-loader="false"
								data-skip-zoom={{ skipZoom }}>
						</a>
					</li>
				{{/each}}
			</ul>
		{{else}}
			{{#with firstImage}}
				<div class="product-details-image-gallery-detailed-image" data-zoom>
					<a data-lightbox-elem href="{{ main }}">
						<img
							class="center-block"
							src="{{ main }}"
							alt="{{ altimagetext }}"
							itemprop="image"
							data-loader="false">
					</a>
				</div>
			{{/with}}
		{{/if}}
	{{/if}}
</div>