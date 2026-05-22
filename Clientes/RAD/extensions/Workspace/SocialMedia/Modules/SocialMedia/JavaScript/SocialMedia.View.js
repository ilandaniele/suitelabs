define('SocialMedia.View', [
    'SCView',
    'social-media.tpl'
], function SocialMediaViewModule(
    SCViewComponent,
    SocialMediaTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function SocialMediaView(options) {
        SCView.call(this);
        this.environment = options.environment;
        this.template = SocialMediaTpl;
    }

    SocialMediaView.prototype = Object.create(SCView.prototype);

    SocialMediaView.prototype.constructor = SocialMediaView;

    SocialMediaView.prototype.getContext = function getContext() {
        return {
            facebookUrl: this.environment.getConfig('socialmedia.facebookUrl'),
            linkedinUrl: this.environment.getConfig('socialmedia.linkedinUrl'),
            youtubeUrl: this.environment.getConfig('socialmedia.youtubeUrl'),
            twitterUrl: this.environment.getConfig('socialmedia.twitterUrl'),
            instagramUrl: this.environment.getConfig('socialmedia.instagramUrl'),
            googleUrl: this.environment.getConfig('socialmedia.googleUrl'),
            pinterestUrl: this.environment.getConfig('socialmedia.pinterestUrl')
        };
    };

    return SocialMediaView;
});
