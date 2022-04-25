import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload } from "antd";
import { useState } from "react";

const UploadUsers = () => {
    const [isModalVisible, toggleModalVisible] = useState(false);

    const props = {
        action: 'http://nphc-hr.free.beeceptor.com/employees/upload',

        beforeUpload: file => {
            const isCSV = file.type === 'text/csv'; // File type CSV check
            if (!isCSV) {
                message.error(`${file.name} is not a csv file`);
            }
            const isWithinLimit = file.size / 1024 / 1024 < 2;  // 2MB size Limit check
            if (!isWithinLimit) {
                message.error('Image must smaller than 2MB!');
            }
            return isCSV && isWithinLimit;
        },
        onChange: info => {
            console.log(info.fileList);
            if (info.fileList[0].status === 'error') {
                message.error('Image upload failed!');
            }
        },

    };


    return (
        <div className="app-upload-users" >
            <Button type='primary' onClick={() => toggleModalVisible(true)}>
                Upload users
            </Button>

            <Modal title="Upload Users" visible={isModalVisible} footer={null} onCancel={() => toggleModalVisible(false)}>

                <Upload progress {...props}>
                    <Button icon={<UploadOutlined />}>Upload csv only</Button>
                </Upload>
            </Modal>
        </div >
    )
}

export default UploadUsers;