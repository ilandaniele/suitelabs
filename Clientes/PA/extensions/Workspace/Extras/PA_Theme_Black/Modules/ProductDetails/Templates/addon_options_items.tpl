{{#if items.length}}
<div id="item-pa-options">
    <p id="item-pa-options-header">{{translate 'Optional Accessories'}}</p>
    
    {{#each items}}
        <aside class="item-relations-related panel item-pa-options-aside">
            <div class="item-pa-options-group">
                <a class="item-pa-options-content" data-toggle="collapse" data-target="#group-{{this.group.0.groupId}}" data-parent="#item-pa-options" aria-expanded="false" aria-controls="group-{{this.group.0.groupId}}">{{this.group.0.optionType}}<i class="acordion-head-toggle-icon"></i></a>
            </div>
            <div id="group-{{this.group.0.groupId}}" class="item-pa-options-content collapse">
                <div class="item-pa-options-content-wrapper">
                    <fieldset id="{{this.group.0.groupId}}">
                        {{#each this.group}}
                            <div id="{{this.groupId}}-{{this._id}}" class="item-pa-option-item-container">
                                <img class="col-xs-2" width="60px" height="40px" src="{{brightedgeImageDomain 'noWebsiteDomain' 'thumbnail'}}{{this._thumbnail.url}}?resizeid=4&resizeh=0&resizew=60">
                                <div class="col-xs-8 pa-dark-gray">
                                    {{this.pagetitle}}
                                     {{#if this.custitem_sc_ns_enable_pre_order}}
                                        <div class="item-pa-options-pre-order-status">
                                            <p class="item-views-stock-msg-in">
                                                <i class="fa fa-check-circle"></i>
                                                <span class="item-views-stock-msg-out-text"> Available for Pre Order/Back Order</span>
                                            </p>
                                        </div>
                                    {{/if}}
                                </div>
                                <div class="item-pa-options-select-container col-xs-2">
                                	{{#if this.moreThanOnlinecustomerprice}}
                                    	<div class="item-pa-options-sale">${{this.optionPrice}}</div>
                                        <div class="itemp-pa-options-price">{{this.onlinecustomerprice_formatted}}</div>
                                    {{else}}
                                        <div class="item-pa-options-sale">${{this.optionPrice}}</div>
                                    {{/if}}
                                    {{#ifCond this.isinstock '||' this.custitem_sc_ns_enable_pre_order}}
                                      <label class="item-pa-options-button" id="item-pa-options-button" group="{{this.groupId}}">Select <input id="{{this._id}}" class="item-pa-options-select-checkbox" type="checkbox" name="{{this.optionType}}" value="{{this._id}}" group="{{this.groupId}}"></label>
                                    {{else}}
                                      <span class="merch-zone-out"><i class="fa fa-times-circle"></i> {{translate ' Out of Stock'}}</span>
                                    {{/ifCond}}
                                </div>
                            </div>
                        {{/each}}
                    </fieldset>
                </div>
             </div>
        </aside>
    {{/each}}
    
    <!--{{#each items}}
        <aside class="item-relations-related" style="clear: left; margin: 0px 15px 0px 15px;">
            <div class="item-pa-options">
                <a style="" class="item-pa-options-content" data-toggle="collapse" data-target="#group-{{this.group.0.optionType}}" aria-expanded="false" aria-controls="group-{{this.group.0.optionType}}">{{translate 'Choose a '}}{{this.group.0.optionType}}<i class="acordion-head-toggle-icon"></i></a>
            </div>
            <div class="item-pa-options-content collapse" id="group-{{this.group.0.optionType}}" style="background:white;">
                <div class="item-pa-options-content-wrapper">
                    <fieldset id="{{this.group.0.optionType}}">
                        {{#each this.group}}
                            <div class="item-pa-options-container {{#unless this.isinstock}}item-pa-options-out-contianer{{/unless}}" style="text-align: center" id="{{this.optionType}}_{{this._id}}">
                                <img src="{{this._thumbnail.url}}">
                                <div class="item-pa-options-select-container">
                                {{#if this.isinstock}}
                                  <label class="item-pa-options-button" id="item-pa-options-button" for="{{this._id}}">Select <input id="{{this._id}}" class="item-pa-options-select-checkbox" type="checkbox" name="{{this.optionType}}" value="{{this._id}}"></label>
                                {{else}}
                                  <span class="merch-zone-out"><i class="fa fa-times-circle"></i> {{translate ' Out of Stock'}}</span>
                                {{/if}}
                                </div>
                                <div class="options-sku" style="color: #4f5150">{{this.pagetitle}}</div>
                                <div class="options-price" style="text-decoration: line-through; color: #e0e0e0">${{this.onlinecustomerprice}}</div>
                                <div class="item-pa-options-sale">${{this.optionPrice}}</div>
                            </div>
                        {{/each}}
                    </fieldset>
                </div>
             </div>
        </aside>
    {{/each}}-->
</div>
{{/if}}