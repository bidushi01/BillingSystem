using BillingSystem.Dataa.DataAccess;
using BillingSystem.Dataa.Models.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace BillingSystem.DataAccess.Repository
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly ISqlDataAccess _db;

        public InvoiceRepository(ISqlDataAccess db)
        {
            _db = db;
        }

        public async Task<string> GetNextInvoiceNumber(string personName)
        {
            var result = await _db.GetData<dynamic, dynamic>("sp_GetNextInvoiceNumber", new { PersonName = personName });
            return result.FirstOrDefault()?.InvoiceNumber;
        }

        public async Task<IEnumerable<Invoice>> GetAll()
        {
            return await _db.GetData<Invoice, dynamic>("sp_GetAllInvoices", new { });
        }

        public async Task<Invoice> GetById(int id)
        {  
            var result = await _db.GetData<Invoice, dynamic>("sp_GetInvoiceById", new { InvoiceId = id });
            return result.FirstOrDefault();
        }


        public async Task<int> Insert(Invoice invoice)
        {
            return await _db.SaveDataAndGet<int, object>(
                "sp_InsertInvoice",
                new
                {
                    invoice.InvoiceNumber,
                    invoice.InvoiceName,
                    invoice.SubTotal,
                    invoice.Discount,
                    invoice.TaxableAmount,
                    invoice.Vat,
                    invoice.RoundOff,
                    invoice.NetAmount,
                    invoice.PaymentMode,
                    invoice.Remark
                });
        }

        public async Task<IEnumerable<InvoiceItem>> GetInvoiceItems(int invoiceId)
        {
            return await _db.GetData<InvoiceItem, dynamic>("sp_GetInvoiceItemsByInvoiceId", new { InvoiceId = invoiceId });
        }

        public async Task InsertInvoiceItem(InvoiceItem item)
        {
            await _db.SaveData("sp_InsertInvoiceItem", new
            {
                item.InvoiceId,
                item.ProductId,
                item.Quantity,
                item.Rate,
                item.Amount,
                item.IsTaxable
            });
        }

        public async Task<InvoiceResult> InsertSecure(InvoiceViewModel model)
        {
            var itemsJson = JsonSerializer.Serialize(model.Items);

            var result = await _db.GetData<InvoiceResult, dynamic>(
                "sp_InsertInvoice",
                new
                {
                    InvoiceNumber = model.InvoiceNumber,
                    InvoiceName = model.InvoiceName,
                    DiscountValue = model.DiscountValue,
                    DiscountType = model.DiscountType,
                    PaymentMode = model.PaymentMode,
                    Remark = model.Remark,
                    ItemsJson = itemsJson
                }
            );

            return result.FirstOrDefault();
        }
    }
}
