import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/LeaveHelper';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Table = () => {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/leave/${user._id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if (response.data.success) {
                setLeaves(response.data.leaves);
                setFilteredLeaves(response.data.leaves);
            }
        } catch (error) {
            setError("Failed to fetch leaves");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const filterByInput = (e) => {
        const data = leaves.filter((leave) =>
            leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredLeaves(data);
    };

    const filterByButton = (status) => {
        const data = leaves.filter((leave) =>
            leave.status.toLowerCase() === status.toLowerCase()
        );
        setFilteredLeaves(data);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            {filteredLeaves.length > 0 ? (
                <div className='p-6'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold'>Manage Leaves</h3>
                    </div>
                    <div className='flex justify-between items-center'>
                        <input
                            type='text'
                            placeholder='Search By Emp Id'
                            className='px-4 py-0.5 border'
                            onChange={filterByInput}
                        />
                        <div className='space-x-3'>
                            <button
                                className='px-2 py-2 bg-teal-600 text-white hover:bg-teal-700'
                                onClick={() => filterByButton("Pending")}
                            >
                                Pending
                            </button>
                            <button
                                className='px-2 py-2 bg-teal-600 text-white hover:bg-teal-700'
                                onClick={() => filterByButton("Approved")}
                            >
                                Approved
                            </button>
                            <button
                                className='px-2 py-2 bg-teal-600 text-white hover:bg-teal-700'
                                onClick={() => filterByButton("Rejected")}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <DataTable columns={columns} data={filteredLeaves} pagination />
                    </div>
                </div>
            ) : (
                <div>No Leaves Available</div>
            )}
        </>
    );
};

export default Table;
