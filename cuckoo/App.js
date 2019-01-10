
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import Row from './components/Row';
import Header from './components/Header';
import SectionHeader from './components/SectionHeader';
import Footer from './components/Footer';
// import demoData from './data';


class ListViewDemo extends Component {
  constructor(props) {
    super(props)

    this.demoData = []

    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[rowId];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData,
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(this.demoData);
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
    }
  }

  renderData() {
    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[rowId];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData,
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(this.demoData);
    this.setState({
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
    })
  }

  async getJobs() {
    let demoData = []
    let url = 'http://127.0.0.1:8000/api/jobs/';
    let username = 'bryan';
    let password = 'password';

    let headers = new Headers();

    //headers.append('Content-Type', 'text/json');
    const Buffer = require("buffer").Buffer;
    let encodedAuth = username + ":" + password
    encodedAuth = new Buffer(encodedAuth).toString("base64")
    headers.append('Authorization', 'Basic ' + encodedAuth);

    fetch(url, {method:'GET',
            headers: headers,
            //credentials: 'user:passwd'
           })
    .then(response => response.json())
    .then(json => {
      this.demoData = json;
      // console.log(this.demoData);
    });

    this.renderData()
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getJobs(), 1000)
  }

  formatData(data) {
    const status_names = {
      'RU': 'Currently Running',
      'SU': 'Completed Successfully',
      'ER': 'Exited with Error',
      'CR': 'Lost Communication with Server',
    }
    const statuses = ['RU', 'SU', 'ER', 'CR'];

    // Need somewhere to store our data
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    // Each section is going to represent a letter in the alphabet so we loop over the alphabet
    for (let sectionId = 0; sectionId < statuses.length; sectionId++) {
      // Get the character we're currently looking for
      const currentStatus = statuses[sectionId];

      // Get users whose first name starts with the current letter
      const jobs = data.filter((job) => job.status === currentStatus);

      // If there are any users who have a first name starting with the current letter then we'll
      // add a new section otherwise we just skip over it
      if (jobs.length > 0) {
        // Add a section id to our array so the listview knows that we've got a new section
        sectionIds.push(sectionId);

        // Store any data we would want to display in the section header. In our case we want to show
        // the current character
        dataBlob[sectionId] = { status: status_names[currentStatus] };

        // Setup a new array that we can store the row ids for this section
        rowIds.push([]);

        // Loop over the valid users for this section
        for (let i = 0; i < jobs.length; i++) {
          // Create a unique row id for the data blob that the listview can use for reference
          const rowId = `${sectionId}:${i}`;

          // Push the row id to the row ids array. This is what listview will reference to pull
          // data from our data blob
          rowIds[rowIds.length - 1].push(rowId);

          // Store the data we care about for this row
          dataBlob[rowId] = jobs[i];
        }
      }
    }
    console.log(dataBlob)
    return { dataBlob, sectionIds, rowIds };
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderHeader={() => <Header />}
          renderFooter={() => <Footer />}
          renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default ListViewDemo;

AppRegistry.registerComponent('ListViewDemo', () => ListViewDemo);
