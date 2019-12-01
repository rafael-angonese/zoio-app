import React, { Component } from 'react'

import { StyleSheet, AsyncStorage } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, View, Icon, Title, CheckBox, Body, ListItem, Left, Right, Radio } from 'native-base';

//import api from '../services/api';

const styles = StyleSheet.create({
    error: {
        textAlign: 'center',
        color: '#ce2029',
        fontSize: 16,
        marginBottom: 15,
        marginHorizontal: 20,
    }
});

export default class Cadastro extends Component {

    state = {
        //nome: '',
        //login: '',
        idioma: '',
        errorMessage: '',
        //id: null
    }

    salvar = async () => {
        //if (this.state.nome.length === 0 || this.state.login.length === 0) {
        //    this.setState({ errorMessage: 'Preencha nome, usuário e senha para continuar!' });
        //    return;
        //}
        //if (this.state.login.length < 6) {
        //    this.setState({ errorMessage: 'O Login precisa ser maior que 6 caracteres' });
        //    return;
        //}
        try {
            //const response = await api.put('/usuarios/' + this.state.id, {
            //    nome: this.state.nome,
            //    login: this.state.login,
            //    idioma: this.state.idioma
            //});

            //await AsyncStorage.multiSet([
            //    ['@OlhoFake:usuario', JSON.stringify(response.data)],
            //]);
            await AsyncStorage.multiSet([
                ['@Zoio:idioma', this.state.idioma],
            ]);

            const { navigate } = this.props.navigation;
            navigate('MainScreen');

        } catch (error) {
            this.setState({ errorMessage: "Failed update user" });
        }

    }

    async componentWillMount() {
        //let usuario = await AsyncStorage.getItem("@OlhoFake:usuario")
        //let user = JSON.parse(usuario);
        //this.setState({ nome: user.nome })
        //this.setState({ login: user.login })
        //this.setState({ idioma: user.idioma })
        //this.setState({ id: user.id })
        let idioma = await AsyncStorage.getItem("@Zoio:idioma")
        this.setState({ idioma: idioma })
    }

    render() {

        return (
            <Container>
                <Header androidStatusBarColor="#573ea8" style={{ backgroundColor: '#7159C1' }}>
                    <Title>Configurações</Title>
                </Header>
                <View>

                    <Form style={{ alignItems: 'center' }}>
                        {/*
                        <Item floatingLabel style={{ marginTop: 10 }}>
                            <Icon active name='person' />
                            <Input
                                placeholder='Nome'
                                onChangeText={(nome) => this.setState({ nome })}
                                value={this.state.nome}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Icon active name='mail' />
                            <Input
                                placeholder='Login'
                                autoCapitalize='none'
                                onChangeText={(login) => this.setState({ login })}
                                value={this.state.login}
                            />
                        </Item>
                        */}

                        <Item style={{ marginTop: 50 }} onPress={() => this.setState({ idioma: 'pt' })}>
                            <Left>
                                <Text>Português Brasil</Text>
                            </Left>
                            <Right>
                                <Radio onPress={() => this.setState({ idioma: 'pt' })} selected={this.state.idioma == 'pt'} />
                            </Right>
                        </Item>

                        <Item style={{ marginTop: 20 }} onPress={() => this.setState({ idioma: 'en' })}>
                            <Left>
                                <Text>Inglês</Text>
                            </Left>
                            <Right>
                                <Radio onPress={() => this.setState({ idioma: 'en' })} selected={this.state.idioma == 'en'} />
                            </Right>
                        </Item>
                        <Item style={{ marginTop: 20 }} onPress={() => this.setState({ idioma: 'de' })}>
                            <Left>
                                <Text>Alemão</Text>
                            </Left>
                            <Right>
                                <Radio onPress={() => this.setState({ idioma: 'de' })} selected={this.state.idioma == 'de'} />
                            </Right>
                        </Item>
                        <Item style={{ marginTop: 20 }}  onPress={() => this.setState({ idioma: 'el' })}>
                            <Left>
                                <Text>Grego</Text>
                            </Left>
                            <Right>
                                <Radio onPress={() => this.setState({ idioma: 'el' })} selected={this.state.idioma == 'el'} />
                            </Right>
                        </Item>

                        {this.state.errorMessage.length !== 0 && <Text style={styles.error}>{this.state.errorMessage}</Text>}

                        <Button style={{ marginTop: 50 }} full onPress={this.salvar}>
                            <Text>Salvar</Text>
                        </Button>

                    </Form>
                </View>
            </Container>

        );
    }
}
