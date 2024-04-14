

using Domaine.Entities;
using Infra.Database;
using Para.Core.Application.Interface.IRepositories;

namespace Para.Infrastructure.Repository;
public class UserRepository : IUserRepository
{
    private readonly ParaDbContext _dbContext; 

    public UserRepository(ParaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IEnumerable<User> GetUsers()
    {
        return _dbContext.Users.ToList();
    }

    public User GetUserById(Guid userId)
    {
        return _dbContext.Users.FirstOrDefault(u => u.Id == userId)   ?? throw new InvalidOperationException("User Not found ");
    }

    public void InsertUser(User user)
    {
        _dbContext.Users.Add(user);
    }

    public void UpdateUser(User user)
    {
        _dbContext.Users.Update(user);
    }

    public void DeleteUser(Guid userId)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
        if (user != null)
        {
            _dbContext.Users.Remove(user);
        }
    }

    public void Save()
    {
        _dbContext.SaveChanges();
    }
}


