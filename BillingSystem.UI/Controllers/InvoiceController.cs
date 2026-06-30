//using BillingSystem.Dataa.Models.Domain;
//using BillingSystem.Dataa.Repository;
//using BillingSystem.DataAccess.Repository;
//using BillingSystem.Web.ViewModels;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Threading.Tasks;

//namespace BillingSystem.Web.Controllers
//{
//    public class InvoiceController : Controller
//    {
//        private readonly IInvoiceRepository _invoiceRepo;
//        private readonly IProductRepository _productRepo;

//        public InvoiceController(IInvoiceRepository invoiceRepo, IProductRepository productRepo)
//        {
//            _invoiceRepo = invoiceRepo;
//            _productRepo = productRepo;
//        }

//        public IActionResult Invoice()
//        {
//            return View();
//        }

//        public async Task<IActionResult> InvoiceList()
//        {
//            var invoices = await _invoiceRepo.GetAll();
//            return View(invoices);
//        }

//        [HttpGet]
//        public async Task<IActionResult> GetNextInvoiceNumber(string name)
//        {
//            var invoiceNumber = await _invoiceRepo.GetNextInvoiceNumber(name ?? "Customer");
//            return Json(new { invoiceNumber });
//        }

//        //[HttpPost]
//        //public async Task<IActionResult> Create([FromBody] InvoiceViewModel model)
//        //{
//        //    if (!ModelState.IsValid)
//        //        return BadRequest(ModelState);

//        //    try
//        //    {
//        //        var invoice = new Invoice
//        //        {
//        //            InvoiceNumber = model.InvoiceNumber,
//        //            InvoiceName = model.InvoiceName,
//        //            SubTotal = model.SubTotal,
//        //            Discount = model.Discount,
//        //            TaxableAmount = model.TaxableAmount,
//        //            Vat = model.Vat,
//        //            RoundOff = model.RoundOff,
//        //            NetAmount = model.NetAmount,
//        //            PaymentMode = model.PaymentMode,
//        //            Remark = model.Remark
//        //        };

//        //        var invoiceId = await _invoiceRepo.Insert(invoice);

//        //        // Insert invoice items
//        //        foreach (var item in model.Items)
//        //        {
//        //            var invoiceItem = new InvoiceItem
//        //            {
//        //                InvoiceId = invoiceId,
//        //                ProductId = item.ProductId,
//        //                Quantity = item.Quantity,
//        //                Rate = item.Rate,
//        //                Amount = item.Amount,
//        //                IsTaxable = item.IsTaxable
//        //            };

//        //            await _invoiceRepo.InsertInvoiceItem(invoiceItem);
//        //        }

//        //        return Json(new { success = true, message = "Invoice created successfully", invoiceId });
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return Json(new { success = false, message = ex.Message });
//        //    }
//        //}


//        [HttpPost]
//        public async Task<IActionResult> Create([FromBody] InvoiceViewModel model)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            var invoice = new Invoice
//            {
//                InvoiceNumber = model.InvoiceNumber,
//                InvoiceName = model.InvoiceName,
//                SubTotal = model.SubTotal,
//                Discount = model.Discount,
//                TaxableAmount = model.TaxableAmount,
//                Vat = model.Vat,
//                RoundOff = model.RoundOff,
//                NetAmount = model.NetAmount,
//                PaymentMode = model.PaymentMode,
//                Remark = model.Remark
//            };

//            var invoiceId = await _invoiceRepo.Insert(invoice);

//            foreach (var item in model.Items)
//            {
//                var invoiceItem = new InvoiceItem
//                {
//                    InvoiceId = invoiceId,
//                    ProductId = item.ProductId,
//                    Quantity = item.Quantity,
//                    Rate = item.Rate,
//                    Amount = item.Amount,
//                    IsTaxable = item.IsTaxable
//                };
//                await _invoiceRepo.InsertInvoiceItem(invoiceItem);
//            }

//            return Json(new { success = true, message = "Invoice created successfully", invoiceId });
//        }

//        //[HttpGet]
//        //public async Task<IActionResult> Details(int id)
//        //{
//        //    var invoice = await _invoiceRepo.GetById(id);
//        //    if (invoice == null)
//        //        return NotFound();

//        //    var items = await _invoiceRepo.GetInvoiceItems(id);
//        //    ViewBag.Items = items;

//        //    return View(invoice);
//        //}


//        [HttpGet]
//        public async Task<IActionResult> Details(int id)
//        {
//            var invoice = await _invoiceRepo.GetById(id);
//            if (invoice == null)
//                return NotFound();

//            var items = await _invoiceRepo.GetInvoiceItems(id);

//            // Pass invoice summary data to ViewBag
//            ViewBag.Items = items;
//            ViewBag.SubTotal = invoice.SubTotal;
//            ViewBag.Discount = invoice.Discount;
//            ViewBag.Vat = invoice.Vat;
//            ViewBag.NetAmount = invoice.NetAmount;

//            return View(invoice);
//        }

//        [HttpGet]
//        public async Task<IActionResult> GetAll()
//        {
//            var invoices = await _invoiceRepo.GetAll();
//            return Json(new { data = invoices });
//        }
//    }
//}


using BillingSystem.Dataa.Models.Domain;
using BillingSystem.Dataa.Repository;
using BillingSystem.DataAccess.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BillingSystem.UI.Controllers
{
    public class InvoiceController : Controller
    {
        private readonly IInvoiceRepository _invoiceRepo;
        private readonly IProductRepository _productRepo;

        public InvoiceController(IInvoiceRepository invoiceRepo, IProductRepository productRepo)
        {
            _invoiceRepo = invoiceRepo;
            _productRepo = productRepo;
        }

        public IActionResult Invoice()
        {
            return View();
        }

        public async Task<IActionResult> InvoiceList()
        {
            var invoices = await _invoiceRepo.GetAll();
            return View(invoices);
        }

        [HttpGet]
        public async Task<IActionResult> GetNextInvoiceNumber(string name)
        {
            var invoiceNumber = await _invoiceRepo.GetNextInvoiceNumber(name ?? "Customer");
            return Json(new { invoiceNumber });
        }

        // UPDATED - USE SECURE METHOD
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InvoiceViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _invoiceRepo.InsertSecure(model);

            if (result.HasError == 1)
            {
                return Json(new
                {
                    success = false,
                    message = result.Message
                });
            }

            return Json(new
            {
                success = true,
                message = "Invoice created successfully",
                invoiceId = result.InvoiceId
            });
        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var invoice = await _invoiceRepo.GetById(id);
            if (invoice == null)
                return NotFound();

            var items = await _invoiceRepo.GetInvoiceItems(id);

            ViewBag.Items = items;
            ViewBag.SubTotal = invoice.SubTotal;
            ViewBag.Discount = invoice.Discount;
            ViewBag.Vat = invoice.Vat;
            ViewBag.NetAmount = invoice.NetAmount;

            return View(invoice);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var invoices = await _invoiceRepo.GetAll();
            return Json(new { data = invoices });
        }
    }
}

