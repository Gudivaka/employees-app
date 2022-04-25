import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Popconfirm, Space } from "antd";
import { useEffect, useState } from "react";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


const ActionComponent = ({ rowRecord }) => {
    const [isModalVisible, toggleModalVisible] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        if (isModalVisible) {
            form.setFieldsValue({
                name: rowRecord.name,
                username: rowRecord.username,
                salary: rowRecord.salary,
            });
        }
    }, [isModalVisible])

    const onDelete = () => {
        fetch(`https://nphc-hr.free.beeceptor.com/employees/${rowRecord.id}`, { method: 'DELETE' })
            .then(() => message.success('Employee has been deleted Successfully'))
            .catch(error => {
                message.error(error);
            });
    }

    const updateEmployee = (values) => {

        fetch(`https://nphc-hr.free.beeceptor.com/employees/${rowRecord.id}`, { method: 'PUT', data: values })
            .then(() => message.success('Employee has been updated Successfully'))
            .catch(error => {
                message.error(error);
            });
        toggleModalVisible(false);
    }

    return (
        <div>
            <Button type='link' onClick={() => toggleModalVisible(true)}>
                <EditOutlined />
            </Button>
            <Popconfirm
                placement="bottomRight"
                title="Are you sure you want to delete?"
                onConfirm={onDelete}
                okText="Yes"
                cancelText="No"
            >
                <Button type='link'>
                    <DeleteOutlined />
                </Button>
            </Popconfirm>


            <Modal title={`Edit Employee : ${rowRecord.id} `} onCancel={() => toggleModalVisible(false)} visible={isModalVisible} footer={null}>
                <Form {...layout} form={form} onFinish={updateEmployee} name="control-hooks">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="salary"
                        label="Salary"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout} >
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button htmlType="button" onClick={() => toggleModalVisible(false)}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
}


export default ActionComponent;