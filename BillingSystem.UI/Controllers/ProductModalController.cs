using BillingSystem.Dataa.Models.Domain;
using BillingSystem.Dataa.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BillingSystem.UI.Controllers
{
    public class ProductModalController : Controller
    {
        private readonly IProductRepository _repo;

        public ProductModalController(IProductRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> AddOrEdit(int? id)
        {
            if (id.HasValue && id.Value > 0)
            {
                var product = await _repo.GetById(id.Value);
                return PartialView("_ProductForm", product ?? new Product());
            }
            return PartialView("_ProductForm", new Product());
        }
    }
}