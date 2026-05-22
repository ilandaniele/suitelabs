define('Header.MiniProjectsItemCell.View', [
    'header_mini_projects_item_cell.tpl',
    'underscore',
    'Backbone',
    'Backbone.CompositeView'
], function HeaderMiniProjectsItemCellView(
    headerMiniProjectsItemCellTpl,
    _,
    Backbone,
    BackboneCompositeView
) {
    'use strict';

    return Backbone.View.extend({
        template: headerMiniProjectsItemCellTpl,
        initialize: function initialize() {
            BackboneCompositeView.add(this);
        },
        getContext: function getContext() {
            var name = this.model.get('name');
            var id = this.model.get('id');
            var itemsCount = this.model.get('itemsCount');
            return {
                id: id,
                text: _('$(0) ($(1))').translate(name, itemsCount)
            };
        }
    });
});
