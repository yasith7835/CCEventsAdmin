import React, { useEffect, useState } from "react";
import Case from "../components/Case";

const mockUsers = [
    {
        user_id: "user1",
        user_type: "student",
        first_name: "John",
        last_name: "Doe",
        phone: "123-456-7890",
        email: "john.doe@example.com",
        n_tickets_scanned: 3,
    },
    {
        user_id: "user2",
        user_type: "guest",
        first_name: "Jane",
        last_name: "Smith",
        phone: "987-654-3210",
        email: "jane.smith@example.com",
        n_tickets_scanned: 1,
    },
    {
        user_id: "user3",
        user_type: "student",
        first_name: "Alice",
        last_name: "Johnson",
        phone: "555-555-5555",
        email: "alice.johnson@example.com",
        n_tickets_scanned: 5,
    },
    {
        user_id: "user4",
        user_type: "guest",
        first_name: "Bob",
        last_name: "Brown",
        phone: "666-666-6666",
        email: "bob.brown@example.com",
        n_tickets_scanned: 2,
    },
];

export default function AdvancedFeature() {
    const [users, setUsers] = useState(mockUsers);
    const [filteredUsers, setFilteredUsers] = useState(mockUsers);
    const [searchQuery, setSearchQuery] = useState("");
    const [entries, setEntries] = useState("All");

    useEffect(() => {
        document.title = "Advanced Feature";
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === "") {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) =>
                user.user_id.toLowerCase().includes(query) ||
                user.first_name.toLowerCase().includes(query)
            );
            setFilteredUsers(filtered);
        }
    };

    const handleEntriesChange = (e) => {
        const value = e.target.value;
        setEntries(value);
    };

    const getDisplayedUsers = () => {
        if (entries === "All") {
            return filteredUsers;
        } else {
            return filteredUsers.slice(0, parseInt(entries, 10));
        }
    };

    return (
        <Case>
            <div className="section-header px-4 tw-rounded-none tw-shadow-md tw-shadow-gray-200 lg:tw-rounded-lg">
                <h1 className="mb-1 tw-text-lg">General Feature</h1>
            </div>

            <div className="section-body">
                <div className="card">
                    <div className="card-body px-0">
                        <h3>Tabel General Feature</h3>
                        <div className="show-entries">
                            <p className="show-entries-show">Show</p>
                            <select
                                id="length-data"
                                className="tw-p-1"
                                value={entries}
                                onChange={handleEntriesChange}
                            >
                                <option value="1">1</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="All">All</option>
                            </select>
                            <p className="show-entries-entries">Entries</p>
                        </div>
                        <div className="search-column">
                            <p>Search: </p>
                            <input
                                type="search"
                                id="search-data"
                                placeholder="Search here..."
                                className="form-control"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="table-responsive tw-max-h-96">
                            <table>
                                <thead className="tw-sticky tw-top-0">
                                    <tr className="tw-text-gray-700">
                                        <th width="15%" className="text-center">
                                            No
                                        </th>
                                        <th>User Id</th>
                                        <th>User Type</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Tickets Scanned</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getDisplayedUsers().length > 0 ? (
                                        getDisplayedUsers().map((user, index) => (
                                            <tr key={user.user_id} className="text-center">
                                                <td>{index + 1}</td>
                                                <td className="text-left">{user.user_id}</td>
                                                <td className="text-left">{user.user_type}</td>
                                                <td className="text-left">{user.first_name}</td>
                                                <td className="text-left">{user.last_name}</td>
                                                <td className="text-left">{user.phone}</td>
                                                <td className="text-left">{user.email}</td>
                                                <td className="text-left">{user.n_tickets_scanned}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-3 table-responsive tw-mb-[-15px]"></div>
                    </div>
                </div>
            </div>
        </Case>
    );
}
