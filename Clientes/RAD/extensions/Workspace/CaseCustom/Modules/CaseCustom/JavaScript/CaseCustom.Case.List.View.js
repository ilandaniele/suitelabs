define('CaseCustom.Case.List.View', [
    'Case.List.View',
    'underscore',
    'CaseListItemsCollectionView',
    'Utils'
], function CaseCustomCaseListView(
    CaseListView,
    _,
    CaseListItemsCollectionView,
    Utils
) {
    'use strict';

    _.extend(CaseListView.CaseListView.prototype, {
        getChildViews: _.wrap(CaseListView.CaseListView.prototype.getChildViews, function getChildViews(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            context['Case.List.Items'] = function CaseListItems() {
                var recordsCollection = this.collection.map(function mapFn(currentCase) {
                    return {
                        touchpoint: 'customercenter',
                        title: Utils.translate('Case #$(0)', currentCase.get('caseNumber')),
                        detailsURL: '#/cases/' + currentCase.get('internalid'),
                        internalid: currentCase.get('internalid'),

                        columns: [
                            {
                                label: Utils.translate('Type of Inquiry:'),
                                type: 'category',
                                name: 'category',
                                value: _.isObject(currentCase.get('category')) ? currentCase.get('category').name : currentCase.get('category').name
                            },
                            {
                                label: Utils.translate('Subject:'),
                                type: 'subject',
                                name: 'subject',
                                value: currentCase.get('title')
                            },
                            {
                                label: Utils.translate('Creation Date:'),
                                type: 'creation-date',
                                name: 'creation-date',
                                value: currentCase.get('createdDate').split(' ')[0]
                            },
                            {
                                label: Utils.translate('Last Message:'),
                                type: 'date',
                                name: 'last-message',
                                value: currentCase.get('lastMessageDate').split(' ')[0]
                            },
                            {
                                label: Utils.translate('Status:'),
                                type: 'status',
                                name: 'status',
                                value: _.isObject(currentCase.get('status')) ? currentCase.get('status').name : currentCase.get('status').name
                            }
                        ]
                    };
                });
                return new CaseListItemsCollectionView.CaseListItemsCollectionView(recordsCollection);
            };
            return context;
        })
    });
});
