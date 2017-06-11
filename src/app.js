import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginFrom from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null  };

  componentWillMount() {
    firebase.initializeApp ( {
      
    apiKey: 'AIzaSyBG3X4NXpKYsdUGwd0zBw9AovLeGMdY-UY',
    authDomain: 'auth-d546f.firebaseapp.com',
    databaseURL: 'https://auth-d546f.firebaseio.com',
    projectId: 'auth-d546f',
    storageBucket: 'auth-d546f.appspot.com',
    messagingSenderId: '669908841558'
  
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;