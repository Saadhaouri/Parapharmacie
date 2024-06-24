using Domaine.Entities;

namespace Core.Application.Dto_s;
    public class UserDto
    {

    public string Id  { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime Birthday { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
    public string UserName { get; set; }
    public virtual Address Address { get; set; }

}



