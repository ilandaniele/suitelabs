<div class="email-when-instock-confirmation fail text-center">
    <h2 class="confirmation-title text-center">ERROR ENCOUNTERED</h2>
    
    <div class="img-wrapper text-center">
        <img class="icon-error" src="{{getThemeAssetsPath 'img/Icons/Icon material-error.svg'}}" >		
    </div>

    <div class="message text-center">
        At this point we are not able to register this email id, <br> please try different email account or try later. <br> Sorry for inconvenience!
    </div>
    
    {{#if back_url}}
        <a class="facet-item-view-more-button" href="{{back_url}}" data-touchpoint="home" data-hashtag="{{back_url}}">{{translate 'Back'}}</a>
    {{else}}
        <a class="facet-item-view-more-button" href="/search" data-touchpoint="home">{{translate 'Back'}}</a>
    {{/if}}
</div>