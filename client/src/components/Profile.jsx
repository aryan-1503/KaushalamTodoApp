import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext.jsx";
import TaskContext from "../context/TaskContext.jsx";

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            {user ? (
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-2 text-center">{user.username}'s Profile</h2>
                    <p className="text-lg mb-2"><strong>Email:</strong> {user.email}</p>
                    <p className="text-lg mb-2">
                        <strong>Verification Status:</strong> {user.isVerified ? 'Verified' : 'Not Verified'}
                    </p>
                </div>
            ) : (
                <p className="text-lg">Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
