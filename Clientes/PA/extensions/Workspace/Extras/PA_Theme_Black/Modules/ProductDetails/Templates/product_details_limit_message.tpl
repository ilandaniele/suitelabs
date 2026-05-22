{{#if limits}}
    {{#if isLimitMessageEnabled}}
    <div class="limit-message">
        <strong>
            {{{limitMessageFront}}} {{limits}} {{{limitMessageMiddle}}} {{limits}} {{{limitMessageEnd}}}
        </strong>
    </div>
    {{/if}}
{{/if}}