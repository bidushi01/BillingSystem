using BillingSystem.Dataa.Models.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BillingSystem.DataAccess.Repository
{
    public interface IInvoiceRepository
    {
        Task<string> GetNextInvoiceNumber(string personName);
        Task<IEnumerable<Invoice>> GetAll();
        Task<Invoice> GetById(int id);
        Task<int> Insert(Invoice invoice);
        Task<IEnumerable<InvoiceItem>> GetInvoiceItems(int invoiceId);
        Task InsertInvoiceItem(InvoiceItem item);

        Task<InvoiceResult> InsertSecure(InvoiceViewModel model);


    }
}
