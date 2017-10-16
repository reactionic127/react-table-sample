import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import '../styles/fixed-data-table.css';
const { Table, Column, Cell } = require('fixed-data-table-2');
const FakeObjectDataListStore = require('../components/FakeObjectDataListStore');
const { ImageCell, TextCell } = require('../components/cells');

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this._dataList = new FakeObjectDataListStore(2000);
    this.state = {
      filteredDataList: this._dataList,
    };

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this._dataList,
      });
    }

    var filterBy = e.target.value.toLowerCase();
    var size = this._dataList.getSize();
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var {firstName} = this._dataList.getObjectAt(index);
      if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
    });
  }

  render() {
    const {filteredDataList} = this.state;
    let width = document.body.clientWidth;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Table Filter&Sort</h1>
        </header>
        <div className="full-width margin-t-10">
			<input
				className="margin-t-10"
				onChange={this._onFilterChange}
				placeholder="Filter by First Name"
			/>
			<br />
			<Table
				rowHeight={50}
				rowsCount={filteredDataList.getSize()}
				headerHeight={50}
				width={width}
				height={500}
				className="custom-table"
				{...this.props}>
				<Column
					columnKey="avatar"
					cell={<ImageCell data={filteredDataList} />}
					fixed={true}
					width={width/8}
				/>
				<Column
					columnKey="firstName"
					header={<Cell>First Name</Cell>}
					cell={<TextCell data={filteredDataList} />}
					fixed={true}
					width={width/6}
				/>
				<Column
					columnKey="lastName"
					header={<Cell>Last Name</Cell>}
					cell={<TextCell data={filteredDataList} />}
					fixed={true}
					width={width/6}
				/>
				<Column
					columnKey="city"
					header={<Cell>City</Cell>}
					cell={<TextCell data={filteredDataList} />}
					width={width/6}
				/>
				<Column
					columnKey="street"
					header={<Cell>Street</Cell>}
					cell={<TextCell data={filteredDataList} />}
					width={width/6}
				/>
				<Column
					columnKey="zipCode"
					header={<Cell>Zip Code</Cell>}
					cell={<TextCell data={filteredDataList} />}
					width={width/6}
				/>
			</Table>
        </div>
      </div>
    );
  }
}

export default App;
