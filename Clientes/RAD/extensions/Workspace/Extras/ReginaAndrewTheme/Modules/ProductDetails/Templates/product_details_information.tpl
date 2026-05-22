<div class="product-details-information-content">
	{{#if showInformation}}
			<div class="product-details-information-content-container">
				<div id="banner-content-top" class="content-banner banner-content-top"></div>
                    <div class="item-details-tab-content">
                        {{#each details}}
                            <div class="item-details-tab-content-panel">
                                <button class="collapsed" type="button" data-toggle="collapse" data-target="#product-details-information-tab-{{@index}}" aria-expanded="false" aria-controls="#product-details-information-tab-{{@index}}">
                                    <span class="item-details-tab-content-panel-title">{{name}}<i class="toggle-icon"></i></span>
                                </button>
                                <div class="collapsed collapse" id="product-details-information-tab-{{@index}}">
                                    {{#if @first}}
                                        <div class="item-details-content">
                                            <div data-view="PDPCustomFields"></div>
                                            <br>
                                            {{{content}}}
                                        </div>
                                    {{else}}
                                        <div class="card card-body">
                                            {{{content}}}
                                        </div>
                                    {{/if}}
                                </div>
                            </div>
                        {{/each}}
                </div>
			</div>
	{{/if}}
</div>



{{!----
Use the following context variables when customizing this template:

	showInformation (Boolean)
	showHeader (Boolean)
	details (Array)

----}}
