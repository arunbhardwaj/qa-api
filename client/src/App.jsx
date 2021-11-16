import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import RPList from './components/RI&C/RPList.jsx';
import OutfitList from './components/RI&C/OutfitList.jsx'
import Overview from './components/Overview/OverviewIndex.jsx';
import RROverview from './components/R&R/RROverview.jsx';

// Q&A imports
import { Provider as QAProvider } from './components/QA/QAContext.jsx';
import QASection from './components/QA/QASection.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 39333 to 40343 (39346) 40125 40212
      product_id: 40212
    }
    this.handleProductChange = this.handleProductChange.bind(this);
  }

  handleProductChange(id) {
    this.setState({ product_id: id });
  }

  render () {
    return (
    <div>
        <Overview product_id={this.state.product_id} />
        <RPList productId={this.state.product_id} handleProductChange={this.handleProductChange}/>
        <OutfitList productId={this.state.product_id}/>
        <QAProvider>
          <QASection productId={this.state.product_id}/>
        </QAProvider>
        <RROverview product_id={this.state.product_id}/>
    </div>)
  }
}


export default App;


