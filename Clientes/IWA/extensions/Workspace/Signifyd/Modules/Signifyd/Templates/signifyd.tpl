{{#if showScript}}
<script>
    var head = document.getElementsByTagName('head')[0],
        script = document.createElement('script');
    script.src = 'https://cdn-scripts.signifyd.com/api/script-tag.js';
    script.id = 'sig-api';
    script.type = 'text/javascript';
    script.setAttribute('data-order-session-id','{{sessionId}}');
    head.appendChild(script);
</script>
{{/if}}
<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension

  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder

  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme

  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->
