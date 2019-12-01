import React, { Component } from 'react'

import { StyleSheet, AsyncStorage, Image } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, View, Icon, Title, Body, H1, CardItem, Card, Left } from 'native-base';

const styles = StyleSheet.create({
    error: {
        textAlign: 'center',
        color: '#ce2029',
        fontSize: 16,
        marginBottom: 15,
        marginHorizontal: 20,
    }
});

export default class Sobre extends Component {

    state = {
        nome: '',
        login: '',
        senha: '',
        errorMessage: '',
    }

    login = () => {
        const { navigate } = this.props.navigation;
        navigate('Login');
    }


    render() {

        return (
            <Container>
                <Header androidStatusBarColor="#573ea8" style={{ backgroundColor: '#7159C1' }}>
                    <Title>Sobre</Title>
                </Header>

                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text note>O Olho Fake baseia-se em tecnologia desenvolvida pela Google de visão computacional que utilizam machine learning para ajudar a compreender suas imagens com precisão.</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{ uri: 'https://miro.medium.com/max/600/1*eIMgK4vNuB5vWsB3EQIYIA.png' }} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>

                        <CardItem>
                            <Left>
                                <Body>
                                    <Text note>Além disso o Olho Fake faz traduções dinâmicas entre idiomas usando o machine learning do Google.</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{ uri: 'https://abarbarasimoes.files.wordpress.com/2018/06/google-translate.jpg?w=525' }} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                            <Body>
                                <Text>
                                    Contacte-nos:
                                </Text>
                                <Text style={{ color: '#573ea8' }}>
                                    rafael_angonese@unochapeco.edu.br
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>

            </Container>

        );
    }
}
