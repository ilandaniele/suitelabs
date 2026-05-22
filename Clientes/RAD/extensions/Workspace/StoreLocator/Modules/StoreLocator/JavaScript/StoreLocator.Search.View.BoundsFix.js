define('StoreLocator.Search.View.BoundsFix', [
    'StoreLocator.Map.View',
    'underscore'
], function StoreLocatorSearchViewBoundsFix(
    StoreLocatorMapView,
    _
) {
    'use strict';

    _.extend(StoreLocatorMapView.prototype, {
        updateMap: function updateMap() {
            var position = this.reference_map.getPosition();
            var self = this;

            this.reference_map.clearPointList(this.map);

            if (position && _.size(position) && !position.refineSearch) {
                this.reference_map.showMyPosition(position, this.map);
            } else {
                this.reference_map.centerMapToDefault(this.map);
            }

            if (this.collection.length) {
                this.reference_map.showPointList(this.collection, this.map);
                _.delay(function deferBounds() {
                    self.reference_map.fitBounds(self.map);
                }, 500);
            }
        }
    });
});
