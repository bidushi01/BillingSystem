$(function () {
    $("#invoiceListGrid").dxDataGrid({
        dataSource: {
            load: function () {
                return $.ajax({
                    url: '/Invoice/GetAll',
                    type: 'GET'
                });
            }
        },

        keyExpr: "invoiceId",

        showBorders: true,
        rowAlternationEnabled: true,
        columnAutoWidth: true,

        searchPanel: {
            visible: true,
            highlightCaseSensitive: true
        },

        paging: {
            pageSize: 10
        },

        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [10, 20, 50],
            showInfo: true
        },

        columns: [
            {
                caption: "#",
                width: 50,
                alignment: "center",
                cellTemplate: function (container, options) {
                    container.text(options.rowIndex + 1);
                }
            },
            {
                dataField: "invoiceNumber",
                caption: "Invoice No"
            },
            {
                dataField: "invoiceName",
                caption: "Customer Name"
            },
            {
                dataField: "netAmount",
                caption: "Net Amount",
                alignment: "right",
                format: { type: "fixedPoint", precision: 2 }
            },
            {
                type: "buttons",
                caption: "Actions",
                buttons: [
                    {
                        icon: "eyeopen",
                        hint: "View",
                        onClick: function (e) {
                            window.location.href =
                                '/Invoice/Details/' + e.row.data.invoiceId;
                        }
                    }
                ]
            }
        ]
    });
});
