define('SuiteLabs.SEOImagePatch.Main', [
    'jQuery'
], function SEOImagePatchMain(
    jQuery
) {
    'use strict';

    // If the UA is google and main div is not empty (was pre-rendered) then unwrap the images for googlebot
    if (navigator.userAgent.match(/googlebot/i) && jQuery('#main') && String(jQuery('#main').html()).trim()) {
        jQuery('noscript').each(function eachNoScript() {
            jQuery(this).parent().append(
                jQuery(this).text()
            );
        });
    }
    return {};
});
