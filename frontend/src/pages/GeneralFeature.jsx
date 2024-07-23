import React, { useEffect, useState } from "react";
import Case from "../components/Case";

export default function GeneralFeature() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [entries, setEntries] = useState("All");

    useEffect(() => {
        document.title = "General Feature";
        fetchPurchasedUsers();
    }, []);

    const fetchPurchasedUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/getPurchasedUsers');
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error("Error fetching purchased users:", error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredUsers(
            query === "" ? users : users.filter(
                user => user.user_id.toLowerCase().includes(query) || user.first_name.toLowerCase().includes(query)
            )
        );
    };

    const handleEntriesChange = (e) => {
        setEntries(e.target.value);
    };

    const getDisplayedUsers = () => entries === "All" ? filteredUsers : filteredUsers.slice(0, parseInt(entries, 10));

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
                            <select id="length-data" className="tw-p-1" value={entries} onChange={handleEntriesChange}>
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
                                        <th width="15%" className="text-center">No</th>
                                        <th>User Id</th>
                                        <th>User Type</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Tickets Purchased</th>
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
                                                <td className="text-left">{user.n_tickets_bought}</td>
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
