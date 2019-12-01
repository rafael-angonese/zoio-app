import React, { Component } from 'react'

import { StyleSheet, AsyncStorage } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, View, Icon, Title } from 'native-base';

import api from '../services/api';

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
        nome: '',
        login: '',
        senha: '',
        errorMessage: '',
    }

    login = () => {
        const { navigate } = this.props.navigation;
        navigate('Login');
    }

    cadastro = async () => {
        if (this.state.nome.length === 0 || this.state.login.length === 0 || this.state.senha.length === 0) {
            this.setState({ errorMessage: 'Preencha nome, usuário e senha para continuar!' });
            return;
        }
        if (this.state.login.length < 6) {
            this.setState({ errorMessage: 'O Login precisa ser maior que 6 caracteres' });
            return;
        }
        if (this.state.senha.length < 8) {
            this.setState({ errorMessage: 'A senha precisa ser maior que 8 caracteres' });
            return;
        }
        try {
            const response = await api.post('/usuarios', {
                nome: this.state.nome,
                login: this.state.login,
                senha: this.state.senha
            });

            const { usuario, token } = response.data;

            await AsyncStorage.multiSet([
                ['@OlhoFake:token', token],
                ['@OlhoFake:usuario', JSON.stringify(usuario)],
            ]);

            const { navigate } = this.props.navigation;
            navigate('MainScreen');

        } catch (error) {
            this.setState({ errorMessage: "Failed create user" });
        }

    }

    render() {

        return (
            <Container>
                <Header androidStatusBarColor="#573ea8" style={{ backgroundColor: '#7159C1' }}>
                    <Title>Cadastrar-se</Title>
                </Header>
                <View>

                    <Form style={{ alignItems: 'center' }}>
                        <Item floatingLabel style={{ marginTop: 100 }}>
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

                        <Item floatingLabel>
                            <Icon active name='lock' />
                            <Input
                                placeholder='Senha'
                                secureTextEntry={true}
                                onChangeText={(senha) => this.setState({ senha })}
                                value={this.state.senha}
                            />
                        </Item>

                        {this.state.errorMessage.length !== 0 && <Text style={styles.error}>{this.state.errorMessage}</Text>}

                        <Button style={{ marginTop: 50 }} full onPress={this.cadastro}>
                            <Text>Cadastrar-se</Text>
                        </Button>

                        <Button transparent style={{ marginTop: 50 }} onPress={this.login}>
                            <Text>Fazer login</Text>
                        </Button>


                    </Form>
                </View>
            </Container>

        );
    }
}
