<section class="invlocdep-info-card">
    <!-- <span class="invlocdep-info-card-content">
      Current Stock: {{quantity}}
    </span> -->
    {{#if noItem}}
    <p<span class="noItem">NO ITEM AVAILABLE IN ANY LOCATION</span></p>
    {{else}}
    {{#each locations}}
    <p><span class="label">{{location}}:</span> {{quantityavailable}}</p>
    {{/each}}
    {{/if}}
</section>



<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->