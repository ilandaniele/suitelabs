<div class="deal-counter-wrap">
    {{#if showDays}}
        {{#if days}}
            <div class="deal-counter-item">
                <span>{{days}}</span>
                <span>{{days_label}}</span>
            </div>
        {{/if}}
    {{/if}}
    <div class="deal-counter-item">
        <span>{{hours}}</span>
        <span>{{hours_label}}</span>
    </div>
    <div class="deal-counter-item">
        <span>{{minutes}}</span>
        <span>{{minutes_label}}</span>
    </div>
    <div class="deal-counter-item">
        <span>{{seconds}}</span>
        <span>{{seconds_label}}</span>
    </div>
</div>