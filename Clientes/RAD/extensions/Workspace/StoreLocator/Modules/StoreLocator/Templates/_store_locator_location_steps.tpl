<section class="location-steps-container">
    {{#if hasSteps}}
    <div>
        <div class="adp-placemark">{{locationRouteModel.leg.start_address}}</div>
        <div class="step-line"><span>{{ locationRouteModel.leg.distance.text  }}</span><span> {{translate 'About' }} {{locationRouteModel.leg.duration.text }}</span></div>
        {{#each locationRouteModel.leg.steps }}
        <div class="step-line">
            <span class="step-icon {{#if maneuver}} with-icon{{/if}} {{ maneuver }}"></span>
            <span class="step-number">{{ @indexPlusOne }}.</span>
            <span class="step-intructions">{{{ instructions }}}</span>
            <span class="step-distance">{{ distance.text }}</span>
        </div>
        {{/each}}
        <div class="last-step">{{locationRouteModel.leg.end_address}}</div>
    </div>
    {{/if}}
</section>
