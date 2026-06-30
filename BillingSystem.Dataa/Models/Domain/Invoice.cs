using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillingSystem.Dataa.Models.Domain
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public string InvoiceNumber { get; set; }
        public string InvoiceName { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal TaxableAmount { get; set; }
        public decimal Vat { get; set; }
        public decimal RoundOff { get; set; }
        public decimal NetAmount { get; set; }
        public string PaymentMode { get; set; }
        public string Remark { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class InvoiceViewModel
    {
        public string InvoiceNumber { get; set; }
        public string InvoiceName { get; set; }
        public decimal DiscountValue { get; set; }
        public string DiscountType { get; set; }
        public string PaymentMode { get; set; }
        public string Remark { get; set; }
        public List<InvoiceItemViewModel> Items { get; set; }
    }

    // NEW CLASS - For returning result from stored procedure
    public class InvoiceResult
    {
        public int InvoiceId { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal TaxableAmount { get; set; }
        public decimal Vat { get; set; }
        public decimal RoundOff { get; set; }
        public decimal NetAmount { get; set; }
        public int HasError { get; set; }
        public string Message { get; set; }
    }

}