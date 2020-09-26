import React from 'react';
import { Layout, PageHeader } from 'antd';
import './App.scss';
import 'antd/dist/antd.css'
import { Control, Grid } from './features';

const { Header, Footer, Content } = Layout;

function App() {

  return (
    <Layout className="App">
      <Header>
        <PageHeader
          className="site-page-header"
          title="2D сетка с координатами объектов (точек) по x,y."
          subTitle=" (Декартова система)"
        />
      </Header>
      <Content className="content">
        <Grid />
        <Control />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
