{{#if assamblyInstrucitonsLink}}
  <a class="product-assambly-instructions"{{#if isUserLoggedIn}} href="{{assamblyInstrucitonsLink}}" target="_blank"{{else}} data-action="showModal"{{/if}}>
    <i class="icon-assambly"></i>
    <span>{{translate 'Installation Guide'}}</span>
  </a>
{{/if}}