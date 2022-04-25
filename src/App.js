import './App.scss';
import { useEffect, useState } from 'react';
import { EMPLOYEES } from './constants';
import EmployeesDashboard from './components/EmployeesDashboard';

import 'antd/dist/antd.min.css'; // or 'antd/dist/antd.less'
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { Content } from 'antd/lib/layout/layout';
import AppSideNav from './components/AppSideNav';
import UploadUsers from './components/UploadUsers';

function App() {

  const [employees, updateEmployees] = useState(EMPLOYEES)

  useEffect(() => {
    // fetchEmployees();
  }, [])

  const fetchEmployees = async () => {
    const response = await fetch('http://nphc-hr.free.beeceptor.com/emplyees', {
      method: "GET",
      mode: 'cors',
    }).catch(err => console.error('API Error'));
    const employees = await response.json();
    console.log({ employees });
  }
  return (
    <div className="App">
      <Layout hasSider>
        <Sider breakpoint="lg"
          collapsedWidth="0"><AppSideNav /></Sider>
        <Layout>
          <Content className='main-content'>
            <UploadUsers />
            <EmployeesDashboard />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
