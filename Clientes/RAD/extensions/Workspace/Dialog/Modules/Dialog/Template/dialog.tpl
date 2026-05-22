<div class="dialog-content"
     {{#if hasName}}
     ns-dialog-name="{{name}}"
     {{/if}}>
{{#if hasHeaderText}}
<section class="dialog-header">
    <h2>{{headerText}}</h2>
</section>
{{/if}}
<section class="dialog-body">
    {{{bodyHtml}}}
</section>
<section class="dialog-footer">
    {{#if hasCancelButton}}
    <button type="button"
            class="dialog-footer-cancel-button"
            data-dismiss="modal"
            aria-hidden="true">{{cancelButtonText}}
    </button>
    {{/if}}
    {{#if hasOkButton}}
    <button type="button"
            class="dialog-footer-ok-button"
            data-dismiss="modal"
            aria-hidden="true">{{okButtonText}}</button>
    {{/if}}
</section>
</div>

