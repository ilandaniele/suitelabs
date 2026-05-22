<div class="executive-team-wrapper">
    <div class="breadcrumb-container">
        <div class="container">
        <ul class="global-views-breadcrumb">
            <li class="global-views-breadcrumb-item">
            <a href="/" data-touchpoint="home" data-hashtag="#">Home</a>
            </li>
            <li class="global-views-breadcrumb-divider">
            <span class="global-views-breadcrumb-divider-icon"></span>
            </li>
            <li class="global-views-breadcrumb-item-active">
                {{translate pageTitle}}
            </li>
        </ul>
        </div>    
    </div>
    <div class="executive-team-container container nopadding">
        {{#each executiveTeamDetails}}
            {{#unless executiveInactive}}
                <div class="executive-team-card{{#if executiveDescriptionPopupEnabled}} executive-has-description{{/if}}">
                    <div class="executive-team-card-box">
                        <div class="executive-team-card-top" {{#if executiveDescriptionPopupEnabled}}  data-toggle="modal" data-target="#{{executiveSequence}}" {{/if}} >
                            <img data-loader="true" src="{{resizeImage executiveImage 'executive_image'}}" alt="{{executiveName}}">
                        </div>
                        <div class="executive-team-card-bottom">
                            <div class="executive-teammember-name" {{#if executiveDescriptionPopupEnabled}}  data-toggle="modal" data-target="#{{executiveSequence}}" {{/if}} >
                                {{translate executiveName}}
                            </div>
                            <div class="executive-teammember-designation">
                                {{translate executiveDesignation}}
                            </div>
                            <div class="executive-teammember-email">
                                {{#if executiveMail}}
                                    <a href="mailto:{{executiveMail}}"><i class="fa fa-envelope" aria-hidden="true"></i> <span>{{translate executiveMail}}</span></a>
                                {{/if}}
                            </div>
                        </div>
                    </div>
                </div>
                {{#if executiveDescriptionPopupEnabled}}
                    <div class="executive-modal-holder modal fade" id="{{executiveSequence}}" tabindex="-1" role="dialog" aria-labelledby="{{executiveSequence}}" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                        <div class="modal-content executive-modal-content">
                            <div class="modal-body">
                                <div class="modal-body-upper">
                                    <button type="button" class="close executive-modal-close" data-dismiss="modal" aria-label="Close">
                                    </button>
                                    <img data-loader="true" src="{{resizeImage executiveImage 'main'}}" alt="{{executiveName}}">
                                </div>
                                <div class="modal-body-lower">
                                    <div class="modal-body-lower-executive-name">
                                        {{translate executiveName}}
                                    </div>
                                    <div class="modal-body-lower-executive-designation">
                                        {{translate executiveDesignation}}
                                    </div>
                                    <div class="modal-body-lower-executive-description">
                                        {{translate executiveDescription}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                {{/if}}
            {{/unless}}
        {{/each}}
    </div>
</div>