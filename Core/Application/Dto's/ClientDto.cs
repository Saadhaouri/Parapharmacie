<<<<<<< HEAD
﻿namespace Core.Application.Dto_s;
public class ClientDto
{
    public Guid ClientID { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public virtual ICollection<OrderDto> Orders { get; set; }

}

=======
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Dto_s
{
    internal class ClientDto
    {
    }
}
>>>>>>> origin/main
