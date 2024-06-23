const TicketCard = ({ title, value, percentage, icon }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-500 text-sm">{value}</p>
          </div>
        </div>
        <div className="text-green-500">
          <p className="font-bold">{percentage}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
