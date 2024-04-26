<<<<<<< HEAD
﻿using Domaine.Entities;

namespace Core.Application.Dto_s
{
    public class OrderDto
    {
        public Guid OrderID { get; set; }
        public Guid ClientID { get; set; } // Foreign key
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }

        public ICollection<ProductDto> Products { get; set; }
        public virtual Client Client { get; set; } // Navigation property


=======
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Dto_s
{
    internal class OrderDto
    {
>>>>>>> origin/main
    }
}
