{{#if show}}
  <div class="typeahead-trending-container">
    <div class="typeahead-trending-wrapper">
      {{#if hasCategories}}
        <div class="typeahead-section">
            <div class="typeahead-section-title"><strong>{{trendingCategoriesLabel}}</strong></div>
            <ul class="typeahead-category-list">
                {{#each categories}}
                  <li class="typeahead-category-item">
                      <a href="{{url}}" class="typeahead-category-link">
                          <span class="typeahead-checkmark">✔</span> {{name}}
                      </a>
                  </li>
                {{/each}}
            </ul>
        </div>
      {{/if}}

      {{#if hasProducts}}
        <div class="typeahead-section">
          <div class="typeahead-section-title"><strong>{{trendingProductsLabel}}</strong></div>
          <ul class="typeahead-product-list">
              {{#each products}}
                <li class="typeahead-product-item">
                    <a href="{{url}}" class="typeahead-product-link">
                        <div class="typeahead-product-info">
                            <div class="typeahead-product-name">{{name}}</div>
                            <div class="typeahead-product-sku">SKU: {{sku}}</div>
                            <div class="typeahead-product-manufacturer">Manufactured by {{manufacturer}}</div>
                        </div>
                    </a>
                </li>
              {{/each}}
          </ul>
        </div>
      {{/if}}
    </div>
  </div>
{{/if}}