{{#if isLoggedIn}}
{{#if nomessage}}
<section class="fscmodule-info-card">
    <span class="fscmodule-info-card-content">
      {{diffShipNote1}} ${{diffShipAmt}} {{diffShipNote2}}
    </span>
</section>
{{else}}
<section class="fscmodule-info-card">
  <span class="fscmodule-info-card-content">
    {{freeShipMsg}}
  </span>
</section>
{{/if}}
{{/if}}


<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->