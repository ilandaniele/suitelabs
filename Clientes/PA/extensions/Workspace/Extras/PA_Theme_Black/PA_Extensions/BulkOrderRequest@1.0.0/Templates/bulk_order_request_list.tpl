<div class="bulk_order_list_wrapper">
    {{log recordItems}}
    <div class="container">
        <div class="bulk_order_header">
            <h2 class="bulk_order_page_title">Bulk Order Request List</h2>
        </div>

        <table>
            <thead>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Email</th>
                <th>Status</th>
            </thead>
            <tbody>
                {{#if recordItems}}
                    {{#each recordItems}}
                        <tr>
                            <td>
                                {{itemName}}
                            </td>
                            <td>
                                {{quantity}}
                            </td>
                            <td>
                                {{email}}
                            </td>
                            <td>
                                {{status}}
                            </td>
                        </tr>
                    {{/each}}
                    {{else}}
                        <tr>
                            <td>No Items found</td>
                        </tr>
                {{/if}}

            </tbody>
        </table>
    </div>
</div>