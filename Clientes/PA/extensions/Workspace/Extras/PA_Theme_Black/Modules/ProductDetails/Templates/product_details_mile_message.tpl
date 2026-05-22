{{#unless isLoggedIn}}
    {{#if mil_le_exclude}}
        {{#unless hideMessage}}
            <div class="purchase-eligibility price-level-message">
                <div class="message-icon">
                    <i class="fa fa-exclamation-triangle"></i>
                </div>
                <div class="message-body">
                    {{translate 'This item is restricted to'}} {{priceLevelMessage}}.
                    {{translate 'Please <a href="$(0)" data-navigation="ignore-click">LOGIN</a> with a qualified account.' urlLogin}}
                    {{translate 'Don\'t have an account? <a href="/government/restricted-items" data-navigation="ignore-click">LEARN MORE</a>'}}
                </div>
            </div>      
        {{/unless}}
    {{/if}}
{{/unless}}

{{#if isLoggedIn}}
    {{#if mil_le_exclude}}
        {{#unless hideMessage}}
            <div class="purchase-eligibility price-level-message">
                <div class="message-icon">
                    <i class="fa fa-exclamation-triangle"></i>
                </div>
                <div class="message-body">
                    {{translate 'This item is restricted to'}} {{priceLevelMessage}}.
                    {{translate '<a href="/government/restricted-items" data-navigation="ignore-click">LEARN MORE</a>'}}
                    {{translate 'about how you can gain access to exclusive pricing.'}}
                </div>
            </div>      
        {{/unless}}
    {{/if}}
{{/if}}