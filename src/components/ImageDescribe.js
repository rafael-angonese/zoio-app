import React, { Component, Fragment } from 'react';
import { StyleSheet, Image, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { Container, Header, Footer, Spinner, FooterTab, ScrollableTab, Left, Right, Body, Title, Button, Icon, View, Fab, List, ListItem, Thumbnail, Text, Badge, Content, Tab, Tabs, TabHeading, Card, CardItem } from 'native-base';
import api from '../services/api';

export default class ImageDescribe extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    labels: [],
    objetos: [],
    textos: [],
    errorMessage: '',
    spinner: true
  };

  async componentWillMount() {
    try {
      let usuario = await AsyncStorage.getItem("@OlhoFake:usuario")
      const user = JSON.parse(usuario);

      const response = await api.post('/vision/all', {
        idioma: user.idioma,
        file: this.props.navigation.getParam('base64', 'default value'),
      });

      const { labels, objetos, textos } = response.data;
      this.setState({ spinner: false, labels: labels, objetos: objetos, textos: textos });

    } catch (error) {
      if (error.response.status == 401) {
        AsyncStorage.removeItem("@OlhoFake:token");
        AsyncStorage.removeItem("@OlhoFake:usuario");
        const { navigate } = this.props.navigation;
        alert("Ai mano faz o login novamento por favor!")
        navigate('Login');
      }
    }
  }

  render() {

    return (
      <Container>
        <View style={styles.container}>
          <Tabs renderTabBar={() => <ScrollableTab />}>
            <Tab heading={
              <TabHeading style={styles.tabHeading} >
                <Icon type="FontAwesome" name="tags" />
                <Text>Labels</Text>
              </TabHeading>}>
              <Spinner color='red' style={this.state.spinner == true ? styles.spinnertrue : styles.spinner} />
              <FlatList
                data={this.state.labels}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                  return (
                    <ListItem>
                      <Body>
                        <Text>{item}</Text>
                      </Body>
                    </ListItem>
                  );
                }}
              />
              { /*<Labels labels={this.state.objetos} /> */}
            </Tab>

            <Tab heading={
              <TabHeading style={styles.tabHeading} >
                <Icon type="FontAwesome" name="object-group" />
                <Text>Objetos</Text>
              </TabHeading>}>
              <Spinner color='red' style={this.state.spinner == true ? styles.spinnertrue : styles.spinner} />
              <FlatList
                data={this.state.objetos}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                  return (
                    <ListItem>
                      <Body>
                        <Text>{item}</Text>
                      </Body>
                    </ListItem>
                  );
                }}
              />
              { /* <Labels labels={this.state.objetos} /> */}
            </Tab>

            <Tab heading={
              <TabHeading style={styles.tabHeading} >
                <Icon type="MaterialCommunityIcons" name="format-text" />
                <Text>Textos</Text>
              </TabHeading>}>
              <Spinner color='red' style={this.state.spinner == true ? styles.spinnertrue : styles.spinner} />
              <FlatList
                data={this.state.textos}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                  return (
                    <ListItem>
                      <Body>
                        <Text>{item}</Text>
                      </Body>
                    </ListItem>
                  );
                }}
              />
              { /* <Labels labels={this.state.textos} /> */}
            </Tab>

          </Tabs>
        </View>
      </Container>
    );
  }
}

const Labels = ({ labels }) => (
  <Fragment>
    <List>
      {labels.map(label => (
        <ListItem>
          <Body>
            <Text>{label}</Text>
          </Body>
        </ListItem>
      ))}
    </List>
  </Fragment>
);


/*
const Messages = ({ messages }) => (
  <Fragment>
    <List>
      {messages.map(message => (
        <ListItem key={message.id}>
          <Body>
            <Text>Cachorro</Text>
            <Text note>80%</Text>
          </Body>
        </ListItem>
      ))}
    </List>
  </Fragment>
);
*/
const styles = StyleSheet.create({
  tabHeading: {
    backgroundColor: "#7159C1",
  },
  header: {
    backgroundColor: "#7159C1",
  },
  container: {
    flex: 1,
  },
  spinnertrue: {
    display: 'flex'
  },
  spinner: {
    display: 'none'
  }
});