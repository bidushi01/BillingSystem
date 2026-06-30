//using BillingSystem.Dataa.Models.Domain;
//using BillingSystem.Dataa.Repository;
//using Microsoft.AspNetCore.Mvc;

//namespace BillingSystem.UI.Controllers
//{
//    public class ProductController : Controller
//    {
//        private readonly IProductRepository _repo;

//        public ProductController(IProductRepository repo)
//        {
//            _repo = repo;
//        }

//        public IActionResult DisplayAll()
//        {
//            return View();
//        }



//        [HttpGet]
//        public async Task<IActionResult> GetProducts()
//        {
//            return Json(await _repo.GetAll());
//        }

//        [HttpGet]
//        public async Task<IActionResult> GetAllProductsIncludingInactive()
//        {
//            return Json(await _repo.GetAllIncludingInactive());
//        }

//        [HttpPost]
//        public async Task<IActionResult> Save([FromForm] Product product)
//        {
//            await _repo.Save(product);
//            return Ok();
//        }

//        [HttpPost]
//        public async Task<IActionResult> Delete([FromForm] int id)
//        {
//            await _repo.Delete(id);
//            return Ok();
//        }
//    }
//}

using BillingSystem.Dataa.Models.Domain;
using BillingSystem.Dataa.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BillingSystem.UI.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductRepository _repo;

        public ProductController(IProductRepository repo)
        {
            _repo = repo;
        }

        public IActionResult DisplayAll()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return Json(await _repo.GetAll());
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProductsIncludingInactive()
        {
            return Json(await _repo.GetAllIncludingInactive());
        }

        // UPDATED - USE SECURE METHOD
        [HttpPost]
        public async Task<IActionResult> Save([FromForm] Product product)
        {
            var result = await _repo.SaveSecure(product);

            if (result.HasError == 1)
            {
                return Json(new { success = false, message = result.Message });
            }

            return Ok();
        }

        // UPDATED - USE SECURE METHOD
        [HttpPost]
        public async Task<IActionResult> Delete([FromForm] int id)
        {
            var result = await _repo.DeleteSecure(id);

            if (result.HasError == 1)
            {
                return Json(new { success = false, message = result.Message });
            }

            return Ok();
        }
    }
}