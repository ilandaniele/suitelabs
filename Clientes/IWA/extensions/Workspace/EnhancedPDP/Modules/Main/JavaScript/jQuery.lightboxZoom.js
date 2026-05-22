// This is a modified version of the zoom library within SC
define('jQuery.lightboxZoom', [
    'jQuery'
], function lightboxZoomModule(
    jQuery
) {
    /* eslint-disable no-mixed-operators, no-param-reassign */

    function transformCoordinate(coordinate, offset, size) {
        return ((coordinate - offset) / size) * 100;
    }

    jQuery.fn.lightboxZoom = function lightboxZoom(url, slideIndex) {
        var $div;
        var $img;

        slideIndex = slideIndex || 0;

        // Changed the selector to avoid wierd behavior with bxSlider
        $div = jQuery('[data-zoom]:not(.bx-clone)');

        // Changed from direct children to any image inside the container
        // needed because lightbox uses a different markup and images are not the direct
        // child of the container
        $img = jQuery($div.find('img')[slideIndex]);

        if ($img) {
            $div
            .css({ position: 'relative', overflow: 'hidden' });

            // Added this validation as the video thumbnail shouldn't have zoom
            if (!$img.data('skip-zoom')) {
                $div
                .on('mouseover', function mouseover() {
                    $img.css({
                        transform: 'scale(2.3)'
                    });
                })
                .on('mouseout', function mouseout() {
                    $img.css({
                        transform: 'scale(1)'
                    });
                })
                .on('mousemove', function mousemove(e) {
                    $img.css({
                        'transform-origin':
                        transformCoordinate(e.pageX, $div.offset().left, $div.width()) -
                        slideIndex * 100 +
                        '% ' +
                        transformCoordinate(e.pageY, $div.offset().top, $div.height()) +
                        '%'
                    });
                });
            }

            if (url) {
                $img.attr('src', url);
            }
        }
    };

    /* eslint-enable no-mixed-operators, no-param-reassign */

    return jQuery;
});
