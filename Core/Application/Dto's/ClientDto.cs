
﻿namespace Core.Application.Dto_s;
public class ClientDto
{

    public Guid ClientID { get; set; }  
    public string Firstname { get; set; }
    public string LastName { get; set; }
    public string CIN { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }

    public AddressClientDto Address { get; set; }

}



