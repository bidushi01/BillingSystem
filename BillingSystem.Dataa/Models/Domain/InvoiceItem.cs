using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillingSystem.Dataa.Models.Domain
{
    public class InvoiceItem
    {
        public int InvoiceItemId { get; set; }
        public int InvoiceId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal Amount { get; set; }
        public bool IsTaxable { get; set; }
        public DateTime CreatedDate { get; set; }

        // Navigation properties
        public string ProductName { get; set; }
        public string ProductCode { get; set; }

      
    }

    public class InvoiceItemViewModel
    {
        public int productId { get; set; }
        public int quantity { get; set; }
        public decimal rate { get; set; }

        //public int productId { get; set; }
        //public string productCode { get; set; }
        //public string productName { get; set; }
        //public int quantity { get; set; }      // lowercase!
        //public decimal rate { get; set; }      // lowercase!
        //public decimal amount { get; set; }
        //public bool isTaxable { get; set; }


    }
}
