import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';
import { Navigator, NativeModules } from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Toolbar, BottomNavigation, Icon } from 'react-native-material-ui';
import Container from './Container';

import { TabRouter } from 'react-navigation';

import TodayView from './Contents/today';
import ProfileView from './Contents/profile';
import MapView from './Contents/map';
import ChatView from './Contents/chat';

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
    accentColor: COLOR.pink500,
  },
  toolbar: {
    container: {
      height: 70,
      paddingTop: 20
    }
  }
}

const TabRoute = TabRouter({
  Today: { screen: TodayView },
  Profile: { screen: ProfileView },
  Map: { screen: MapView },
  Chat: {screen: ChatView}
  }, {
    initialRouteName: 'Today',
  }
);

class TabContentNavigator extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: props.value.active,
    };
  }

  //this method will not get called first time
  componentWillReceiveProps(newProps){
    this.setState({
      active: newProps.value.active,
    }); 
  }

  render() {
    const Component = TabRoute.getComponentForRouteName(this.state.active);
    return <Component/>;
  }
}

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      active: 'Today',
    };
  }

  static navigationOptions = {
    title: 'Menu',
  };

  navigate() {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />

          <Toolbar
            leftElement="menu"
            centerElement={this.state.active}
            onLeftElementPress={() => this.navigate()}
          />

          <TabContentNavigator value={this.state} key={this.state} />

          <BottomNavigation active={this.state.active}
            hidden={false}
            style={{ container: { position: 'absolute', bottom: 0, left: 0, right: 0 } }}
          >
            <BottomNavigation.Action
              key="Today"
              icon="today"
              label="Today"
              onPress={() => this.setState({ active: 'Today' })}
            />
            <BottomNavigation.Action
              key="Profile"
              icon="person"
              label="Profile"
              onPress={() => {
                this.setState({ active: 'Profile' });
              }}
            />
            <BottomNavigation.Action
              key="Map"
              icon="map"
              label="Map"
              onPress={() => this.setState({ active: 'Map' })}
            />
            <BottomNavigation.Action
              key="Chat"
              icon="chat"
              label="Chat"
              onPress={() => this.setState({ active: 'Chat' })}
            />
          </BottomNavigation>

        </Container>
      </ThemeProvider>
    );
  }
}