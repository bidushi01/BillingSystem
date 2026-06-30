//using System.ComponentModel.DataAnnotations;

//namespace BillingSystem.Web.ViewModels
//{
//    public class ProductViewModel
//    {
//        public int ProductId { get; set; }

//        [Required(ErrorMessage = "Product code is required")]
//        public string ProductCode { get; set; }

//        [Required(ErrorMessage = "Product name is required")]
//        public string Name { get; set; }

//        [Required(ErrorMessage = "Rate is required")]
//        [Range(0.01, double.MaxValue, ErrorMessage = "Rate must be greater than 0")]
//        public decimal Rate { get; set; }

//        public bool IsTaxable { get; set; } = true;
//        public bool Status { get; set; } = true;
//    }
//}
