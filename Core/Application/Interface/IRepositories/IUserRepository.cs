using Domaine.Entities;

namespace Core.Application.Interface.IRepositories;

    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();
        User GetUserById(Guid userId);
        void InsertUser(User user);
        void UpdateUser(User user);
        void DeleteUser(Guid userId);
        void Save();
    }

