
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  SectionList,
  Text,
  View,
  Picker
} from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

import Row from './components/Row';
import Header from './components/Header';
import SectionHeader from './components/SectionHeader';
import Footer from './components/Footer';
import demoData from './data';


class JobView extends Component {
  constructor(props) {
    super(props)

    this.demoData = demoData

    const formattedData = this.formatData(this.demoData);
    this.state = {
      data: formattedData
    }
  }

  // renderData() {
  //   const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
  //   const getRowData = (dataBlob, sectionId, rowId) => dataBlob[rowId];
  //
  //   const ds = new ListView.DataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2,
  //     sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
  //     getSectionData,
  //     getRowData,
  //   });
  //
  //   const { dataBlob, sectionIds, rowIds } = this.formatData(this.demoData);
  //   this.setState({
  //     dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
  //   })
  // }
  //
  // async getJobs() {
  //   let demoData = []
  //   let url = 'http://localhost:8000/api/jobs/';
  //   let username = 'bryan';
  //   let password = 'password';
  //
  //   let headers = new Headers();
  //
  //   //headers.append('Content-Type', 'text/json');
  //   const Buffer = require("buffer").Buffer;
  //   let encodedAuth = username + ":" + password
  //   encodedAuth = new Buffer(encodedAuth).toString("base64")
  //   headers.append('Authorization', 'Basic ' + encodedAuth);
  //
  //   fetch(url, {method:'GET',
  //           headers: headers,
  //           //credentials: 'user:passwd'
  //          })
  //   .then(response => response.json())
  //   .then(json => {
  //     this.demoData = json;
  //     console.log(this.demoData);
  //   });
  //
  //   this.renderData()
  // }
  //
  // componentDidMount() {
  //   this.timer = setInterval(() => this.getJobs(), 1000)
  // }

  formatData(data) {
    const status_names = {
      'RU': 'Currently Running',
      'SU': 'Completed Successfully',
      'ER': 'Exited with Error',
      'CR': 'Lost Communication with Server',
    }
    const statuses = ['RU', 'SU', 'ER', 'CR'];

    // Need somewhere to store our data
    const formattedData = [];

    // Each section is going to represent a letter in the alphabet so we loop over the alphabet
    for (let sectionId = 0; sectionId < statuses.length; sectionId++) {
      // Get the character we're currently looking for
      const currentStatus = statuses[sectionId];

      // Get users whose first name starts with the current letter
      const jobs = data.filter((job) => job.status === currentStatus);

      // If there are any users who have a first name starting with the current letter then we'll
      // add a new section otherwise we just skip over it
      if (jobs.length > 0) {

        // Store any data we would want to display in the section header. In our case we want to show
        // the current character
        formattedData.push({
          title: status_names[currentStatus],
          data: jobs,
        });
      }
    }
    console.log(formattedData)
    return formattedData;
  }

  render() {
    return (
      <React.Fragment>
        <SafeAreaView style={styles.container}>
          <SectionList style={styles.list}
            sections={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <Row {...item} />}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.header}>{title}</Text>
            )}
            SectionSeparatorComponent={() => <View style={styles.thick_separator} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    margin: 10,
  },
  header: {
    flex: 1,
    padding: 12,
    fontWeight: 'bold',
    backgroundColor:'#fff',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  thick_separator: {
    flex: 1,
    height: 3*StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default JobView;

AppRegistry.registerComponent('JobView', () => JobView);
