import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Header, Footer, FooterTab, ScrollableTab, Left, Right, Body, Title, Button, Icon, View, Fab, List, ListItem, Thumbnail, Text, Badge, Content, Tab, Tabs, TabHeading, Card, CardItem } from 'native-base';

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    button: {
        margin: 7,
        display: 'flex',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#573ea8',
        shadowColor: '#537ea9',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    text: {
        fontSize: 20,
        color: '#FFFFFF',
    },
});

class SideMenu extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    logout = () => {
        AsyncStorage.removeItem("@OlhoFake:token");
        AsyncStorage.removeItem("@OlhoFake:usuario");
        const { navigate } = this.props.navigation;
        navigate('Login');
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView>

                    <TouchableOpacity style={styles.button} onPress={this.navigateToScreen('MainScreen')}>
                        <Text style={styles.text}>Câmera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={this.navigateToScreen('Configuracao')}>
                        <Text style={styles.text}>Configurações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={this.navigateToScreen('Sobre')}>
                        <Text style={styles.text}>Sobre</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={this.logout}>
                        <Text style={styles.text}>Sair</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default SideMenu;