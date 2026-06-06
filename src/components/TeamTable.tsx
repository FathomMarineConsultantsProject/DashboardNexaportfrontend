interface TeamMember {
  id: string;
  name: string;
  specializations: string;
  location: string;
  status: "Available" | "On assignment" | "Inactive";
  rating: number;
}

const TeamTable = () => {
  const TeamMembers: TeamMember[] = [
    {
      id: "FN-2025-001",
      name: "Nipun Chatrath",
      specializations: "Container Ships, Bulk Carriers",
      location: "Singapore",
      status: "Available",
      rating: 0,
    },
    {
      id: "FN-2025-002",
      name: "Surveyor 2",
      specializations: "Oil Tankers, Chemical Tankers",
      location: "Yokohama",
      status: "Available",
      rating: 0,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-lg font-medium">Team Management</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Specializations
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {TeamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {member.id}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900 ">
                  {member.name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {member.specializations}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {member.location}
                </td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      member.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{member.rating.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;
