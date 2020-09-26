import React from 'react';
import { Layout, PageHeader } from 'antd';
import './App.scss';
import 'antd/dist/antd.css'
import { Grid } from './features';
import { Control } from './components';
import { TITLE, FOOTER_LINKS } from './constants';

const { Header, Footer, Content } = Layout;

const App: React.FC = () => (
  <Layout className="App">
    <Header>
      <PageHeader
        className="site-page-header"
        title={TITLE}
      />
    </Header>
    <Content className="content">
      <Grid />
      <Control />
    </Content>
    <Footer className="footer">
      <div className="footer-container">
        <a href={FOOTER_LINKS.code.link} className="github" target="blank">{FOOTER_LINKS.code.title}</a>
        <a href={FOOTER_LINKS.projects.link} className="github" target="blank">{FOOTER_LINKS.projects.title}</a>
      </div>
    </Footer>
  </Layout>
);

export default App;
