<section class="inventory-location-quantities-table-card">
    <span class="inventory-location-quantities-table-card-content">
        <strong>{{title}}</strong>
        </br>
        {{#each table}}
            <div class="location-inventory-row">
                <div class="name"><strong>{{name}}</strong></div>
                <div class="quantity"><strong>{{quantity}}</strong></div>
            </div>
        {{/each}}
        </table>
    </span>
</section>
