using BillingSystem.Dataa.Models.Domain;

namespace BillingSystem.Dataa.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAll();
        Task<IEnumerable<Product>> GetAllIncludingInactive();
        Task<Product?> GetById(int productId);
        Task<int> Save(Product product);
        Task Delete(int productId);
        Task<ProductResult> SaveSecure(Product product);
        Task<ProductResult> DeleteSecure(int productId);
    }
}