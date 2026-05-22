<section class="age-verification-pop-up">
    <span class="age-verification-pop-up-content">
        <div class="description">
            {{{popUpContent}}}
        </div>
        <div class="age-verification-modal-actions">
            <div class="age-verification-modal-accept">
                <button class="age-verification-modal-accept-button" data-dismiss="modal" data-action="accept">{{acceptButtonLabel}}</button>
            </div>
            <div class="age-verification-modal-deny">
                {{#if external}}
                    <button class="age-verification-modal-deny-button" data-dismiss="modal" data-action="deny">{{denyButtonLabel}}</button>
                {{else}}
                    <button class="age-verification-modal-deny-button" data-dismiss="modal" data-action="deny" data-touchpoint="home" data-hashtag="{{redirectLink}}">{{denyButtonLabel}}</button>
                {{/if}}
            </div>
         </div>
    </span>
</section>
