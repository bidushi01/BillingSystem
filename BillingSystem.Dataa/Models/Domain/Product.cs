namespace BillingSystem.Dataa.Models.Domain
{
    public class Product
    {
        public int ProductId { get; set; }
        public string? ProductCode { get; set; }
        public string? Name { get; set; }
        public decimal Rate { get; set; }
        public bool IsTaxable { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class ProductResult
    {
        public int ProductId { get; set; }
        public int HasError { get; set; }
        public string Message { get; set; }
    }
}
