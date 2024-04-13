namespace Domaine.Entities;

    public class Address
    {
        public Guid AddressID { get; set; }
        public Guid UserID { get; set; } // Foreign key
        public string Street { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public virtual User User { get; set; } // Navigation property

    }

