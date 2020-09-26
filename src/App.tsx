import React from 'react';
import { Layout, PageHeader } from 'antd';
import './App.scss';
import 'antd/dist/antd.css'
import { Control, Grid } from './features';

const { Header, Footer, Content } = Layout;

const FOOTER_LINKS = {
  code: {
    link: 'https://github.com/alexeikravchuk/task1',
    title: 'Исходный код',
  },
  projects: {
    link: 'https://alexeikravchuk.github.io/rsschool-cv/#projects',
    title: 'Выполненные работы',
  },
};

const App: React.FC = () => (
  <Layout className="App">
    <Header>
      <PageHeader
        className="site-page-header"
        title="2D сетка с координатами объектов по x, y. "
        subTitle=" (Декартовая система)"
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
