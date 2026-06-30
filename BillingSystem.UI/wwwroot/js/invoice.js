/**
 * Array to store all items added to the current invoice
 * Each item contains: productId, productCode, productName, Quantity, rate, amount, isTaxable
 */
let invoiceItems = [];

/**
 * DevExtreme DataGrid instance for displaying invoice items
 * This is initialized in initializeDataGrid() function
 */
let dataGrid;


// ========================================
// INITIALIZATION - Runs when page loads
// ========================================

$(document).ready(function () {
    // Initialize the invoice (get invoice number and set date)
    initializeInvoice();

    // Load all active products from server into dropdown
    loadProducts();

    // Initialize the DevExtreme DataGrid for displaying items
    initializeDataGrid();

    // ========================================
    // EVENT HANDLERS - What happens when user clicks/types
    // ========================================

    // When user clicks the "+" button, add the item to invoice
    $('#btnAddItem').click(addItem);

    // When user types in Quantity field, recalculate the amount
    $('#Quantity').on('input', calculateAmount);

    // When discount value or type changes, recalculate summary
    $('#DiscountValue, #DiscountType').on('input', calculateSummary);

    // When tender amount changes, recalculate the change
    $('#TenderAmount').on('input', calculateChange);

    // When user clicks Save button, save the invoice
    $('#saveInvoiceBtn').click(saveInvoice);

    // When user selects a product, populate rate and quantity fields
    $('#ProductSelect').change(onProductChange);

    // ========================================
    // KEYBOARD SHORTCUTS
    // ========================================

    // Press Enter in Quantity field to quickly add item
    $('#Quantity').on('keypress', function (e) {
        if (e.which === 13) { // 13 = Enter key
            addItem();
        }
    });
});


// ========================================
// DATAGRID CONFIGURATION
// ========================================

/**
 * Initializes the DevExtreme DataGrid that displays invoice items
 * This grid shows: #, Product Name, Quantity, Rate, Amount, Delete button
 */
//function initializeDataGrid() {
//    dataGrid = $("#invoiceItemsGrid").dxDataGrid({
//        // Data source for the grid
//        dataSource: invoiceItems,
//        keyExpr: "productId", // Unique identifier for each row

//        // Visual settings
//        showBorders: true,
//        showRowLines: true,
//        showColumnLines: true,
//        rowAlternationEnabled: false,
//        hoverStateEnabled: true,
//        columnAutoWidth: false,
//        wordWrapEnabled: false,
//        noDataText: "No items added", // Message when grid is empty
//        height: 'auto',

//        // Define columns to display
//        columns: [
//            // Column 1: Serial Number (#)
//            {
//                caption: "#",
//                width: 60,
//                alignment: "center",
//                cellTemplate: function (container, options) {
//                    // Display row index + 1 (so first row shows 1, not 0)
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

//            // Column 2: Product Name (PARTICULAR)
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
//                },
//                cellTemplate: function (container, options) {
//                    container.text(options.data.productName);
//                    container.css('color', '#6c757d');
//                }
//            },

//            // Column 3: Quantity
//            {
//                dataField: "Quantity",
//                caption: "Quantity",
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
//                    container.text('Quantity');
//                }
//            },

//            // Column 4: Rate (Price per unit)
//            {
//                dataField: "rate",
//                caption: "RATE",
//                width: 120,
//                alignment: "right",
//                dataType: "number",
//                format: {
//                    type: "fixedPoint",
//                    precision: 2 // Show 2 decimal places (e.g., 200.00)
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

//            // Column 5: Amount (Quantity × Rate)
//            {
//                dataField: "amount",
//                caption: "AMOUNT",
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
//                    container.text('AMOUNT');
//                }
//            },

//            // Column 6: Delete Button
//            {
//                type: "buttons",
//                width: 60,
//                buttons: [
//                    {
//                        icon: "trash", // Trash icon for delete
//                        cssClass: "text-primary",
//                        onClick: function (e) {
//                            // Remove this item from invoice
//                            removeItem(e.row.data.productId);
//                        }
//                    }
//                ],
//                headerCellTemplate: function (container) {
//                    container.css('background-color', '#f8f9fa');
//                }
//            }
//        ],

//        // Summary row at bottom showing total
//        summary: {
//            totalItems: [
//                {
//                    column: "rate",
//                    summaryType: "custom",
//                    customizeText: function () {
//                        return "Total:"; // Show "Total:" text
//                    },
//                    cssClass: "text-end",
//                    showInColumn: "rate"
//                },
//                {
//                    column: "amount",
//                    summaryType: "sum", // Sum all amounts
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

//        // Disable pagination (show all items)
//        paging: {
//            enabled: false
//        },

//        // Disable inline editing
//        editing: {
//            allowUpdating: false,
//            allowDeleting: false,
//            allowAdding: false
//        },

//        // Apply custom styling when grid is ready
//        onContentReady: function (e) {
//            $('.dx-datagrid').css({
//                'border': '1px solid #dee2e6',
//                'border-radius': '4px'
//            });

//            $('.dx-header-row').css({
//                'background-color': '#f8f9fa'
//            });

//            $('.dx-datagrid-total-footer').css({
//                'background-color': '#f8f9fa',
//                'font-weight': 'normal'
//            });

//            // Update total amount display
//            updateGridTotal();
//        }
//    }).dxDataGrid("instance");
//}

function initializeDataGrid() {
    dataGrid = $("#invoiceItemsGrid").dxDataGrid({
        dataSource: invoiceItems,
        keyExpr: "productId",
        showBorders: true,
        showRowLines: true,
        showColumnLines: true,
        rowAlternationEnabled: false,
        hoverStateEnabled: true,
        columnAutoWidth: false,
        wordWrapEnabled: false,
        noDataText: "No items added",
        height: 'auto',

        columns: [
            {
                caption: "#",
                width: 60,
                alignment: "center",
                cellTemplate: function (container, options) {
                    container.text(options.rowIndex + 1);
                },
                headerCellTemplate: function (container) {
                    container.css({
                        'background-color': '#f8f9fa',
                        'font-weight': 'bold',
                        'color': '#6c757d',
                        'text-align': 'center'
                    });
                    container.text('#');
                }
            },
            {
                dataField: "productName",
                caption: "PARTICULAR",
                alignment: "left",
                headerCellTemplate: function (container) {
                    container.css({
                        'background-color': '#f8f9fa',
                        'font-weight': 'bold',
                        'color': '#6c757d'
                    });
                    container.text('PARTICULAR');
                },
                cellTemplate: function (container, options) {
                    container.text(options.data.productName);
                    container.css('color', '#6c757d');
                }
            },
            {
                dataField: "Quantity",
                caption: "Quantity",
                width: 100,
                alignment: "center",
                dataType: "number",
                headerCellTemplate: function (container) {
                    container.css({
                        'background-color': '#f8f9fa',
                        'font-weight': 'bold',
                        'color': '#6c757d',
                        'text-align': 'center'
                    });
                    container.text('Quantity');
                }
            },
            {
                dataField: "rate",
                caption: "RATE",
                width: 120,
                alignment: "right",
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                headerCellTemplate: function (container) {
                    container.css({
                        'background-color': '#f8f9fa',
                        'font-weight': 'bold',
                        'color': '#6c757d',
                        'text-align': 'center'
                    });
                    container.text('RATE');
                }
            },
            {
                dataField: "amount",
                caption: "AMOUNT",
                width: 120,
                alignment: "right",
                dataType: "number",
                format: {
                    type: "fixedPoint",
                    precision: 2
                },
                headerCellTemplate: function (container) {
                    container.css({
                        'background-color': '#f8f9fa',
                        'font-weight': 'bold',
                        'color': '#6c757d',
                        'text-align': 'center'
                    });
                    container.text('AMOUNT');
                }
            },
            {
                type: "buttons",
                width: 60,
                buttons: [
                    {
                        icon: "trash",
                        cssClass: "text-primary",
                        onClick: function (e) {
                            removeItem(e.row.data.productId);
                        }
                    }
                ],
                headerCellTemplate: function (container) {
                    container.css('background-color', '#f8f9fa');
                }
            }
        ],

        // FIXED: Proper summary configuration
        summary: {
            totalItems: [
                {
                    column: "rate",
                    summaryType: "custom",
                    customizeText: function () {
                        return "Total:";
                    },
                    // ADD THIS: The missing calculateCustomSummary function
                    calculateCustomSummary: function (options) {
                        if (options.name === "Total") {
                            if (options.summaryProcess === "start") {
                                options.totalValue = 0;
                            }
                        }
                    },
                    cssClass: "text-end",
                    showInColumn: "rate"
                },
                {
                    column: "amount",
                    summaryType: "sum",
                    valueFormat: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    displayFormat: "{0}",
                    showInColumn: "amount",
                    alignment: "right"
                }
            ]
        },

        paging: {
            enabled: false
        },

        editing: {
            allowUpdating: false,
            allowDeleting: false,
            allowAdding: false
        },

        onContentReady: function (e) {
            $('.dx-datagrid').css({
                'border': '1px solid #dee2e6',
                'border-radius': '4px'
            });

            $('.dx-header-row').css({
                'background-color': '#f8f9fa'
            });

            $('.dx-datagrid-total-footer').css({
                'background-color': '#f8f9fa',
                'font-weight': 'normal'
            });

            updateGridTotal();
        }
    }).dxDataGrid("instance");
}


// ========================================
// INVOICE INITIALIZATION
// ========================================

/**
 * Initializes invoice with auto-generated invoice number and today's date
 * Called once when page loads
 */
function initializeInvoice() {
    // Get next invoice number from server
    $.ajax({
        url: '/Invoice/GetNextInvoiceNumber',
        method: 'GET',
        success: function (data) {
            $('#InvoiceNumber').val(data.invoiceNumber);
        },
        error: function () {
            // If server fails, generate invoice number manually
            // Format: YYYYMMDD0001 (e.g., 202601220001)
            const today = new Date();
            const invoiceNo = today.getFullYear().toString() +
                (today.getMonth() + 1).toString().padStart(2, '0') +
                today.getDate().toString().padStart(2, '0') +
                '0001';
            $('#InvoiceNumber').val(invoiceNo);
        }
    });

    // Set today's date in the date field
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    $('#Date').val(dateStr);
}


// ========================================
// PRODUCT LOADING
// ========================================

/**
 * Loads all ACTIVE products from the server and populates the product dropdown
 * Only active products can be added to invoices
 */
function loadProducts() {
    console.log("Loading products...");

    $.ajax({
        url: '/Product/GetProducts', // This endpoint returns only ACTIVE products
        method: 'GET',
        success: function (data) {
            console.log("Products loaded:", data);

            // Get the product dropdown element
            const select = $('#ProductSelect');

            // Clear any existing options
            select.empty();

            // Add default "Select product..." option
            select.append('<option value="">Select product...</option>');

            // Loop through each product and add it to the dropdown
            data.forEach(product => {
                // Store product data in data attributes for later use
                // Display only the product name (no rate shown in dropdown)
                select.append(`<option value="${product.productId}"
                              data-productid="${product.productId}"
                              data-code="${product.productCode || ''}"
                              data-rate="${product.rate}"
                              data-name="${product.name}"
                              data-taxable="${product.isTaxable}">
                              ${product.name}
                              </option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error('Failed to load products:', error);
            alert('Failed to load products. Please refresh the page.');
        }
    });
}


// ========================================
// PRODUCT SELECTION HANDLER
// ========================================

/**
 * Called when user selects a product from dropdown
 * Automatically fills the Rate field and makes it read-only
 * This prevents users from changing the product price
 */
function onProductChange() {
    // Get the selected option
    const selectedOption = $('#ProductSelect option:selected');
    const productId = selectedOption.val();

    if (productId) {
        // Get the rate from data attribute
        const rate = selectedOption.data('rate');
        console.log("Product selected:", selectedOption.data('name'));

        // Set the rate field and make it READ-ONLY
        // Users CANNOT change the product price on invoice
        $('#Rate').val(rate || 0)
            .prop('readonly', true)      // Make field read-only
            .addClass('bg-light');        // Add light background to show it's locked

        // Calculate amount based on quantity and rate
        calculateAmount();

        // Move cursor to Quantity field for user convenience
        $('#Quantity').focus().select();
    } else {
        // If no product selected, clear and unlock rate field
        $('#Rate').val('')
            .prop('readonly', false)
            .removeClass('bg-light');
        $('#Amount').val('');
    }
}


// ========================================
// CALCULATIONS
// ========================================

/**
 * Calculates Amount = Quantity × Rate
 * Updates the Amount field automatically
 */
function calculateAmount() {
    const Quantity = parseFloat($('#Quantity').val()) || 0;
    const rate = parseFloat($('#Rate').val()) || 0;
    const amount = (Quantity * rate).toFixed(2); // Calculate and format to 2 decimals
    $('#Amount').val(amount);
}

/**
 * Adds the selected product to the invoice items list
 * Validates input before adding
 * If product already exists, increases quantity instead of adding duplicate
 */
//function addItem() {
//    // Get all input values
//    const productSelect = $('#ProductSelect');
//    const productId = productSelect.val();
//    const selectedOption = productSelect.find('option:selected');
//    const productName = selectedOption.data('name');
//    const productCode = selectedOption.data('code') || '';
//    const Quantity = parseFloat($('#Quantity').val()) || 0;
//    const rate = parseFloat($('#Rate').val()) || 0;
//    // IMPORTANT: Read isTaxable correctly - it comes as a boolean from the server
//    // Default to FALSE (non-taxable) if not specified, to be safe
//    const isTaxable = selectedOption.data('taxable') === true || selectedOption.data('taxable') === 'True';

//    // ========================================
//    // VALIDATION - Check if inputs are valid
//    // ========================================

//    if (!productId) {
//        alert('Please select a product');
//        return; // Stop function execution
//    }

//    if (Quantity <= 0) {
//        alert('Please enter valid quantity');
//        return;
//    }

//    // ========================================
//    // CHECK IF PRODUCT ALREADY EXISTS
//    // ========================================

//    // Find if this product is already in the invoice
//    const existingItemIndex = invoiceItems.findIndex(item => item.productId === productId);

//    if (existingItemIndex !== -1) {
//        // Product exists - just increase the quantity
//        invoiceItems[existingItemIndex].Quantity += Quantity;

//        // Recalculate amount for this item
//        invoiceItems[existingItemIndex].amount =
//            invoiceItems[existingItemIndex].Quantity * invoiceItems[existingItemIndex].rate;
//    } else {
//        // Product doesn't exist - add as new item
//        const amount = Quantity * rate;

//        const item = {
//            productId: productId,
//            productCode: productCode,
//            productName: productName,
//            Quantity: Quantity,
//            rate: rate,              // Rate is locked from product master data
//            amount: amount,
//            isTaxable: isTaxable
//        };

//        // Add to invoice items array
//        invoiceItems.push(item);
//    }

//    // Update the grid display
//    refreshDataGrid();

//    // Clear input fields for next item
//    clearItemInputs();

//    // Recalculate invoice summary (subtotal, tax, etc.)
//    calculateSummary();
//}

function addItem() {
    const productSelect = $('#ProductSelect');
    const productId = parseInt(productSelect.val()); // FIXED: Parse as integer
    const selectedOption = productSelect.find('option:selected');
    const productName = selectedOption.data('name');
    const productCode = selectedOption.data('code') || '';
    const Quantity = parseFloat($('#Quantity').val()) || 0;
    const rate = parseFloat($('#Rate').val()) || 0;
    const isTaxable = selectedOption.data('taxable') === true || selectedOption.data('taxable') === 'True';

    if (!productId || isNaN(productId)) {  // FIXED: Check for valid number
        alert('Please select a product');
        return;
    }

    if (Quantity <= 0) {
        alert('Please enter valid quantity');
        return;
    }

    const existingItemIndex = invoiceItems.findIndex(item => item.productId === productId);

    if (existingItemIndex !== -1) {
        invoiceItems[existingItemIndex].Quantity += Quantity;
        invoiceItems[existingItemIndex].amount =
            invoiceItems[existingItemIndex].Quantity * invoiceItems[existingItemIndex].rate;
    } else {
        const amount = Quantity * rate;

        const item = {
            productId: productId,      // Now it's a number
            productCode: productCode,
            productName: productName,
            Quantity: Quantity,
            rate: rate,
            amount: amount,
            isTaxable: isTaxable
        };

        invoiceItems.push(item);
    }

    refreshDataGrid();
    clearItemInputs();
    calculateSummary();
}

// ========================================
// GRID MANAGEMENT
// ========================================

/**
 * Refreshes the DataGrid to show updated invoice items
 */
function refreshDataGrid() {
    if (dataGrid) {
        dataGrid.option("dataSource", invoiceItems); // Update data source
        dataGrid.refresh();                          // Refresh display
        updateGridTotal();                           // Update total row
    }
}

/**
 * Updates the total amount displayed in grid footer
 */
function updateGridTotal() {
    // Sum all item amounts
    const total = invoiceItems.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    $('#itemsTotal').text(total.toFixed(2));
}

/**
 * Removes an item from the invoice
 * @param {number} productId - ID of product to remove
 */
function removeItem(productId) {
    // Filter out the item with matching productId
    invoiceItems = invoiceItems.filter(item => item.productId !== productId);

    // Update grid and recalculate summary
    refreshDataGrid();
    calculateSummary();
}

/**
 * Clears the input fields after adding an item
 * Resets to default state for next entry
 */
function clearItemInputs() {
    $('#ProductSelect').val('');                                    // Clear product selection
    $('#Quantity').val(1);                                          // Reset quantity to 1
    $('#Rate').val('').prop('readonly', false).removeClass('bg-light'); // Clear and unlock rate
    $('#Amount').val('');                                           // Clear amount
    $('#ProductSelect').focus();                                    // Move cursor back to product dropdown
}


// ========================================
// INVOICE SUMMARY CALCULATIONS
// ========================================

/**
 * Calculates the complete invoice summary
 * Sub Total → Discount → Taxable Amount → VAT (13%) → Round Off → Net Amount
 *
 * IMPORTANT: VAT is only calculated on TAXABLE products
 * Non-taxable products are excluded from VAT calculation
 */
function calculateSummary() {
    // Step 1: Calculate sub total (sum of all item amounts)
    const subTotal = invoiceItems.reduce((sum, item) => sum + parseFloat(item.amount), 0);

    // Step 2: Get discount value and type (% or fixed amount)
    const discountValue = parseFloat($('#DiscountValue').val()) || 0;
    const discountType = $('#DiscountType').val();

    // Step 3: Calculate discount amount
    let discountAmount = 0;
    if (discountType === '%') {
        // Percentage discount: discount = (subTotal × percentage) / 100
        discountAmount = (subTotal * discountValue) / 100;
    } else {
        // Fixed amount discount
        discountAmount = discountValue;
    }

    // Step 4: Calculate amount after discount for the entire invoice
    const amountAfterDiscount = subTotal - discountAmount;

    // Step 5: Separate taxable and non-taxable amounts
    // We need to split the discount proportionally among all items
    let taxableAmount = 0;      // Total amount of taxable items (after discount)
    let nonTaxableAmount = 0;   // Total amount of non-taxable items (after discount)

    // Loop through each item to separate taxable and non-taxable
    invoiceItems.forEach(item => {
        // Calculate this item's share of the total discount
        // Formula: item's discount = (item amount / subTotal) × total discount
        const itemDiscountShare = subTotal > 0 ? (item.amount / subTotal) * discountAmount : 0;

        // Calculate item amount after applying its share of discount
        const itemAfterDiscount = item.amount - itemDiscountShare;

        // Add to either taxable or non-taxable based on product's tax status
        if (item.isTaxable) {
            taxableAmount += itemAfterDiscount;  // Add to taxable items
        } else {
            nonTaxableAmount += itemAfterDiscount;  // Add to non-taxable items
        }
    });

    // Step 6: Calculate VAT ONLY on taxable items (13% of taxable amount)
    const vat = (taxableAmount * 13) / 100;

    // Step 7: Calculate total before rounding
    // Total = Taxable Amount + VAT + Non-Taxable Amount
    const beforeRound = taxableAmount + vat + nonTaxableAmount;

    // Step 8: Calculate round off (difference between rounded and actual)
    const roundOff = Math.round(beforeRound) - beforeRound;

    // Step 9: Final net amount (rounded to nearest whole number)
    const netAmount = Math.round(beforeRound);

    // ========================================
    // UPDATE ALL SUMMARY FIELDS IN THE UI
    // ========================================

    $('#SubTotal').text(subTotal.toFixed(2));
    $('#DiscountAmount').text(discountAmount.toFixed(2));
    $('#TaxableAmount').text(taxableAmount.toFixed(2));  // Shows only taxable items amount
    $('#Vat').text(vat.toFixed(2));                      // VAT only on taxable items
    $('#RoundOff').text(roundOff.toFixed(2));
    $('#NetAmount').text(netAmount.toFixed(2));

    // Calculate change amount (Tender - Net Amount)
    calculateChange();
}

/**
 * Calculates change amount = Tender Amount - Net Amount
 */
function calculateChange() {
    const netAmount = parseFloat($('#NetAmount').text()) || 0;
    const tenderAmount = parseFloat($('#TenderAmount').val()) || 0;
    const change = tenderAmount - netAmount;

    $('#ChangeAmount').text(change.toFixed(2));
}


// ========================================
// SAVE INVOICE
// ========================================

/**
 * Saves the complete invoice to the database
 * Validates all required fields before saving
 */
//function saveInvoice() {
//    // Prepare invoice object with all data
//    const invoice = {
//        invoiceNumber: $('#InvoiceNumber').val(),
//        date: $('#Date').val(),
//        invoiceName: $('#InvoiceName').val(),
//        items: invoiceItems,                                    // Array of all items
//        paymentMode: $('#PaymentMode').val(),
//        Remark: $('#Remark').val(),
//        subTotal: parseFloat($('#SubTotal').text()),
//        discount: parseFloat($('#DiscountAmount').text()),
//        taxableAmount: parseFloat($('#TaxableAmount').text()),
//        vat: parseFloat($('#Vat').text()),
//        roundOff: parseFloat($('#RoundOff').text()),
//        netAmount: parseFloat($('#NetAmount').text()),
//        tenderAmount: parseFloat($('#TenderAmount').val()) || 0,
//        changeAmount: parseFloat($('#ChangeAmount').text())
//    };

//    // ========================================
//    // VALIDATION BEFORE SAVING
//    // ========================================

//    // Check if invoice name is entered
//    if (!invoice.invoiceName || invoice.invoiceName.trim() === '') {
//        alert('Please enter Invoice Name');
//        $('#InvoiceName').focus();
//        return;
//    }

//    // Check if at least one item is added
//    if (invoiceItems.length === 0) {
//        alert('Please add at least one item');
//        $('#ProductSelect').focus();
//        return;
//    }

//    // ========================================
//    // SAVE TO SERVER
//    // ========================================

//    // Disable save button to prevent double-clicking
//    const saveBtn = $('#saveInvoiceBtn');
//    const originalText = saveBtn.text();
//    saveBtn.prop('disabled', true).text('Saving...');

//    // Send invoice data to server
//    $.ajax({
//        url: '/Invoice/Create',
//        method: 'POST',
//        contentType: 'application/json',
//        data: JSON.stringify(invoice),
//        success: function (response) {
//            alert('Invoice saved successfully!');
//            // Redirect to invoice list page
//            window.location.href = '/Invoice/InvoiceList';
//        },
//        error: function (xhr, status, error) {
//            console.error('Save error:', xhr.responseText);
//            alert('Failed to save invoice: ' + (xhr.responseText || error));
//            // Re-enable save button if error occurs
//            saveBtn.prop('disabled', false).text(originalText);
//        }
//    });
//}


function saveInvoice() {
    const discountValue = parseFloat($('#DiscountValue').val()) || 0;
    const discountType = $('#DiscountType').val();

    // NEW: We only send basic data, not calculated totals
    const invoice = {
        invoiceNumber: $('#InvoiceNumber').val(),
        invoiceName: $('#InvoiceName').val(),
        DiscountValue: discountValue,
        DiscountType: discountType,
        paymentMode: $('#PaymentMode').val(),
        remark: $('#Remark').val(),
        items: invoiceItems  // This should already exist in your code
    };

    if (!invoice.invoiceName || invoice.invoiceName.trim() === '') {
        alert('Please enter Invoice Name');
        $('#InvoiceName').focus();
        return;
    }

    if (invoiceItems.length === 0) {
        alert('Please add at least one item');
        return;
    }

    const saveBtn = $('#saveInvoiceBtn');
    const originalText = saveBtn.text();
    saveBtn.prop('disabled', true).text('Saving...');

    $.ajax({
        url: '/Invoice/Create',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(invoice),
        success: function (response) {
            if (response.success) {
                alert('Invoice saved successfully!');
                window.location.href = '/Invoice/InvoiceList';
            } else {
                alert('Error: ' + response.message);
                saveBtn.prop('disabled', false).text(originalText);
            }
        },
        error: function (xhr, status, error) {
            console.error('Save error:', xhr.responseText);
            alert('Failed to save invoice: ' + (xhr.responseText || error));
            saveBtn.prop('disabled', false).text(originalText);
        }
    });
}

