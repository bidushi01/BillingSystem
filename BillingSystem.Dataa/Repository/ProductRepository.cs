using BillingSystem.Dataa.DataAccess;
using BillingSystem.Dataa.Models.Domain;

namespace BillingSystem.Dataa.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ISqlDataAccess _db;

        public ProductRepository(ISqlDataAccess db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _db.GetData<Product, dynamic>("sp_GetAllProducts", new { });
        }

        public async Task<IEnumerable<Product>> GetAllIncludingInactive()
        {
            return await _db.GetData<Product, dynamic>("sp_GetAllProductsIncludingInactive", new { });
        }

        public async Task<Product?> GetById(int productId)
        {
            var result = await _db.GetData<Product, dynamic>("sp_GetProductById", new { ProductId = productId });
            return result.FirstOrDefault();
        }

        public async Task<int> Save(Product product)
        {
            return await _db.SaveDataAndGet<int, dynamic>("sp_SaveProduct", new
            {
                ProductId = product.ProductId,
                ProductCode = product.ProductCode,
                Name = product.Name,
                Rate = product.Rate,
                IsTaxable = product.IsTaxable,
                Status = product.Status
            });
        }

        public async Task Delete(int productId)
        {
            await _db.SaveData<dynamic>("sp_DeleteProduct", new { ProductId = productId });
        }


        public async Task<ProductResult> SaveSecure(Product product)
        {
            var result = await _db.GetData<ProductResult, dynamic>(
                "sp_SaveProduct",
                new
                {
                    ProductId = product.ProductId,
                    ProductCode = product.ProductCode,
                    Name = product.Name,
                    Rate = product.Rate,
                    IsTaxable = product.IsTaxable,
                    Status = product.Status
                }
            );

            return result.FirstOrDefault();
        }

        public async Task<ProductResult> DeleteSecure(int productId)
        {
            var result = await _db.GetData<ProductResult, dynamic>(
                "sp_DeleteProduct",
                new { ProductId = productId }
            );

            return result.FirstOrDefault();
        }
    }
}

