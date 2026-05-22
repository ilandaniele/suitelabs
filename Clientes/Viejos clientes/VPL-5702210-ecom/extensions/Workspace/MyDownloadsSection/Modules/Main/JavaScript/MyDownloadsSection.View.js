// @module NSeComm.TechnicalFiles.Main

define('MyDownloadsSection.View', [
    'MyDownloadsSection.Model',
    'PageType.Base.View',

    'section-mydownloads.tpl',

    'jQuery',
    'underscore'
], function MyDownloadsSectionView(
    MyDownloadsSectionModel,
    PageType,

    myDownloadsSectionTpl,

    jQuery,
    _
) {
    'use strict';

    var ALLOWED_KEYS = [
        {
            key: 'fileURL',
            type: 'long'
        },
        {
            key: 'description',
            type: 'long'
        },
        {
            key: 'licenseCode',
            type: 'text'
        }
    ];
    // var DOWNLOAD_LABEL = 'View/Download';
    var DOWNLOAD_NOURL = 'File not found';
    var DOWNLOAD_TPL = '<a href="$(0)" target="_blank" data-navigation="ignore-click">$(1)</a>';

    var MyDownloadsSection = PageType.PageTypeBaseView.extend({
        template: myDownloadsSectionTpl,

        initialize: function initialize(options) {
            this.options = options;
            this.model = new MyDownloadsSectionModel();
            return PageType.PageTypeBaseView.prototype.initialize.call(this, arguments);
        },

        beforeShowContent: function beforeShowContent() {
            var promise = jQuery.Deferred();

            this.model.fetch({
                data: {
                    source: this.options.source
                }
            }).then(function afterModelFetch(data) {
                return data ? promise.resolve() : promise.reject();
            });
            return promise;
        },

        getSelectedMenu: function getSelectedMenu() {
            return this.options.groupEntryId;
        },

        getContext: function getContext() {
            var items = this.model.get('downloadableItems');
            var headers = [];
            var records = [];

            if (items.length) {
                _(items[0]).each(function eachField(field, key) {
                    var index = _(ALLOWED_KEYS).findIndex({ key: key });
                    if (index >= 0) {
                        headers[index] = {
                            'value': key !== 'fileURL' ? field.label || '' : items[0].file.label,
                            'class': ALLOWED_KEYS[index].type
                        };
                    }
                });
                _(headers).reject(_.isUndefined);

                records = _(items).map(function eachRecord(record) {
                    var values = [];

                    _(record).each(function eachField(field, key) {
                        var value = field.value;
                        var index = _(ALLOWED_KEYS).findIndex({ key: key });

                        if (index >= 0) {
                            if (key === 'fileURL') {
                                value = value ? _(DOWNLOAD_TPL).translate(
                                    value,
                                    record.file.value
                                ) : _(DOWNLOAD_NOURL).translate();
                            }
                            values[index] = {
                                'value': value || '',
                                'class': ALLOWED_KEYS[index].type
                            };
                        }
                    });
                    return _(values).reject(_.isUndefined);
                });
            }

            return {
                title: this.options.title,
                headers: headers,
                records: records,
                hasRecords: records.length > 0
            };
        }
    });

    // Return the AMD constructor.
    return MyDownloadsSection;
});
