{{#each stepGroups}}
    <div class="order-wizard-steps-step {{elClass}}">
        <a href="{{linkUrl}}" class="order-wizard-steps-step-name">
            <span class="order-wizard-steps-step-number">{{counter}}</span>
            {{name}}
            <i class="{{iconClass}}"></i>
        </a>
    </div>
{{/each}}
