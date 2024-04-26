using Domaine.Entities;

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

