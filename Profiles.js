import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  Alert
} from "react-native";
import axios from "axios";
import { Card, ListItem, Button } from 'react-native-elements';

const Profile = ({
  profile: {
    name: { first = "",  last = "default" },
    login: { username},
    picture: { medium },
    email,
    id
  },
  onPress
}) => (
  <Card style={{ padding:10, margin: 10}}>
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    
    <Image
      style={styles.circle}
      source={{ uri: medium }}
      
    />
    <Text
      onPress={onPress}
      style={styles.text}
      
    >{`${first}  ${last}`}</Text>
  </View>
  </Card>
)

export default class Profiles extends React.Component {
  state = {
    profiles: [],
    loading: false,
    page:1,
    seed:1
  }

  componentDidMount() {
    this.fetchUsers()
  }

  async fetchUsers() {
    this.setState({ loading: true })
    const users = await axios.get(`https://randomuser.me/api?results=50`)
    this.setState({ profiles: users.data.results })
    this.setState({ loading: false })
  }

  render() {
    const profiles = this.state.profiles

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 50 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        {profiles.map(profile => (
          <Profile
            onPress={() => Alert.alert(`You tapped ${profile.login.username}`)}
            profile={profile}
            
          />
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 50,
    padding: 30
  },
  text: {
    fontSize: 18,
    color: "#36454f",
    marginBottom: 20
  },
  circle: {
    width: 150, 
    height: 150, 
    marginBottom: 10, 
    borderRadius: 75
  }
})