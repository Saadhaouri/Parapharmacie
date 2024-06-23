using Core.Application.Dto_s;

namespace Core.Application.Interface.IService;

public interface IUserService
{
    IEnumerable<UserDto> GetUsers();
    UserDto GetUserById(string userId);
    void AddUser(UserDto user);
    void UpdateUser(UserDto user);
    void DeleteUser(string userId);
}

