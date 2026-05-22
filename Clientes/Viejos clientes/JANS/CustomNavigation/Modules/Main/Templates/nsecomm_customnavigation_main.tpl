<section class="main-info-card">
    <span class="main-info-card-content">
      <header class="site-header">
        <figure class="logo"><a href="/" title="jans.com homepage" target="_parent" data-touchpoint="home" data-hashtag="#/"><img src="/Images/Content/Jans/jans-icon-100x100.gif" alt="Jans Icon" /></a></figure>
        <nav class="main-site-nav">
          <ul>
            {{#each firstLevels}}
              <li class="shop-category"> <a href="{{url}}" title="{{description}}" target="{{target}}" class="shop-link" data-touchpoint="home" data-hashtag="#{{url}}" data-level="1" onMouseOver="this.style.color='{{hoverColor}}'" onMouseOut="this.style.color='{{textColor}}'">{{text}}</a>
                <ul class="shop-nav">
                  <li>
                    <div class="shop-title">
                      <figure class="shop-icon"><img src="{{secondLevel.icon.imageUrl}}" alt="{{secondLevel.icon.alt}}" /></figure> <span>{{secondLevel.title.text}}</span> <span class="shop-message">{{secondLevel.subtitle.text}}</span>
                    </div>
                    <div class="shop-service-nav">
                      <ul>
                        {{#each secondLevel.links}}
                          {{#unless image}}
                            {{#if external}}
                                <li><a href="{{url}}" title="{{description}}" target="{{target}}" data-level="2" onMouseOver="this.style.backgroundColor='{{hoverColor}}'" onMouseOut="this.style.backgroundColor=''">{{text}} {{#if thirdLevel}}&#9660; {{/if}}</a>
                            {{else}}
                                <li><a href="{{url}}" title="{{description}}" target="{{target}}" data-touchpoint="home" data-hashtag="#{{url}}" data-level="2" onMouseOver="this.style.backgroundColor='{{hoverColor}}'" onMouseOut="this.style.backgroundColor=''">{{text}} {{#if thirdLevel}}&#9660; {{/if}}</a>
                            {{/if}}
                                    <ul class="service-sub-nav">
                                        {{#each thirdLevel}}
                                            <li><a href="{{url}}" title="{{description}}" target="{{target}}" data-touchpoint="home" data-hashtag="#{{url}}" data-level="3" onMouseOver="this.style.backgroundColor='{{hoverColor}}'" onMouseOut="this.style.backgroundColor=''">{{text}}</a></li>
                                        {{/each}}
                                    </ul>
                                </li>
                          {{/unless}}
                        {{/each}}
                      </ul>
                    </div>
                    <div class="shop-ecomm-nav">
                      <ul>
                        {{#each secondLevel.links}}
                          {{#if image}}
                            <li><a href="{{url}}" title="{{description}}"  target="{{target}}" data-touchpoint="home" data-hashtag="#{{url}}" data-level="2" onMouseOver="this.style.color='{{hoverColor}}'" onMouseOut="this.style.backgroundColor=''"><img src="{{imageUrl}}" alt="{{alt}}"/><span>{{text}}</span></a></li>
                          {{/if}}
                        {{/each}}
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
            {{/each}}
          </ul>
        </nav>
      </header>
    </span>
</section>
