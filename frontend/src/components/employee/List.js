import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { EmployeeButtons } from '../../utils/EmployeeHelper';
import { columns } from '../../utils/EmployeeHelper';  

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployees, setFilteredEmployees] = useState([]);  

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get("https://projectserver-api.vercel.app/api/employee", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: emp.userId.profileImage ? (
                            <img src={`http://localhost:4000/${emp.userId.profileImage}`} alt={emp.userId.name} width="50" height="50"/>
                        ) : 'No Image',
                        action: (
                            <EmployeeButtons Id={emp._id} />
                        ),
                    }));
                    setEmployees(data);
                    setFilteredEmployees(data);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setEmpLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const filterEmployees = (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = employees.filter(emp =>
            emp.name.toLowerCase().includes(query) || emp.dep_name.toLowerCase().includes(query)
        );
        setFilteredEmployees(filtered);
    };

    return (
        <div className='p-6'>
            <div className="text-center">
                <h3 className="text-2x1 font-bold">Manage Employees</h3>
            </div>
            <div className="flex justify-between items-center mb-5">
                <input
                    type="text"
                    placeholder="Search by Emp Name or Department"
                    className="px-4 py-0.5 border"
                    onChange={filterEmployees}
                />
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Add New Employee
                </Link>
            </div>

            {empLoading ? (
                <div>Loading...</div>
            ) : (
                <DataTable columns={columns} data={filteredEmployees} pagination />
            )}
        </div>
    );
}

export default List;
