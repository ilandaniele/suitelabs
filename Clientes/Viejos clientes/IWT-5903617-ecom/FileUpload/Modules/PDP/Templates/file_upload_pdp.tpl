<section class="product-details-upload-file-main">
    {{#if displayFileUploadForm}}
    <form method="post" class="custom-file-form">
        <p>{{titleText}}</p>
        <div class="product-details-upload-file-fields">
            {{#if displayFileInput}}
                <input class="product-details-upload-file" name="pdpUploadFile" type="file" />
                <input class="product-details-upload-file-remove hide" name="pdpUploadFileRemove" type="reset" value="x" />
            {{else}}
                <div class="product-details-upload-file-current-file">
                    {{#if currentFileUrl}}
                        {{translate 'Uploaded file:'}}
                        <a target="_blank" href="{{currentFileUrl}}">{{currentFile}}</a>
                    {{else}}
                        {{translate 'Uploaded file: $(0)' currentFile}}
                    {{/if}}
                </div>
                <button class="product-details-upload-file-change" type="button" data-action="reset-current-file">{{translate 'Change file'}}</button>
            {{/if}}
        </div>
    </form>
    <p class="product-details-upload-file-info">
        {{{fileInformationText}}}
    </p>
    {{/if}}
</section>
