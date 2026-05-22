define('AwaLabs.AutoSlider', [
    'Configuration',
    'jQuery',
    'underscore'
], function AwaLabsAutoSlider(
    Configuration,
    jQuery,
    _
) {
    'use strict';

    function initSliders() {
        _.delay(function delayedInit() {
            // eslint-disable-next-line no-underscore-dangle
            var currentView = SC.Application.layout._currentView;
            var $sliders = (currentView && currentView.$('[data-autoslider]')) || [];
            var options = Configuration.bxSliderDefaults;

            _.each($sliders, function eachSlider(slider) {
                var $slider = jQuery(slider);
                var isSliderInit = $slider.data('sliderinit') === 'yes';
                if (!isSliderInit) {
                    try {
                        options = {
                            nextText: '<a class="home-slider-next-icon"><\/a>',
                            prevText: '<a class="home-slider-prev-icon"><\/a>',
                            mode: 'fade'
                        };
                    } catch (e) {
                        console.log(e);
                    }

                    $slider.bxSlider(options);
                    $slider.data('sliderinit', 'yes');
                }
            });
        }, 100);
    }

    return {
        mountToApp: function mountToApp(application) {
            application.getLayout().on('afterAppendView', function fn() {
                initSliders();
            });

            if (window.CMS) {
                window.CMS.on('page:content:set', function initSlider() {
                    initSliders();
                });
            }
        }
    };
});
