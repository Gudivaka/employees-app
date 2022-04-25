import { Table } from "antd";
import { useState } from "react";
import { EMPLOYEES } from "../constants";
import ActionComponent from "./ActionComponent";

const EmployeesDashboard = () => {

    const [pageSize, updatePageSize] = useState(5);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Username',
            dataIndex: 'username',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            sorter: (a, b) => a.salary - b.salary,
            render: sal => <div>${sal}</div>
        },
        {
            title: 'Action',
            render: (value, record) => <ActionComponent rowRecord={record} />
        },
    ]

    const onShowSizeChange = (current, pageSize) => {
        updatePageSize(pageSize);
    }

    return (
        <div className="emp-container">
            <div className="filter-section">

            </div>
            <Table dataSource={EMPLOYEES}
                columns={columns}
                scroll={{ x: 768 }}
                showSorterTooltip={false}
                sortDirections={['descend', 'ascend', 'descend']}
                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 15],
                    onShowSizeChange,
                    pageSize: pageSize,
                    total: EMPLOYEES.length
                }}
            />
        </div>
    )

}


export default EmployeesDashboard;