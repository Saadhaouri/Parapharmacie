<<<<<<< HEAD
﻿using Domaine.Entities;

namespace Core.Application.Dto_s
{
    public class ProductDto
    {

        public Guid ProductID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public Guid CategoryID { get; set; } // Foreign key
        public string ImageURL { get; set; }

        public DateTime DateExp { get; set; }
        public Category Category { get; set; }
        public ICollection<PromotionDto> Promotions { get; set; }

        public ICollection<Order> Ordres { get; set; }

=======
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Dto_s
{
    internal class ProductDto
    {
>>>>>>> origin/main
    }
}
