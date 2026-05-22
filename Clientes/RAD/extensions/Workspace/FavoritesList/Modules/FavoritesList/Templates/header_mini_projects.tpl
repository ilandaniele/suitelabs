<a class="header-mini-cart-menu-cart-link {{#if showLines}}header-mini-cart-menu-cart-link-enabled{{/if}}" data-type="mini-projects" href="#" data-touchpoint="customercenter" data-hashtag="#overview" title="{{translate 'Projects'}}">
    <i class="header-menu-projects-icon" data-toggle="tooltip"></i>
    <span class="header-mini-cart-menu-cart-legend">

        {{#if isLoading}}
            <span class="header-mini-cart-summary-cart-ellipsis"></span>
        {{else}}
            {{translate '$(0) ' projectsCount}}
        {{/if}}
    </span>
</a>
<div class="header-mini-cart">
    {{#if showLines}}
        <h4>Projects</h4>
        <div data-view="Header.MiniProjectsItemCell" class="header-mini-projects-container"></div>
    {{else}}
        <div class="header-mini-cart-empty">
            <a>
                {{#if isLoading}}
                    {{translate 'Your projects are loading'}}
                {{else}}
                    {{translate 'You have no projects'}}
                {{/if}}
            </a>
        </div>
    {{/if}}
</div>
