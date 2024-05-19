import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Dashboard = () => {
  return (
    <>
      <Breadcrumb>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Dashboard
        </Typography.Title>
      </Breadcrumb>
    </>
  );
};
const Breadcrumb = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
export default Dashboard;
