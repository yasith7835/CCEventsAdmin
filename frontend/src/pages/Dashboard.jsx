import React from "react";
import Case from "../components/Case";
import { useEffect } from "react";

export default function Dashboard() {

    return (
        <Case>
            <div className="section-header px-4 tw-rounded-none tw-shadow-md tw-shadow-gray-200 lg:tw-rounded-lg">
                <h1 className="mb-1 tw-text-lg">Dashboard</h1>
            </div>

            <div className="section-body">
                <div className="card">
                    <div className="card-body px-0">
                        <h3>About</h3>
                        <p className="px-4">
                            Welcome to the Curtin Colombo Events Admin Page for Unplugged 3.0!
                            Only administrators authorized by the Curtin Colombo Events Team is
                            allowed to access the sales and user data of the customers of 
                            Unplugged 3.0 tickets.
                            Sales Data provides all the data about the tickets purchased by 
                            customers through the ccevents website.
                            Admitted User Data provides all the data about the users who were
                            allowed into the event premises by scanning their respective QR code.
                        </p>
                    </div>
                </div>
            </div>
        </Case>
    );
}
