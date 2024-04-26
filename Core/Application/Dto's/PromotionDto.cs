<<<<<<< HEAD
﻿using Domaine.Entities;

namespace Core.Application.Dto_s
{
    public class PromotionDto
    {
        public Guid PromotionID { get; set; }
        public string Code { get; set; }
        public decimal Discount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ICollection<Product> Product { get; set; }

=======
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Dto_s
{
    internal class PromotionDto
    {
>>>>>>> origin/main
    }
}
