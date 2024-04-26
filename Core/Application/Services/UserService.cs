using AutoMapper;
using Core.Application.Dto_s;
using Core.Application.Interface.IRepositories;
using Core.Application.Interface.IService;
using Domaine.Entities;

namespace Core.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public IEnumerable<UserDto> GetUsers()
        {
            var users = _userRepository.GetUsers();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public UserDto GetUserById(Guid userId)
        {
            var user = _userRepository.GetUserById(userId);
            return _mapper.Map<UserDto>(user);
        }

        public void AddUser(UserDto user)
        {
            var userModel = _mapper.Map<User>(user);
            _userRepository.InsertUser(userModel);
            _userRepository.Save();
        }

        public void UpdateUser(UserDto user)
        {
            var userModel = _mapper.Map<User>(user);
            _userRepository.UpdateUser(userModel);
            _userRepository.Save();
        }

        public void DeleteUser(Guid userId)
        {
            _userRepository.DeleteUser(userId);
            _userRepository.Save();
        }
    }

}
