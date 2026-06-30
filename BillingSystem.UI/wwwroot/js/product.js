const validationGroupName = "ProductForm";

function initProductForm() {
    const productId = parseInt($("#productId").val()) || 0;

    const productCodeValue = $("#txtProductCode").data("value") || "";
    const productNameValue = $("#txtProductName").data("value") || "";
    const rateValue = parseFloat($("#txtRate").data("value")) || 0;
    const isTaxableValue = $("#chkIsTaxable").data("value") === "True" || $("#chkIsTaxable").data("value") === true;
    const statusValue = $("#chkStatus").data("value") === "True" || $("#chkStatus").data("value") === true;

    $("#Validationsummary").dxValidationSummary({
        validationGroup: validationGroupName
    });

    $("#txtProductCode").dxTextBox({ value: productCodeValue }).dxValidator({
        validationGroup: validationGroupName,
        validationRules: [{ type: "required", message: "Product Code is required" }]
    });

    $("#txtProductName").dxTextBox({ value: productNameValue }).dxValidator({
        validationGroup: validationGroupName,
        validationRules: [{ type: "required", message: "Product Name is required" }]
    });

    $("#txtRate").dxNumberBox({
        value: rateValue,
        format: "#,##0.00",
        min: 0.01,
        step: 0.01,
        showSpinButtons: true
    }).dxValidator({
        validationGroup: validationGroupName,
        validationRules: [
            { type: "required", message: "Rate is required" },
            {
                type: "range",
                min: 0.01,
                message: "Rate must be greater than 0"
            }
        ]
    });

    $("#chkIsTaxable").dxCheckBox({
        value: isTaxableValue,
        text: "This product is taxable"
    });

    $("#chkStatus").dxCheckBox({
        value: statusValue,
        text: "Active"
    });

    $("#btnSave").off("click").on("click", function () {
        const result = DevExpress.validationEngine.validateGroup(validationGroupName);
        if (!result.isValid) return;

        const data = {
            ProductId: productId,
            ProductCode: $("#txtProductCode").dxTextBox("instance").option("value"),
            Name: $("#txtProductName").dxTextBox("instance").option("value"),
            Rate: $("#txtRate").dxNumberBox("instance").option("value"),
            IsTaxable: $("#chkIsTaxable").dxCheckBox("instance").option("value"),
            Status: $("#chkStatus").dxCheckBox("instance").option("value")
        };

        $.post("/Product/Save", data)
            .done(function () {
                $("#popupProduct").dxPopup("instance").hide();
                $("#gridProducts").dxDataGrid("instance").refresh();
                DevExpress.ui.notify("Product saved successfully", "success", 3000);
            })
            .fail(function () {
                DevExpress.ui.notify("Failed to save product", "error", 3000);
            });
    });
}

$(function () {
    if (!$("#gridProducts").length) return;

    $("#gridProducts").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "productId",
            load: () => $.getJSON("/Product/GetAllProductsIncludingInactive")
        }),
        showBorders: true,
        showRowLines: true,
        showColumnLines: true,
        rowAlternationEnabled: true,
        columnAutoWidth: true,
        paging: {
            enabled: true,
            pageSize: 20
        },
        pager: {
            visible: true,
            showPageSizeSelector: true,
            allowedPageSizes: [10, 20, 50, 100],
            showInfo: true
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        columns: [
            {
                dataField: "productId",
                caption: "#",
                width: 60,
                alignment: "center"
            },
            {
                dataField: "productCode",
                caption: "Code",
                width: 120
            },
            {
                dataField: "name",
                caption: "Name"
            },
            {
                dataField: "rate",
                caption: "Rate",
                width: 120,
                alignment: "right",
                customizeText: function (cellInfo) {
                    return "Rs " + cellInfo.value.toFixed(2);
                }
            },
            {
                dataField: "isTaxable",
                caption: "Taxable",
                width: 100,
                alignment: "center",
                cellTemplate: function (container, options) {
                    if (options.value) {
                        $("<i>").addClass("dx-icon-check text-success").appendTo(container);
                    } else {
                        $("<i>").addClass("dx-icon-close text-danger").appendTo(container);
                    }
                }
            },
            {
                dataField: "status",
                caption: "Status",
                width: 100,
                alignment: "center",
                cellTemplate: function (container, options) {
                    if (options.value) {
                        $("<span>").addClass("badge bg-success").text("Active").appendTo(container);
                    } else {
                        $("<span>").addClass("badge bg-danger").text("Inactive").appendTo(container);
                    }
                }
            },
            {
                dataField: "createdDate",
                caption: "Created Date",
                width: 130,
                dataType: "date",
                format: "yyyy-MM-dd"
            },
            {
                caption: "Action",
                width: 160,
                cellTemplate: function (container, options) {
                    $("<button>")
                        .addClass("btn btn-primary btn-sm me-1")
                        .text("Edit")
                        .appendTo(container)
                        .on("click", function () {
                            openProductPopup(options.data.productId);
                        });

                    $("<button>")
                        .addClass("btn btn-danger btn-sm")
                        .text("Delete")
                        .appendTo(container)
                        .on("click", function () {
                            if (confirm("Delete this product?")) {
                                $.post("/Product/Delete", { id: options.data.productId })
                                    .done(function () {
                                        $("#gridProducts").dxDataGrid("instance").refresh();
                                        DevExpress.ui.notify("Product deleted successfully", "success", 3000);
                                    })
                                    .fail(function () {
                                        DevExpress.ui.notify("Failed to delete product", "error", 3000);
                                        $("#gridProducts").dxDataGrid("instance").refresh();
                                    });
                            }
                        });
                }
            }
        ]
    });

    $("#btnAdd").on("click", function () {
        openProductPopup(0);
    });
});

function openProductPopup(id) {
    $.get("/ProductModal/AddOrEdit", { id: id })
        .done(function (html) {
            $("#popupProduct").dxPopup({
                width: 600,
                height: "auto",
                visible: true,
                showTitle: true,
                title: id === 0 ? "Add Product" : "Edit Product",
                closeOnOutsideClick: true,
                contentTemplate: function () {
                    return $("<div>").html(html);
                },
                onShown: function () {
                    initProductForm();
                }
            });
        })
        .fail(function () {
            DevExpress.ui.notify("Failed to load product form", "error", 3000);
        });
}