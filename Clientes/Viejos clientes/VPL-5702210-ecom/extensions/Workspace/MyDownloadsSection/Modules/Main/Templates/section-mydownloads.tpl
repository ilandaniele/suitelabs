<section class="my-downloads-section">
    <h2 class="my-downloads-list-header">{{title}}</h2>
    {{#if hasRecords}}
    <table class="my-downloads-list-recordviews-actionable-table">
        <thead class="my-downloads-list-recordviews-actionable-header">
            <tr>
                {{#each headers}}
                <th class="my-downloads-list-recordviews-actionable-{{class}}-header">
                    {{value}}
                </th>
                {{/each}}
            </tr>
        </thead>
        <tbody class="my-downloads-list">
            {{#each records}}
            <tr class="my-downloads-recordviews-actionable">
                {{#each this}}
                <td class="my-downloads-recordviews-actionable-{{class}}">
                    {{{value}}}
                </td>
                {{/each}}
            </tr>
            {{/each}}
        </tbody>
    </table>
    {{else}}
    <div class="my-downloads-list-empty-section">
        <h5>{{translate "No recent downloads"}}</h5>
    </div>
    {{/if}}
</section>
