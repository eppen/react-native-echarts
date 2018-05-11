import React, { Component } from 'react';
import { WebView, View, StyleSheet, Platform } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';

const source = (Platform.OS == 'ios') ? require('./tpl.html') : {'uri':'file:///android_asset/echarts/tpl.html'}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.setNewOption = this.setNewOption.bind(this);
  }
  

  componentWillReceiveProps(nextProps) {
    if(nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  setNewOption(option) {
    this.refs.chart.postMessage(JSON.stringify(option));
  }

  render() {
    return (
      <View style={{flex: 1, height: this.props.height || 400,}}>
        <WebView
          ref="chart"
          scrollEnabled = {false}
          injectedJavaScript = {renderChart(this.props)}
          scalesPageToFit={Platform.OS === 'android' ? true : false}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.option.backgroundColor || 'rgba(0, 0, 0, 0)'
          }}
          source={require('./tpl.html')}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
