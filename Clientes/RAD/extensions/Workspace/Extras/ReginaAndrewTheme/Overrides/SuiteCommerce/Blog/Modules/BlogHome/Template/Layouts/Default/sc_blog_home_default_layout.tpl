<link rel="stylesheet" href="https://use.typekit.net/zbx7coc.css">

<main>
<div class="sc-blog-home-default-layout">
  <div class="sc-blog-home-default-layout-cms-area-full-width-column"
       data-cms-area-filters="path" data-cms-area="blog-home-cms-area-1">
  </div>
  <div class="sc-blog-home-default-layout-cms-area-row">
    <div class="sc-blog-home-default-layout-cms-area-column"
         data-cms-area-filters="path" data-cms-area="blog-home-cms-area-2"></div>
    <div class="sc-blog-home-default-layout-cms-area-column"
         data-cms-area-filters="path" data-cms-area="blog-home-cms-area-3"></div>
  </div>

  {{#if showRssFeedLink}}
    <div class="sc-blog-home-default-layout-page-rss">
      <a href="/SuiteCommerceBlogRSS.xml" target="_blank"><i class="sc-blog-home-default-fa-rss-square"></i></a>
    </div>
  {{/if}}

  <div class="sc-blog-home-default-layout-page-title">
    <h1><a href="{{url}}">{{header}}</a></h1>
  </div>

  <div class="sc-blog-home-default-layout-cms-area-row">
    <div class="sc-blog-home-default-layout-cms-area-column"
         data-cms-area-filters="path" data-cms-area="blog-home-cms-area-4"></div>
    <div class="sc-blog-home-default-layout-cms-area-column"
         data-cms-area-filters="path" data-cms-area="blog-home-cms-area-5"></div>
  </div>
  <div class="sc-blog-home-default-layout-cms-area-full-width-column"
       data-cms-area-filters="path" data-cms-area="blog-home-cms-area-6">
  </div>

  <div class="sc-blog-home-default-layout-cms-area-row">
    <div class="sc-blog-home-default-layout-cms-area-column"
         data-cms-area-filters="path" data-cms-area="blog-home-cms-area-7"></div>
    <div class="sc-blog-home-default-layout-cms-area-column"
         data-cms-area-filters="path" data-cms-area="blog-home-cms-area-8"></div>
  </div>
  <div class="sc-blog-home-default-layout-cms-area-full-width-column"
       data-cms-area-filters="path" data-cms-area="blog-home-cms-area-9">
  </div>

  {{#unless showEmptyState }}
    {{#if isHomePage }}
      <div class="sc-blog-home-default-layout-latest-posts" data-view="LatestPosts.View"></div>
    {{/if}}

    {{#unless isPostListFiltered }}
      <div class="sc-blog-home-default-layout-featured-post-list" data-component="featured-post-list"
           data-view="FeaturedPostList.View"></div>
    {{/unless}}

    {{#if isPostListFilteredByCategory}}
      <div class="sc-blog-home-default-layout-featured-posts-in-category" data-component="featured-posts-in-category"
           data-view="FeaturedPostsInCategory.View"></div>
    {{/if}}
  {{/unless}}

  <div class="sc-blog-home-default-layout-cms-area-row">
    <div class="sc-blog-home-default-layout-cms-area-column"
         data-cms-area-filters="path" data-cms-area="blog-home-cms-area-10"></div>
    <div class="sc-blog-home-default-layout-cms-area-column"
         data-cms-area-filters="path" data-cms-area="blog-home-cms-area-11"></div>
  </div>
  <div class="sc-blog-home-default-layout-cms-area-full-width-column"
       data-cms-area-filters="path" data-cms-area="blog-home-cms-area-12">
  </div>

  <div class="sc-blog-home-default-layout-content" data-component="content">
    {{#if showEmptyState }}
      <div class="sc-blog-home-default-layout-content-empty-state" data-view="EmptyState.View"></div>
    {{else}}
      <div class="sc-blog-home-default-layout-content-header-block">
        <div class="sc-blog-home-default-layout-content-header-block-navigation {{#if
          isPostListFilteredByPhrase}}{{#sc_ext_when postListSize '===' 0}}extra-large-taxonomy-list{{else}}large-taxonomy-list{{/sc_ext_when}}{{/if}}">
          <div class="sc-blog-home-default-layout-content-header-block-navigation-search{{#if
            isPostListFilteredByPhrase}} hidden-in-desktop{{/if}}"
               data-view="PostSearch.View"></div>
          <div class="sc-blog-home-default-layout-content-header-block-navigation-taxonomies"
               data-view="TaxonomyNavigation.View"></div>
          <div class="clearfix"></div>
        </div>
        <div class="sc-blog-home-default-layout-content-header-block-posts" role="region" aria-label="Articles">
          <div class="sc-blog-home-default-layout-content-header-block-posts-search{{#if
            isPostListFilteredByPhrase}} show-in-desktop{{/if}}"
               data-view="PostSearch.View"></div>
          <h5 class="sc-blog-home-default-layout-content-header-block-posts-large-device-title" tabindex="0">{{postListTitle.label}} {{postListTitle.text}}</h5>
          {{# sc_ext_when (sc_ext_when isPostListFilteredByAuthor '||' isPostListFilteredByTag) '||'
                          isPostListFilteredByPhrase}}
            <div class="sc-blog-home-default-layout-content-header-block-posts-small-device-title {{#if
              isPostListFilteredByPhrase}}label-as-title{{/if}}">
              {{#if postListTitle.text}}
                <h5 class="label"><small>{{postListTitle.label}}</small></h5>
                <h5>{{postListTitle.text}}</h5>
              {{else}}
                <h5>{{postListTitle.label}}</h5>
              {{/if}}
            </div>
          {{/sc_ext_when}}
          <div class="sc-blog-home-default-layout-content-header-block-posts-list"
               data-view="HeaderBlockPostList.View"></div>
          <div class="sc-blog-home-default-layout-content-header-block-posts-suggestions"
               data-view="SuggestionsList.View"></div>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="sc-blog-home-default-layout-content-posts-block small-card-variation-for-desktop"
           data-view="ContentPostList.View"></div>
      <div class="sc-blog-home-default-layout-content-pagination" data-view="PostListPagination.View"></div>
    {{/if}}
  </div>

  <div class="sc-blog-home-default-layout-cms-area-row">
    <div class="sc-blog-home-default-layout-cms-area-column"
         data-cms-area-filters="path" data-cms-area="blog-home-cms-area-13"></div>
    <div class="sc-blog-home-default-layout-cms-area-column"
         data-cms-area-filters="path" data-cms-area="blog-home-cms-area-14"></div>
  </div>
  <div class="sc-blog-home-default-layout-cms-area-full-width-column"
       data-cms-area-filters="path" data-cms-area="blog-home-cms-area-15"></div>
</div>
</main>
