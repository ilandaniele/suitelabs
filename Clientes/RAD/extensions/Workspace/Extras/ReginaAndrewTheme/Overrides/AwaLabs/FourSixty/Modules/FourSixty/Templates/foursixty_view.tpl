
<div class="foursixty">
    {{#if isInHome}}
        {{!----
        <div class="foursixty-header">
            <h1> <a href="https://www.instagram.com/reginaandrewdetroit/">{{translate '#reginaandrewdetroit'}}</a></h1>
            <div class="foursixty-header-details">
                <span>{{translate 'share your rad style on'}}
                    <a href="https://www.instagram.com/reginaandrewdetroit/">{{translate 'INSTA'}}</a>
                    &
                    <a href="https://www.pinterest.com/reginaandrewdetroit/">{{translate 'PINTEREST'}}</a>
                </span>
            </div>
        </div>
        ----}}
    {{/if}}

    <div class="foursixty-container">
        <script data-feed-id="regina-andrew" data-open-links-in-same-page="false" data-theme="slider_v2_5" data-cell-size="25%" {{#if dataFromURL}} data-for-url="true" {{else}} data-category-filter="Homepage" {{/if}}></script>
    </div>

    {{#unless isInHome}}
        {{!----
        <div class="foursixty-header">
            <h1> <a href="https://www.instagram.com/reginaandrewdetroit/">{{translate '#reginaandrewdetroit'}}</a></h1>
            <div class="foursixty-header-details">
                <span>{{translate 'share your rad style on'}}
                    <a href="https://www.instagram.com/reginaandrewdetroit/">{{translate 'INSTA'}}</a>
                    &
                    <a href="https://www.pinterest.com/reginaandrewdetroit/">{{translate 'PINTEREST'}}</a>
                </span>
            </div>
        </div>
        ----}}
    {{/unless}}

</div>

