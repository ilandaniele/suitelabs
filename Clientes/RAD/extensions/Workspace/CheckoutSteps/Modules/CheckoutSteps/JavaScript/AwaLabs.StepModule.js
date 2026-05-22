
define('AwaLabs.StepModule', [
    'Wizard.Module',
    'order_wizard_steps_module.tpl',
    'Backbone',
    'underscore',
    'Utils'
], function AwaLabsStepModule(
    WizardModule,
    orderWizardStepsModuleTpl,
    Backbone,
    _
) {
    'use strict';

    return WizardModule.extend({
        template: orderWizardStepsModuleTpl,
        model: new Backbone.Model(), // Fix for custom fields module,
        initialize: function initialize(options) {
            this.wizard = options.wizard;
            this.stepNumber = options.stepNumber || 1;
        },
        render: function render() {
            this._render();
            this.trigger('ready', true);
        },
        isActive: function isActive() {
            return true;
        },
        getContext: function getContext() {
            var steps;
            var self = this;
            var stepGroups = [];
            var errorsToDisplay = [];
            var counter = 0;

            steps = _.filter(_.toArray(this.wizard.stepGroups), function filterSteps(step) {
                var stepContainer = (self.options.container === '#wizard-step-content-steps-top' && step.state === 'present');
                var stepState = step.state === (self.options.container === '#wizard-step-content-steps-top' ? 'past' : 'future');

                if (step.showStepGroup()
                    && self.options.container === '#wizard-step-content-steps-bottom'
                    && (step.state === 'present' || step.state === 'past')) {
                    counter++;
                }
                return stepContainer || stepState;
            });

            _(steps).each(function eachStep(stepGroup) {
                var stepGroupData = {
                    name: stepGroup.name,
                    iconClass: '',
                    elClass: '',
                    linkUrl: '',
                    counter: 0
                };
                var iconClass = ' order-wizard-steps-step-icon-past';
                var stepGroupErrors = stepGroup.getErrors();

                if (stepGroup.showStepGroup()) {
                    if (stepGroup.state === 'present') {
                        iconClass = ' order-wizard-steps-step-icon-present';
                    } else if (stepGroup.state === 'future') {
                        iconClass = ' order-wizard-steps-step-icon-future';
                    }

                    if (stepGroupErrors && stepGroupErrors.length) {
                        iconClass += ' wizard-step-navigation-error';
                    }
                    stepGroupData.iconClass = iconClass;
                    stepGroupData.elClass = stepGroup.state;

                    stepGroupData.linkUrl = stepGroup.state === 'future' ? Backbone.history.fragment : stepGroup.getURL() + '?force=true';

                    errorsToDisplay = _.uniq(_.union(errorsToDisplay, stepGroupErrors), function unionErrors(item) {
                        return item.errorCode;
                    });

                    stepGroupData.counter = ++counter;

                    stepGroups.push(stepGroupData);
                }
            });

            return {
                stepGroups: stepGroups,
                errors: errorsToDisplay,
                showBackButton: !this.options.wizard.isCurrentStepFirst()
            };
        }
    });
});
