import React from 'react';
import ReactDOM from 'react-dom';
import RPList from './components/RI&C/RPList.jsx';
import OutfitList from './components/RI&C/OutfitList.jsx';
import Overview from './components/Overview/OverviewIndex.jsx';
import RROverview from './components/R&R/RROverview.jsx';

// Q&A imports
import { Provider as QAProvider } from './components/QA/QAContext.jsx';
import QASection from './components/QA/QASection.jsx';

// Get the product id from query param
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_id = urlParams.get('product_id');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product_id: product_id ?? 1,
    };

    this.handleProductChange = this.handleProductChange.bind(this);
  }

  handleProductChange(id) {
    this.setState({ product_id: id });
  }

  render() {
    return (
      <div className="App">
        {/* <Overview product_id={this.state.product_id} /> */}
        {/* <RPList
          productId={this.state.product_id}
          handleProductChange={this.handleProductChange}
        /> */}
        {/* <OutfitList productId={this.state.product_id} /> */}
        <QAProvider>
          <QASection productId={this.state.product_id} />
        </QAProvider>
        {/* <RROverview product_id={this.state.product_id} /> */}
      </div>
    );
  }
}

export default App;
