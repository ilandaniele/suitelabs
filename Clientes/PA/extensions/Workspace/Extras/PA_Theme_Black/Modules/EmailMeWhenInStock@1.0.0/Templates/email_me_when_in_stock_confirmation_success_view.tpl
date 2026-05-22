<div class="email-when-instock-confirmation success text-center">
    <h2 class="confirmation-title text-center">REQUEST SUCCESS!</h2>
    
    <div class="img-wrapper text-center">
        <img class="icon-success" src="{{getThemeAssetsPath 'img/Icons/Icon ionic-ios-checkmark-circle.svg'}}" >		
    </div>

    <div class="message text-center">
        Thank you! <br> An email notification will be sent once it is available.
    </div>
    
    {{#if continur_url}}
        <a class="facet-item-view-more-button" href="{{continur_url}}" data-touchpoint="home" data-hashtag="{{continur_url}}">{{translate 'Click here to continue Shopping'}}</a>
    {{else}}
        <a class="facet-item-view-more-button" href="/search" data-touchpoint="home">{{translate 'Click here to continue Shopping'}}</a>
    {{/if}}
</div>