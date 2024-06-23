using Core.Application.Dto_s;

namespace BetyParaAPI.ViewModel
{
    public class ClientViewModel
    {
        public Guid ClientID { get; set; }
        public string Firstname { get; set; }
        public string LastName { get; set; }
        public string CIN { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public AddressClientViewModel Address { get; set; }
    }

}
