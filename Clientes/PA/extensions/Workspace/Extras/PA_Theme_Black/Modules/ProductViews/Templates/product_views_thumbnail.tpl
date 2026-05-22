{{#if itemIsNavigable}}
    <span class="facets-item-thumbnail-anchor">
        <img class="facets-item-thumbnail-image" src="{{brightedgeImageDomain 'noWebsiteDomain' 'thumbnail'}}{{resizeImage thumbnail.url 'thumbnail' 'removeImageUrlProtocol'}}" alt="{{thumbnail.altimagetext}}" {{#unless excludeSchemaFromPLP}}itemprop="image"{{/unless}}>
    </span>
    {{#if showRemoveIcon}}<span class="remove-icon" data-action="remove-item" data-item-id={{internalid}}></span> {{/if}}
{{else}}
    <img class="facets-item-thumbnail-image" src="{{brightedgeImageDomain 'noWebsiteDomain' 'thumbnail'}}{{resizeImage thumbnail.url 'thumbnail' 'removeImageUrlProtocol'}}" alt="{{thumbnail.altimagetext}}" {{#unless excludeSchemaFromPLP}}itemprop="image"{{/unless}}>
{{/if}}