<div class="container-fluid">
    <div class="row cooling-calc-results-title">
        <div class="col-md-12">
            <h2 class="row cooling-calc-results-title">
                {{#if isPreview}}
                    {{translate "Preliminary Recommended Cooling Units"}}
                {{else}}
                    {{translate "Recommended Cooling Units for $(0)" tlcId}}
                {{/if}}
                <span class="cooling-calc-results-title-btuh">{{totalLoad}} BTUH</span>
            </h2>
            
            {{#if isPreview}}
            <div class="reusable-components">
                <div class="reusable-larger-p">
                    <h3 class="reusable-larger-italic">{{ translate 'This is a preview of your results. You can continue making edits by returning to the previous page.' }}</h3>
                </div>
            </div>
            {{/if}}
        </div>
    </div>

    {{#if hasItems}}
        {{#each items}}
            <div class="row cooling-calc-results-header cooling-calc-desktop-only">
                <div class="col-md-5" style="font-size: 1.4rem;">{{ translate '$(0)' unitType }}</div>
                <div class="col-md-1">{{ translate 'Number of Units' }}</div>
                <div class="col-md-1">{{ translate 'BTUH per Unit' }}</div>
                <div class="col-md-1">{{ translate 'Ductable Airflows' }}</div>
                <div class="col-md-1">{{ translate 'Exposure' }}</div>
                <div class="col-md-3">{{ translate 'Notes' }}</div>
            </div>

            <div class="row cooling-calc-results-header cooling-calc-mobile-only">
                <div class="col-md-12">{{ translate '$(0)' unitType }}</div>
            </div>

            {{#each itemList}}
                <div class="row cooling-calc-results-row">
                    <div class="col-md-5">
                        <a href="#" data-touchpoint="home" data-hashtag="#product/{{id}}" class="thermal-load-item-link">
                            <img src="{{thumbnail}}" alt="{{name}}">
                            <span>{{name}}</span>
                        </a>
                    </div>

                    <div class="col-md-1">
                        <div class="cooling-calc-vertical-align">
                            <span class="cooling-calc-mobile-only">{{ translate 'Number of Units:' }} </span>
                            {{units}}
                        </div>
                    </div>

                    <div class="col-md-1">
                        <div class="cooling-calc-vertical-align">
                            <span class="cooling-calc-mobile-only">{{ translate 'BTUH per Unit:' }} </span>
                            {{#if temp}}
                                {{translate "$(0) @ $(1)F" btuh temp}}
                            {{else}}
                                {{btuh}}
                            {{/if}}
                        </div>
                    </div>

                    <div class="col-md-1">
                        <div class="cooling-calc-vertical-align">
                            <span class="cooling-calc-mobile-only">{{ translate 'Ductable Airflows:' }} </span>
                            {{#if airflowsHot}}
                                {{#if airflowsCold}}
                                    {{translate "Hot / Cold"}}
                                {{else}}
                                    {{translate "Hot"}}
                                {{/if}}
                            {{else}}
                                {{#if airflowsCold}}
                                    {{translate "Cold"}}
                                {{else}}
                                    {{translate "--"}}
                                {{/if}}
                            {{/if}}
                        </div>
                    </div>

                    <div class="col-md-1">
                        <div class="cooling-calc-vertical-align">
                            <span class="cooling-calc-mobile-only">{{ translate 'Exposure:' }} </span>
                            {{exposure_text}}
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="cooling-calc-vertical-align">
                            {{#if showNotes}}
                                <span class="cooling-calc-mobile-only">{{ translate 'Notes:' }} </span>
                                {{{notes}}}
                            {{/if}}
                        </div>
                    </div>
                </div>
            {{/each}}
        {{/each}}
    {{else}}
        <p>{{ translate 'There are no recommended units for this request, please try again later.' }}</p>
    {{/if}}
</div>