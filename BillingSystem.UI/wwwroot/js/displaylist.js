//$(document).ready(function () {
//    // Check if data exists
//    if (!displayInvoiceItems || displayInvoiceItems.length === 0) {
//        console.warn("No invoice items found");
//        $("#displayInvoiceGrid").html('<div class="alert alert-info">No items to display</div>');
//        return;
//    }

//    console.log("Invoice Items:", displayInvoiceItems);

//    // Add unique ID to each item if not present
//    displayInvoiceItems.forEach((item, index) => {
//        if (!item.invoiceItemId && !item.productId) {
//            item.uniqueId = index;
//        }
//    });

//    $("#displayInvoiceGrid").dxDataGrid({
//        dataSource: displayInvoiceItems,
//        keyExpr: "invoiceItemId", // Use invoiceItemId as the primary key
//        showBorders: true,
//        showRowLines: true,
//        showColumnLines: true,
//        rowAlternationEnabled: false,
//        hoverStateEnabled: true,
//        columnAutoWidth: true,
//        paging: {
//            enabled: false
//        },
//        sorting: {
//            mode: "none"
//        },
//        columns: [
//            {
//                caption: "#",
//                width: 60,
//                alignment: "center",
//                cellTemplate: function (container, options) {
//                    container.text(options.rowIndex + 1);
//                },
//                headerCellTemplate: function (container) {
//                    container.css({
//                        'background-color': '#f8f9fa',
//                        'font-weight': 'bold',
//                        'color': '#6c757d',
//                        'text-align': 'center'
//                    });
//                    container.text('#');
//                }
//            },
//            {
//                dataField: "productCode",
//                caption: "CODE",
//                width: 120,
//                alignment: "left",
//                headerCellTemplate: function (container) {
//                    container.css({
//                        'background-color': '#f8f9fa',
//                        'font-weight': 'bold',
//                        'color': '#6c757d'
//                    });
//                    container.text('CODE');
//                }
//            },
//            {
//                dataField: "productName",
//                caption: "PARTICULAR",
//                alignment: "left",
//                headerCellTemplate: function (container) {
//                    container.css({
//                        'background-color': '#f8f9fa',
//                        'font-weight': 'bold',
//                        'color': '#6c757d'
//                    });
//                    container.text('PARTICULAR');
//                }
//            },
//            {
//                dataField: "quantity",
//                caption: "QTY",
//                width: 100,
//                alignment: "center",
//                dataType: "number",
//                headerCellTemplate: function (container) {
//                    container.css({
//                        'background-color': '#f8f9fa',
//                        'font-weight': 'bold',
//                        'color': '#6c757d',
//                        'text-align': 'center'
//                    });
//                    container.text('QTY');
//                }
//            },
//            {
//                dataField: "rate",
//                caption: "RATE",
//                width: 120,
//                alignment: "right",
//                dataType: "number",
//                format: {
//                    type: "fixedPoint",
//                    precision: 2
//                },
//                headerCellTemplate: function (container) {
//                    container.css({
//                        'background-color': '#f8f9fa',
//                        'font-weight': 'bold',
//                        'color': '#6c757d',
//                        'text-align': 'center'
//                    });
//                    container.text('RATE');
//                }
//            },
//            {
//                dataField: "amount",
//                caption: "AMOUNT",
//                width: 130,
//                alignment: "right",
//                dataType: "number",
//                format: {
//                    type: "fixedPoint",
//                    precision: 2
//                },
//                headerCellTemplate: function (container) {
//                    container.css({
//                        'background-color': '#f8f9fa',
//                        'font-weight': 'bold',
//                        'color': '#6c757d',
//                        'text-align': 'center'
//                    });
//                    container.text('AMOUNT');
//                }
//            }
//        ],
//        summary: {
//            totalItems: [
//                {
//                    column: "rate",
//                    summaryType: "custom",
//                    customizeText: function () {
//                        return "Total:";
//                    },
//                    showInColumn: "rate"
//                },
//                {
//                    column: "amount",
//                    summaryType: "sum",
//                    valueFormat: {
//                        type: "fixedPoint",
//                        precision: 2
//                    },
//                    displayFormat: "{0}",
//                    showInColumn: "amount",
//                    alignment: "right"
//                }
//            ]
//        },
//        onContentReady: function (e) {
//            // Style the grid container
//            $('.dx-datagrid').css({
//                'border': '1px solid #dee2e6',
//                'border-radius': '4px'
//            });

//            // Style header
//            $('.dx-header-row').css({
//                'background-color': '#f8f9fa'
//            });

//            // Style summary row
//            $('.dx-datagrid-total-footer').css({
//                'background-color': '#f8f9fa',
//                'font-weight': 'bold'
//            });

//            // Move summary to top (after Items heading)
//            moveSummaryToTop();
//        }
//    });

//    // Function to move summary box to top
//    function moveSummaryToTop() {
//        // Get the grid total from the data
//        var gridInstance = $("#displayInvoiceGrid").dxDataGrid("instance");
//        var dataSource = gridInstance.option("dataSource");
//        var total = 0;

//        if (dataSource && dataSource.length > 0) {
//            dataSource.forEach(function (item) {
//                total += item.amount || 0;
//            });
//        }

//        // Create summary box HTML
//        var summaryHtml = `
//            <div class="card mb-3" style="max-width: 400px; margin-left: auto;">
//                <div class="card-header bg-success text-white">
//                    <strong>Summary</strong>
//                </div>
//                <div class="card-body">
//                    <div class="row mb-2">
//                        <div class="col-6">Sub Total</div>
//                        <div class="col-6 text-end"><strong>${invoiceSubTotal ? invoiceSubTotal.toFixed(2) : total.toFixed(2)}</strong></div>
//                    </div>
//                    <div class="row mb-2">
//                        <div class="col-6">Discount</div>
//                        <div class="col-6 text-end"><strong>${invoiceDiscount ? invoiceDiscount.toFixed(2) : '0.00'}</strong></div>
//                    </div>
//                    <div class="row mb-2">
//                        <div class="col-6">VAT</div>
//                        <div class="col-6 text-end"><strong>${invoiceVat ? invoiceVat.toFixed(2) : '0.00'}</strong></div>
//                    </div>
//                    <hr>
//                    <div class="row">
//                        <div class="col-6"><strong>Net Amount</strong></div>
//                        <div class="col-6 text-end text-success"><strong>${invoiceNetAmount ? invoiceNetAmount.toFixed(2) : '0.00'}</strong></div>
//                    </div>
//                </div>
//            </div>
//        `;

//        // Insert summary before the grid
//        if ($('#summaryBox').length === 0) {
//            $(summaryHtml).attr('id', 'summaryBox').insertBefore('#displayInvoiceGrid');
//        }
//    }

//    // Print button handler
//    $("#printBtn").on("click", function () {
//        window.print();
//    });
//});

//$(document).ready(function () {

//    const gridElement = $("#displayInvoiceGrid");

//    const displayInvoiceItems = JSON.parse(gridElement.attr("data-items"));
//    const invoiceSubTotal = parseFloat(gridElement.attr("data-subtotal")) || 0;
//    const invoiceDiscount = parseFloat(gridElement.attr("data-discount")) || 0;
//    const invoiceVat = parseFloat(gridElement.attr("data-vat")) || 0;
//    const invoiceNetAmount = parseFloat(gridElement.attr("data-net")) || 0;

//    if (!displayInvoiceItems || displayInvoiceItems.length === 0) {
//        gridElement.html('<div class="alert alert-info">No items to display</div>');
//        return;
//    }

//    $("#displayInvoiceGrid").dxDataGrid({
//        dataSource: displayInvoiceItems,
//        keyExpr: "invoiceItemId",
//        showBorders: true,
//        showRowLines: true,
//        showColumnLines: true,
//        hoverStateEnabled: true,
//        columnAutoWidth: true,
//        paging: { enabled: false },
//        sorting: { mode: "none" },

//        columns: [
//            {
//                caption: "#",
//                width: 50,
//                alignment: "center",
//                cellTemplate: (c, o) => c.text(o.rowIndex + 1)
//            },
//            { dataField: "productCode", caption: "CODE", width: 80 },
//            { dataField: "productName", caption: "PARTICULAR" },
//            { dataField: "quantity", caption: "QTY", width: 60, alignment: "center" },
//            {
//                dataField: "rate",
//                caption: "RATE",
//                width: 90,
//                alignment: "right",
//                format: { type: "fixedPoint", precision: 2 }
//            },
//            {
//                dataField: "amount",
//                caption: "AMOUNT",
//                width: 100,
//                alignment: "right",
//                format: { type: "fixedPoint", precision: 2 }
//            }
//        ],

//        onContentReady: function () {
//            renderSummaryBox();
//        }
//    });

//    function renderSummaryBox() {
//        if ($("#summaryBox").length) return;

//        const summaryHtml = `
//            <div class="card mb-3" id="summaryBox">
//                <div class="card-header bg-success text-white">
//                    <strong>Summary</strong>
//                </div>
//                <div class="card-body p-2">
//                    <div class="d-flex justify-content-between">
//                        <span>Sub Total</span>
//                        <strong>${invoiceSubTotal.toFixed(2)}</strong>
//                    </div>
//                    <div class="d-flex justify-content-between">
//                        <span>Discount</span>
//                        <strong>${invoiceDiscount.toFixed(2)}</strong>
//                    </div>
//                    <div class="d-flex justify-content-between">
//                        <span>VAT</span>
//                        <strong>${invoiceVat.toFixed(2)}</strong>
//                    </div>
//                    <hr class="my-2">
//                    <div class="d-flex justify-content-between text-success">
//                        <strong>Net Amount</strong>
//                        <strong>${invoiceNetAmount.toFixed(2)}</strong>
//                    </div>
//                </div>
//            </div>
//        `;

//        $(summaryHtml).prependTo("#displayInvoiceGrid");
//    }

//    $("#printBtn").on("click", function () {
//        window.print();
//    });
//});

//$(document).ready(function () {
//    const gridElement = $("#displayInvoiceGrid");
//    const displayInvoiceItems = JSON.parse(gridElement.attr("data-items"));
//    const invoiceSubTotal = parseFloat(gridElement.attr("data-subtotal")) || 0;
//    const invoiceDiscount = parseFloat(gridElement.attr("data-discount")) || 0;
//    const invoiceVat = parseFloat(gridElement.attr("data-vat")) || 0;
//    const invoiceNetAmount = parseFloat(gridElement.attr("data-net")) || 0;

//    if (!displayInvoiceItems || displayInvoiceItems.length === 0) {
//        gridElement.html('<div class="alert alert-info">No items to display</div>');
//        return;
//    }

//    // Render Summary Box FIRST (before grid initialization)
//    renderSummaryBox();

//    // Initialize DataGrid
//    $("#displayInvoiceGrid").dxDataGrid({
//        dataSource: displayInvoiceItems,
//        keyExpr: "invoiceItemId",
//        showBorders: true,
//        showRowLines: true,
//        showColumnLines: true,
//        hoverStateEnabled: true,
//        columnAutoWidth: true,
//        paging: { enabled: false },
//        sorting: { mode: "none" },
//        columns: [
//            {
//                caption: "#",
//                width: 50,
//                alignment: "center",
//                cellTemplate: (c, o) => c.text(o.rowIndex + 1)
//            },
//            { dataField: "productCode", caption: "CODE", width: 80 },
//            { dataField: "productName", caption: "PARTICULAR" },
//            { dataField: "quantity", caption: "QTY", width: 60, alignment: "center" },
//            {
//                dataField: "rate",
//                caption: "RATE",
//                width: 90,
//                alignment: "right",
//                format: { type: "fixedPoint", precision: 2 }
//            },
//            {
//                dataField: "amount",
//                caption: "AMOUNT",
//                width: 100,
//                alignment: "right",
//                format: { type: "fixedPoint", precision: 2 }
//            }
//        ]
//    });

//    // Render Summary Box Function
//    function renderSummaryBox() {
//        if ($("#summaryBox").length) return;

//        const summaryHtml = `
//            <div class="card mb-3" id="summaryBox">
//                <div class="card-header bg-success text-white">
//                    <strong>Summary</strong>
//                </div>
//                <div class="card-body p-2">
//                    <div class="d-flex justify-content-between">
//                        <span>Sub Total</span>
//                        <strong>${invoiceSubTotal.toFixed(2)}</strong>
//                    </div>
//                    <div class="d-flex justify-content-between">
//                        <span>Discount</span>
//                        <strong>${invoiceDiscount.toFixed(2)}</strong>
//                    </div>
//                    <div class="d-flex justify-content-between">
//                        <span>VAT</span>
//                        <strong>${invoiceVat.toFixed(2)}</strong>
//                    </div>
//                    <hr class="my-2">
//                    <div class="d-flex justify-content-between text-success">
//                        <strong>Net Amount</strong>
//                        <strong>${invoiceNetAmount.toFixed(2)}</strong>
//                    </div>
//                </div>
//            </div>
//        `;

//        // Insert into summaryContainer instead of prepending to grid
//        $("#summaryContainer").html(summaryHtml);
//    }

//    // Print Button Handler
//    $("#printBtn").on("click", function () {
//        window.print();
//    });
//});


$(document).ready(function () {
    const gridElement = $("#displayInvoiceGrid");
    const displayInvoiceItems = JSON.parse(gridElement.attr("data-items"));
    const invoiceSubTotal = parseFloat(gridElement.attr("data-subtotal")) || 0;
    const invoiceDiscount = parseFloat(gridElement.attr("data-discount")) || 0;
    const invoiceVat = parseFloat(gridElement.attr("data-vat")) || 0;
    const invoiceNetAmount = parseFloat(gridElement.attr("data-net")) || 0;
    if (!displayInvoiceItems || displayInvoiceItems.length === 0) {
        gridElement.html('<div class="alert alert-info">No items to display</div>');
        return;
    }
    // Render Summary Box FIRST (before grid initialization)
    renderSummaryBox();
    // Initialize DataGrid
    $("#displayInvoiceGrid").dxDataGrid({
        dataSource: displayInvoiceItems,
        keyExpr: "invoiceItemId",
        showBorders: true,
        showRowLines: true,
        showColumnLines: true,
        hoverStateEnabled: true,
        columnAutoWidth: true,
        paging: { enabled: false },
        sorting: { mode: "none" },
        columns: [
            {
                caption: "#",
                width: 50,
                alignment: "center",
                cellTemplate: (c, o) => c.text(o.rowIndex + 1)
            },
            { dataField: "productCode", caption: "CODE", width: 80 },
            { dataField: "productName", caption: "PARTICULAR" },
            { dataField: "quantity", caption: "QTY", width: 60, alignment: "center" },
            {
                dataField: "rate",
                caption: "RATE",
                width: 90,
                alignment: "right",
                format: { type: "fixedPoint", precision: 2 }
            },
            {
                dataField: "amount",
                caption: "AMOUNT",
                width: 100,
                alignment: "right",
                format: { type: "fixedPoint", precision: 2 }
            }
        ]
    });
    // Render Summary Box Function
    function renderSummaryBox() {
        if ($("#summaryBox").length) return;
        const summaryHtml = `
            <div class="card mb-3" id="summaryBox">
                <div class="card-header bg-success text-white">
                    <strong>Summary</strong>
                </div>
                <div class="card-body p-2">
                    <div class="d-flex justify-content-between">
                        <span>Sub Total</span>
                        <strong>${invoiceSubTotal.toFixed(2)}</strong>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>Discount</span>
                        <strong>${invoiceDiscount.toFixed(2)}</strong>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>VAT</span>
                        <strong>${invoiceVat.toFixed(2)}</strong>
                    </div>
                    <hr class="my-2">
                    <div class="d-flex justify-content-between text-success">
                        <strong>Net Amount</strong>
                        <strong>${invoiceNetAmount.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        `;
        // Insert into summaryContainer instead of prepending to grid
        $("#summaryContainer").html(summaryHtml);
    }
    // Print Button Handler
    $("#printBtn").on("click", function () {
        window.print();
    });
});


