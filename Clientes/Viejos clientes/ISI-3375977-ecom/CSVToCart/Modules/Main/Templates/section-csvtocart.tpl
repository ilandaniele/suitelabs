<section class="csv-to-cart-card">
    <span class="csv-to-cart-card-content">
        <header class="csv-to-cart-section-header">
            <h2>{{ translate 'Import CSV Order' }}</h2>
        </header>
        <form method="post" class="custom-file-form">
            <div class="form-container">
                <div class="download-template">
                    <div class="title">{{ translate 'Download Template:' }}</div>
                    <a class="download-href" href="../site/CSVFormat.csv" target="_blank">
                         <img class="download-image" src="../assets/download-icon.png" alt="Download Button Image">
                    </a>
                </div>

                <div class="import-file">
                    <div class="title">{{ translate 'Import File:' }}</div>
                    <input class="upload-file" name="uploadFile" type="file"/>
                    <button type="button" class="button" data-action="import">{{ translate 'Import' }}</button>
                </div>
            </div>
            {{#if rowsAffected}}
            <div class="rows-affected">
                <h2 class="title">{{ translate 'IMPORT ORDER (RESULTS)' }}</h2>
                <div class="title">{{ translate 'Rows processed :' }} {{ processed }}</div>
                <div class="title">{{ translate 'Rows added :' }} {{ added }}</div>
                <div class="title">{{ translate 'Rows skipped :' }} {{ skipped }}</div>
            </div>
            {{/if}}
            {{#if error}}
            <div class="error">
                {{error}}
            </div>
            {{/if}}
        </form>
    </span>
</section>
