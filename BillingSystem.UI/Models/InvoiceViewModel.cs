using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BillingSystem.Web.ViewModels
{
    public class InvoiceViewModel
    {
        public int InvoiceId { get; set; }

        [Required]
        public string InvoiceNumber { get; set; }

        public string InvoiceName { get; set; }

        [Required]
        public string Date { get; set; }

        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal TaxableAmount { get; set; }
        public decimal Vat { get; set; }
        public decimal RoundOff { get; set; }
        public decimal NetAmount { get; set; }

        [Required]
        public string PaymentMode { get; set; } = "Cash";

        public string Remark { get; set; }

        public List<InvoiceItemViewModel> Items { get; set; } = new List<InvoiceItemViewModel>();
    }

    public class InvoiceItemViewModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal Amount { get; set; }
        public bool IsTaxable { get; set; }
    }
}

