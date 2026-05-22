{{#if relatedCategories}}
<section class="related-categories-card">
    <span class="related-categories-card-content test">
      <ul class="row">
          {{#each relatedCategories}}
          <li class="col-xs-6 col-sm-4 col-md-4 related-categories-card-content-column">
              <a class="thumbnail" href="{{urlcomponent}}" title>
                  <img src="{{img}}" alt>
              </a>
              <h3 class="legend">
                  <a href="{{urlcomponent}}">{{name}}</a>
              </h3>
          </li>
          {{/each}}
      </ul>
    </span>
</section>
{{else}}
    {{translate "Works with everything in our website!"}}
{{/if}}



<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension

  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder

  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme

  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->
