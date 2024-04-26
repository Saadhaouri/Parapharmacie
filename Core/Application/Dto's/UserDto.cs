<<<<<<< HEAD
﻿using Domaine.Entities;

namespace Core.Application.Dto_s;
    public class UserDto
    {
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; }

    public virtual ICollection<AddressDto> Addresses { get; set; }

}

=======
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Dto_s
{
    internal class UserDto
    {
    }
}
>>>>>>> origin/main
