define('SuiteLabs.CoolingCalculator.Main', [
    'CoolingCalculator.View',
    'CoolingCalculator.Results.View',
    'CoolingCalculator.Results.Model',
    'Backbone',
    'jQuery',
    'underscore'
], function SuiteLabsCoolingCalculatorMain(
    CoolingCalculatorView,
    CoolingCalculatorResultsView,
    CoolingCalculatorResultsModel,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    var FORM_PAGE_FRAGMENT = 'cellar-sizing-tool';

    var CCID_FORM_META_ATTR = 'data-ccid';
    var CCID_ENTITY_FIELD = 'custentity_ccalc_id';
    var DATA_ENTITY_FIELD = 'custentity_ccalc_data';

    var FORM_INSULATION_CONCRETE_BLOCK_4 = '10';
    var FORM_INSULATION_CONCRETE_BLOCK_8 = '11';
    var FORM_INSULATION_CONCRETE_BLOCK_12 = '12';
    var FORM_INSULATION_POURED_CONCRETE = '13';
    var FORM_INSULATION_ENTER_RVALUE_ID = '23';

    var FORM_EXPOSURE_BELOW_GRADE = '3';
    var FORM_EXPOSURE_ON_GRADE = '4';

    var displayError = function displayError($container, errorCode, errorMessage, $targetInput, inlineStyles, noFocus) {
        var className = 'message-error';
        var noError = !errorMessage;
        var errorId = $targetInput ? $targetInput.attr('id') || $targetInput.attr('name') || 'generic-error' : 'generic-error';
        var errorData = 'data-error="' + errorCode + '.' + errorId + '"';
        var $errorContainer;

        var inputHasAnotherError = function inputHasAnotherError() {
            var idRegExp = new RegExp('.' + errorId + '$');
            var hasError = false;

            $container.parent().find('[data-error]').each(function eachInput() {
                var inputDataError = jQuery(this).data('error');
                hasError = hasError || idRegExp.test(inputDataError);
            });
            return hasError;
        };

        $errorContainer = $container.parent().find('[' + errorData + ']');
        if (noError) {
            $errorContainer.remove();
        } else if ($errorContainer.length) {
            $errorContainer.html(errorMessage);
        } else {
            $container.after(
                '<div ' + errorData + ' class="' + className + '" style="' + inlineStyles + '">'
                    + errorMessage +
                '</div>'
            );
        }

        if (noError) {
            if ($targetInput && !inputHasAnotherError()) {
                $targetInput.removeClass(className);
            }
        } else if ($targetInput) {
            $targetInput.addClass(className);
            if (!noFocus) { $targetInput.focus(); }
        }
    };

    var getFieldValue = function getFieldValue($field) {
        var ret;

        if ($field.attr('type') !== 'checkbox') {
            ret = $field.val();
        } else {
            ret = $field.is(':checked');
        }

        return ret;
    };

    var setAutocalculatedFields = function setAutocalculatedFields(jsonData) {
        return jsonData;
    };

    // Returns the R value for the material and thickness and location
    var getMaterialRValue = function getMaterialRValue(material, thickness, location) {
        var r;
        var results;

        if (!material || material === FORM_INSULATION_ENTER_RVALUE_ID) {
            return '';
        }

        results = SC.SESSION.rValues.filter(function eachValue(rData) {
            return rData.material === material && (!location || rData.location.indexOf(location) !== -1);
        });

        if (results.length) {
            r = (Number(results[0].rValue)) * (Number(results[0].thickness) || Number(thickness));
        }

        return r || '';
    };

    var calculateR = function calculateR($this) {
        var $row = $this.closest('.row');
        var material = $row.find('[name*="Insulation"]').val();
        var thickness = $row.find('[name*="Thickness"]').val();
        var location = $row.find('[name*="Exposure"]').val();

        return getMaterialRValue(material, thickness, location);
    };

    var recalcThiknessesAndRValues = function recalcThiknessesAndRValues($this, thikness, disabled) {
        var $row = $this.closest('.row');
        var $rValue = $row.find('[name*="RValue"]');
        var $thickness = $row.find('[name*="Thickness"]');
        var rValue;

        $thickness.prop('disabled', disabled).val(
            thikness || $thickness.data('default-value')
        );

        rValue = calculateR($rValue, 'material');
        $rValue.prop('disabled', disabled || !thikness).val(rValue).trigger('change');
    };

    // Use the Pythagorean theorem to calculate the length of the hypotenuse
    var pythagorean = function pythagorean(sideA, sideB) {
        return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
    };

    var onCellarDimsChange = function onCellarDimsChange($form) {
        var shape = $form.find('[name="shape"]').val();
        var depth;
        var width;
        var height1;
        var height2;
        var heightAverage;
        var hypotenuse;
        var volume;
        var wallAreas = [];
        var wallAreaFields = [
            'frontWallArea',
            'leftWallArea',
            'rearWallArea',
            'rightWallArea',
            'ceilingArea',
            'floorArea'
        ];
        var i;

        if (shape === '1') {  // 1 = rectangular
            $form.find('[name="height2"]').val(
                $form.find('[name="height1"]').val()
            );
        }

        depth = Number($form.find('[name="depth"]').val() || 0);
        width = Number($form.find('[name="width"]').val() || 0);
        height1 = Number($form.find('[name="height1"]').val() || 0);
        height2 = Number($form.find('[name="height2"]').val() || 0);

        heightAverage = (height1 + height2) / 2;
        wallAreas[0] = width * heightAverage;
        wallAreas[1] = depth * height1;
        wallAreas[2] = width * heightAverage;
        wallAreas[3] = depth * height2;

        hypotenuse = pythagorean((height1 - height2), width);
        wallAreas[4] = hypotenuse * depth;
        wallAreas[5] = depth * width;

        volume = depth * width * heightAverage;

        for (i = 0; i < wallAreaFields.length; i++) {
            $form.find('[name="' + wallAreaFields[i] + '"]').val(
                Math.round(wallAreas[i], 1)
            );
        }
        $form.find('[name="volume"]').val(
            Math.round(volume, 1)
        );
    };

    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var pageType = container.getComponent('PageType');

            pageType.registerPageType({
                name: 'CoolingCalculator',
                view: CoolingCalculatorView,
                routes: [FORM_PAGE_FRAGMENT]
            });

            pageType.registerPageType({
                name: 'CoolingCalculator',
                view: CoolingCalculatorResultsView,
                routes: [FORM_PAGE_FRAGMENT + '/:id']
            });

            if (environment) {
                environment.coolingCalculatorModel = new CoolingCalculatorResultsModel();

                environment.on('customFormAfterSubmit', function afterFormSubmit() {
                    var model = environment.coolingCalculatorModel;
                    var $form = jQuery('form[data-form-id]');
                    var $preview = $form.find('#preview-button');
                    var isPreview = $form.find('[name="custentity_ccalc_preview"]').val() === 'T';
                    
                    // Reset the preview flags immediately to ensure the form stays clean
                    if (isPreview) {
                        $form.find('[name="custentity_ccalc_preview"]').val('');
                        $form.find('[data-prevent-clear-fields]').val('false');
                    }

                    model.fetch({
                        data: {
                            action: 'getTLCId',
                            formId: model.get('formId')
                        }
                    }).always(function afterFetch(tlcId) {
                        if (tlcId) {
                            var resultsUrl = '/' + FORM_PAGE_FRAGMENT + '/' + tlcId;

                            if (isPreview) {
                                // For preview, open in a new window and leave the form as is
                                window.open(resultsUrl, '_blank');
                                var buttonCheckInterval = $form.data('button-check-interval');
                                if (buttonCheckInterval) {
                                    clearInterval(buttonCheckInterval);
                                }
                                $preview.prop('disabled', false).text($preview.data('original-text'));
                            } else {
                                // For normal submit, navigate to the results page
                                Backbone.history.navigate(resultsUrl, {
                                    trigger: true
                                });
                            }
                        } else {
                            setTimeout(function customFormAfterSubmit() {
                                environment.cancelableTrigger('customFormAfterSubmit');
                            }, 3000);
                        }
                    });
                });

                environment.on('customFormBeforeSubmit', function beforeFormSubmit(options) {
                    var ccid;
                    var jsonData = {};
                    var $form;
                    var $deferred = jQuery.Deferred();
                    var isValidFormData = true;
                    var model;
                    var config = environment.getConfig('coolingCalculator');
                    var errorMessages = {};
                    var isPreview = false;

                    if (options.triggeringForm === config.formId) {
                        $form = jQuery('form[data-form-id]');
                        model = environment.coolingCalculatorModel;
                        $form.find('[name]').each(function eachField() {
                            var $field = jQuery(this);
                            var name = $field.attr('name');

                            if (name === 'custentity_ccalc_preview' && $field.val() === 'T') {
                                isPreview = true;
                            }

                            if (name !== DATA_ENTITY_FIELD && name !== CCID_ENTITY_FIELD) {
                                jsonData[name] = getFieldValue($field);
                            }
                        });

                        // Field validation

                        $form.find('#cooling-calc-construction-info').find('input[min], input[max]').each(function eachInput() {
                            var $input = jQuery(this);
                            var $row = $input.closest('.row');
                            var inputName = $input.attr('name');
                            var inputIsDisabled = $input.is(':disabled');
                            var min = inputIsDisabled ? NaN : parseFloat($input.attr('min'));
                            var max = inputIsDisabled ? NaN : parseFloat($input.attr('max'));
                            var val = parseFloat($input.val());
                            var errorStyle = 'display:block; margin: -6px 0 4px;';
                            var errorCode = 'limitValue.' + inputName;
                            var errorMessage;

                            var getErrorMessage = function getErrorMessage(min, max) {
                                var nanErrorMessage = '$(0) must be between $(1) and $(2)';
                                var minErrorMessage = '$(0) must be greater than or equal to $(1)';
                                var maxErrorMessage = '$(0) must be less than or equal to $(2)';

                                return isNaN(min) ? maxErrorMessage : (isNaN(max) ? minErrorMessage : nanErrorMessage);
                            };

                            if ((isNaN(val) && !(isNaN(min) && isNaN(max)))
                                || (!isNaN(min) && min > val)
                                || (!isNaN(max) && val > max)) {
                                    isValidFormData = false;
                                    errorMessage = _.translate(
                                        getErrorMessage(min, max),
                                        $input.data('label') || inputName, min, max
                                    );
                                    displayError(
                                        $row,
                                        errorCode,
                                        errorMessage,
                                        $input,
                                        errorStyle,
                                        true
                                    );
                                    errorMessages[errorCode] = errorMessage;
                            } else {
                                displayError($row, errorCode, '', $input);
                            }
                        });

                        // [
                        //     'frontWallRValue', 'leftWallRValue',
                        //     'rearWallRValue', 'rightWallRValue',
                        //     'ceilingRValue', 'floorRValue'
                        // ].forEach(function eachRValue(fieldName) {
                        //     var $row = $form.find('[name="' + fieldName + '"]').closest('.row');
                        //     var $insulation = $row.find('[name*="Insulation"]');
                        //     var $rValue = $row.find('[name*="RValue"]');
                        //     var errorCode = 'rValue';
                        //     var errorStyle = 'display:block; margin: -6px 0 4px;';
                        //     var errorMessage = 'Chosen insulation requires an R-Value';

                        //     if ($insulation.val() === FORM_INSULATION_ENTER_RVALUE_ID && !$rValue.val().trim()) {
                        //         isValidFormData = false;
                        //         displayError(
                        //             $row,
                        //             errorCode,
                        //             errorMessage,
                        //             $rValue,
                        //             errorStyle,
                        //             true
                        //         );
                        //         errorMessages[errorCode] = errorMessage;
                        //     } else {
                        //         displayError($row, errorCode, '', $rValue);
                        //     }
                        // });

                        [
                            'frontWallArea', 'leftWallArea',
                            'rearWallArea', 'rightWallArea'
                        ].forEach(function eachWallArea(fieldName) {
                            var $row = $form.find('[name="' + fieldName + '"]').closest('.row');
                            var $wallArea = $row.find('[name*="WallArea"]');
                            var $glassArea = $row.find('[name*="GlassArea"]');
                            var errorCode = 'wallArea';
                            var errorStyle = 'display:block; margin: -6px 0 4px;';
                            var errorMessage = 'Glass Area cannot exceed Wall Area';

                            if (Number($glassArea.val()) > Number($wallArea.val())) {
                                isValidFormData = false;
                                displayError(
                                    $row,
                                    errorCode,
                                    errorMessage,
                                    $glassArea,
                                    errorStyle,
                                    true
                                );
                                errorMessages[errorCode] = errorMessage;
                            } else {
                                displayError($row, errorCode, '', $glassArea);
                            }
                        });

                        // ----------------

                        if (isValidFormData) {
                            jsonData = setAutocalculatedFields(jsonData, $form);
                                                        
                            // Store isPreview flag in the data
                            jsonData.isPreview = isPreview;
                            
                            $form.find('[name="' + DATA_ENTITY_FIELD + '"]').val(
                                JSON.stringify(jsonData)
                            );

                            ccid = $form.find('[' + CCID_FORM_META_ATTR + ']').val().trim();
                            model.set('formId', ccid.toLowerCase() + '#' + String(new Date().getTime()));
                            model.set('isPreview', isPreview);
                            $form.find('[name="' + CCID_ENTITY_FIELD + '"]').val(model.get('formId'));

                            $deferred.resolve();
                        } else {
                            $deferred.reject(
                                _(_(errorMessages).toArray()).uniq().join(' / ') || 'Your request cannot be sent'
                            );
                        }
                    }
                    return $deferred;
                });
            }

            window.addEventListener('afterShowCoolingCalculatorForm', function afterShowCoolingCalculatorForm() {
                var $form = jQuery('form[data-form-id]');
                var rValue = '';

                $form.find('[name*="Insulation"]').on('change', function onInsulationChange(e, silent) {
                    var $this = jQuery(this);
                    var insulationValue = jQuery(this).val();

                    var $allInsulations = $form.find('[name*="Insulation"]');

                    var $closestRValue = $this.closest('.row').find('[name*="RValue"]');
                    var $closestThikness = $this.closest('.row').find('[name*="Thickness"]');

                    // Copy the values just once to make things easier for the user,
                    // once the user has made a selection then that decision should be preserved
                    if (this.name === 'frontWallInsulation') {
                        $allInsulations.each(function eachInsulation() {
                            var $each = jQuery(this);

                            $closestRValue = $each.closest('.row').find('[name*="RValue"]');
                            $closestThikness = $each.closest('.row').find('[name*="Thickness"]');

                            if ($each.data('freeze') !== 'T') {
                                $each.val(insulationValue);
                                switch ($each.val()) {
                                case FORM_INSULATION_ENTER_RVALUE_ID:
                                    $closestRValue.prop('disabled', false).val('');
                                    $closestThikness.prop('disabled', true).val('');
                                    break;
                                case FORM_INSULATION_CONCRETE_BLOCK_4:
                                    recalcThiknessesAndRValues($each, '4', true);
                                    break;
                                case FORM_INSULATION_CONCRETE_BLOCK_8:
                                    recalcThiknessesAndRValues($each, '8', true);
                                    break;
                                case FORM_INSULATION_CONCRETE_BLOCK_12:
                                    recalcThiknessesAndRValues($each, '12', true);
                                    break;
                                default:
                                    recalcThiknessesAndRValues($each, '', false);
                                    break;
                                }
                            }
                        });
                    } else {
                        switch ($this.val()) {
                        case FORM_INSULATION_ENTER_RVALUE_ID:
                            $closestRValue.prop('disabled', false).val('');
                            $closestThikness.prop('disabled', true).val('');
                            break;
                        case FORM_INSULATION_CONCRETE_BLOCK_4:
                            recalcThiknessesAndRValues($this, '4', true);
                            break;
                        case FORM_INSULATION_CONCRETE_BLOCK_8:
                            recalcThiknessesAndRValues($this, '8', true);
                            break;
                        case FORM_INSULATION_CONCRETE_BLOCK_12:
                            recalcThiknessesAndRValues($this, '12', true);
                            break;
                        default:
                            recalcThiknessesAndRValues($this, '', false);
                            break;
                        }
                        $this.attr('data-freeze', 'T');

                        if (this.name === 'floorInsulation') {
                            $this.closest('.row').find('[name="floorExposure"]').trigger('change');
                        }
                    }
                });

                $form.find('[name*="Thickness"]').on('change', function onThicknessChange() {
                    var $this = jQuery(this);
                    var $rValue = $this.closest('.row').find('[name*="RValue"]');

                    rValue = calculateR($this, 'thickness');
                    return rValue ? $rValue.val(rValue).trigger('change') : '';
                });

                $form.find('[name*="RValue"]').on('change', function onThicknessChange() {
                    var $this = jQuery(this);
                    var $insulation = $this.closest('.row').find('[name*="Insulation"]');
                    var isFrontWall = $insulation.attr('name') === 'frontWallInsulation';

                    return $insulation.attr('data-freeze', isFrontWall ? 'F' : 'T');
                });

                $form.find('[name*="Exposure"]').on('change', function onExposureChange() {
                    var $this = jQuery(this);
                    var $rValue = $this.closest('.row').find('[name*="RValue"]');

                    rValue = $this.val() ? calculateR($this, 'location') : '';
                    return rValue ? $rValue.val(rValue) : '';
                });

                $form.find(
                    '[name="depth"],'
                    + '[name="width"],'
                    + '[name="height1"],'
                    + '[name="height2"]'
                ).on('change', function onCellarDimensionChange() {
                    onCellarDimsChange($form);
                });

                $form.find('[name="shape"]').on('change', function onCellarShapeChange() {
                    var $this = jQuery(this);
                    var shape = $form.find('[name="shape"]').val();
                    var cellarDimFields = [
                        'depth',
                        'width',
                        'height1',
                        'height2'
                    ];
                    var wallAreaFields = [
                        'frontWallArea',
                        'leftWallArea',
                        'rearWallArea',
                        'rightWallArea',
                        'ceilingArea',
                        'floorArea'
                    ];
                    var newState = [];
                    var i;

                    switch (String($this.val())) {
                    case '1': // 1 = rectangular
                        newState = [false, false, false, true];
                        break;
                    case '2': // 2 = other
                        newState = [true, true, true, true];
                        break;
                    case '3': // 3 = under stairs
                        newState = [false, false, false, false];
                        break;
                    default:
                        // Do nothing
                    }

                    for (i = 0; i < cellarDimFields.length; i++) {
                        $form.find('[name="' + cellarDimFields[i] + '"]').prop('disabled', newState[i]);
                    }
                    for (i = 0; i < wallAreaFields.length; i++) {
                        $form.find('[name="' + wallAreaFields[i] + '"]').prop('disabled', !newState[0]); // note this is set opposite
                    }
                    $form.find('[name="volume"]').prop('disabled', !newState[0]); // note this is set opposite

                    if (shape === '3') {  // 3 = Under stairs
                        $form.find('.cooling-calc-height2-container').show();
                        $form.find('[name="height2"]').attr('data-validate-required', true);
                        $form.find('[name="height2"]').attr('data-validate-required-message', _.translate('Height is required'));
                    } else {
                        $form.find('.cooling-calc-height2-container').hide();
                        $form.find('[name="height2"]').removeAttr('data-validate-required');
                        $form.find('[name="height2"]').removeAttr('data-validate-required-message');
                        $form.find('[name="height2"]').val(''); // Clear the value
                    }

                    onCellarDimsChange($form);
                });

                $form.find('[name*="GlassArea"]').change(function onGlassAreaChange() {
                    var $glassArea = jQuery(this);
                    var $glassType = $glassArea.closest('.row').find('[name*="GlassType"]');
                    var areaIsZero = !Number($glassArea.val());

                    if (areaIsZero) {
                        $glassType.val('');
                    }
                    $glassType.prop('disabled', areaIsZero);
                });

                $form.find('[name="floorExposure"]').change(function onFloorExposureChange() {
                    var $row = jQuery(this).closest('.row');
                    var $exposure = $row.find('[name*="Exposure"]');
                    var $thickness = $row.find('[name*="Thickness"]');
                    var $insulation = $row.find('[name*="Insulation"]');

                    if (String($insulation.val()) === FORM_INSULATION_POURED_CONCRETE &&
                        [FORM_EXPOSURE_BELOW_GRADE, FORM_EXPOSURE_ON_GRADE].indexOf(String($exposure.val())) !== -1) {
                        $thickness.attr('disabled', 'T');
                    } else {
                        $thickness.removeAttr('disabled');
                    }
                });

                $form.find('#cooling-calc-construction-info').find('input[min], input[max]').each(function eachInput() {
                    var $input = jQuery(this);

                    $input.change(function onChange() {
                        var $row = $input.closest('.row');
                        var inputName = $input.attr('name');
                        var inputIsDisabled = $input.is(':disabled');
                        var min = inputIsDisabled ? NaN : parseFloat($input.attr('min'));
                        var max = inputIsDisabled ? NaN : parseFloat($input.attr('max'));
                        var val = parseFloat($input.val());
                        var errorStyle = 'display:block; margin: -6px 0 4px;';
                        var errorCode = 'limitValue.' + inputName;
                        var errorMessage;

                        var getErrorMessage = function getErrorMessage(min, max) {
                            var nanErrorMessage = '$(0) must be between $(1) and $(2)';
                            var minErrorMessage = '$(0) must be greater than or equal to $(1)';
                            var maxErrorMessage = '$(0) must be less than or equal to $(2)';

                            return isNaN(min) ? maxErrorMessage : (isNaN(max) ? minErrorMessage : nanErrorMessage);
                        };

                        if ((isNaN(val) && !(isNaN(min) && isNaN(max)))
                            || (!isNaN(min) && min > val)
                            || (!isNaN(max) && val > max)) {
                                errorMessage = _.translate(
                                    getErrorMessage(min, max),
                                    $input.data('label') || inputName, min, max
                                );
                                displayError(
                                    $row,
                                    errorCode,
                                    errorMessage,
                                    $input,
                                    errorStyle
                                );
                        } else {
                            displayError($row, errorCode, '', $input);
                        }
                    });
                });

                // ['frontWallRValue', 'leftWallRValue', 'rearWallRValue', 'rightWallRValue', 'ceilingRValue', 'floorRValue'].forEach(
                //     function eachRValue(fieldName) {
                //         $form.find('[name="' + fieldName + '"]').change(function onChange() {
                //             var $row = jQuery(this).closest('.row');
                //             var $insulation = $row.find('[name*="Insulation"]');
                //             var $rValue = $row.find('[name*="RValue"]');
                //             var errorCode = 'rValue';
                //             var errorStyle = 'display:block; margin: -6px 0 4px;';

                //             if ($insulation.val() === FORM_INSULATION_ENTER_RVALUE_ID && !$rValue.val().trim()) {
                //                 displayError(
                //                     $row,
                //                     errorCode,
                //                     'Chosen insulation requires an R-Value',
                //                     $rValue,
                //                     errorStyle
                //                 );
                //             } else {
                //                 displayError($row, errorCode, '', $rValue);
                //             }
                //         });
                //     }
                // );

                ['frontWallArea', 'leftWallArea', 'rearWallArea', 'rightWallArea',
                 'frontWallGlassArea', 'leftWallGlassArea', 'rearWallGlassArea', 'rightWallGlassArea'].forEach(
                    function eachWallArea(fieldName) {
                        // Create a debounced validation function
                        var debouncedValidation = _.debounce(function validateGlassArea() {
                            var $row = jQuery(this).closest('.row');
                            var $wallArea = $row.find('[name*="WallArea"]');
                            var $glassArea = $row.find('[name*="GlassArea"]');
                            var errorCode = 'wallArea';
                            var errorStyle = 'display:block; margin: -6px 0 4px;';

                            if (Number($glassArea.val()) > Number($wallArea.val())) {
                                displayError(
                                    $row,
                                    errorCode,
                                    'Glass Area cannot exceed Wall Area',
                                    $glassArea,
                                    errorStyle
                                );
                            } else {
                                displayError($row, errorCode, '', $glassArea);
                            }
                        }, 500);

                        // Bind both input and change events to the debounced function
                        $form.find('[name="' + fieldName + '"]')
                            .on('input', debouncedValidation)
                            .on('change', debouncedValidation);
                    }
                );

                $form.find('#preview-button').on('click', function onPreviewButtonClick(e) {
                    e.preventDefault();
                    var $form = jQuery('form[data-form-id]');
                    
                    // Set both preview flags to true
                    $form.find('[name="custentity_ccalc_preview"]').val('T');
                    $form.find('[data-prevent-clear-fields]').val('true');

                    $form.submit();
                });

                environment.on('customFormBeforeSubmit', function beforeFormSubmit(options) {
                    var $form = jQuery('form[data-form-id]');
                    var $submit = $form.find('[type="submit"]');
                    var $preview = $form.find('#preview-button');
                    
                    // Store original text
                    $submit.data('original-text', $submit.text());
                    $preview.data('original-text', $preview.text());

                    $submit.prop('disabled', true);
                    $preview.prop('disabled', true);
                    
                    // If the preview flag is true, then we need to show the preview button with a processing message
                    // and then restore the button text to the original text after the request is complete
                    // also avoid changing the text for the submit button
                    if ( $form.find('[name="custentity_ccalc_preview"]').val() == 'T') {
                        $preview.text('Processing...');
                        var buttonCheckInterval = setInterval(function() {
                            if ($submit.text() !== $submit.data('original-text')) {
                                $submit.text($submit.data('original-text'));
                                clearInterval(buttonCheckInterval);
                            }
                        }, 50);
                        $form.data('button-check-interval', buttonCheckInterval);
                    }

                });

                environment.on('customFormAfterSubmit', function afterFormSubmit() {
                    var $form = jQuery('form[data-form-id]');
                    var $submit = $form.find('[type="submit"]');
                    var $preview = $form.find('#preview-button');
                    var buttonCheckInterval = $form.data('button-check-interval');

                    if (buttonCheckInterval) {
                        clearInterval(buttonCheckInterval);
                    }
                    
                    // Restore buttons to original state
                    $submit.prop('disabled', false).text($submit.data('original-text'));
                    $preview.prop('disabled', false).text($preview.data('original-text'));
                });
            });

            environment.on('customFormAfterLoadLists', function afterLoadLists() {
                var $form = jQuery('form[data-form-id]');
                $form.find('[data-trigger="change"]').trigger('change', true);
            });
        }
    };
});
