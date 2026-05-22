{{#unless isStandalone}}
<nav class="header-menu-secondary-nav" style="background: {{colorConfig}}">

	<!--div class="header-menu-search" data-view="SiteSearch.Button"></div-->

	<ul class="header-menu-level1">

		{{#each categories}}
			{{#if text}}
				<li>
					<a class="{{class}}" {{objectToAtrributes this}}>
					{{translate text}}
					</a>
					{{#if categories}}
					<ul class="header-menu-level-container">
						<li>
                            {{#if image }}
                                <div class="header-menu-level-image">
                                    <a href="{{ image.imageLink }}">
                                        <img src="{{ image.image }}" alt="{{translate image.imageText }}" />
                                        <h4>{{translate image.imageText }}</h4>
                                    </a>
                                </div>
                            {{/if}}
							<ul class="header-menu-level2">
								{{#each categories}}
								<li>
									<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>

									{{#if categories}}
									<ul class="header-menu-level3">
										{{#each categories}}
										<li>
											<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
										</li>
										{{/each}}
									</ul>
									{{/if}}
								</li>
								{{/each}}
							</ul>
						</li>
					</ul>
					{{/if}}
				</li>
			{{/if}}
		{{/each}}

	</ul>

</nav>
{{/unless}}

{{!----
Use the following context variables when customizing this template:

	categories (Array)
	showExtendedMenu (Boolean)
	showLanguages (Boolean)
	showCurrencies (Boolean)

----}}
