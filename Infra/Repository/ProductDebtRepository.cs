//namespace Infra.Repository
//{
//    using System;
//    using System.Collections.Generic;
//    using System.Linq;
//    using Core.Application.Interface.IRepositories;
//    using Domaine.Entities;
//    using Infra.DATA;
//    using Microsoft.EntityFrameworkCore;

//    public class ProductDebtRepository : IProductDebtRepository
//    {
//        private readonly PrDbContext _context;

//        public ProductDebtRepository(PrDbContext context)
//        {
//            _context = context;
//        }

//        public IEnumerable<ProductDebt> GetProductDebts()
//        {
//            return _context.ProductDebts
//                .Include(pd => pd.Product)
//                .Include(pd => pd.Debt)
//                .ToList();
//        }

//        public ProductDebt GetProductDebtById(Guid productId, Guid debtId)
//        {
//            return _context.ProductDebts
//                .Include(pd => pd.Product)
//                .Include(pd => pd.Debt)
//                .FirstOrDefault(pd => pd.ProductId == productId && pd.DebtId == debtId) ?? throw new InvalidOperationException("Debt not found ");
//        }

//        public void InsertProductDebt(ProductDebt productDebt)
//        {
//            _context.ProductDebts.Add(productDebt);
//            Save();
//        }

//        public void UpdateProductDebt(ProductDebt productDebt)
//        {
//            _context.Entry(productDebt).State = EntityState.Modified;
//            Save();
//        }

//        public void DeleteProductDebt(Guid productId, Guid debtId)
//        {
//            var productDebt = _context.ProductDebts.Find(productId, debtId);
//            if (productDebt != null)
//            {
//                _context.ProductDebts.Remove(productDebt);
//                Save();
//            }
//        }

//        public void Save()
//        {
//            _context.SaveChanges();
//        }
//    }

//}
