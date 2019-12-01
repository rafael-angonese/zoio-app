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

export default class Login extends Component {
    state = {
        login: '',
        senha: '',
        errorMessage: '',
    };
    cadastro = () => {
        const { navigate } = this.props.navigation;
        navigate('Cadastro');
    };
    logar = async () => {
        if (this.state.login.length === 0 || this.state.senha.length === 0) {
            this.setState({ errorMessage: 'Preencha usuário e senha para continuar!' });
            return;
        }
        try {
            const response = await api.post('/login', {
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
            this.setState({ errorMessage: "Houve um problema com o login, verifique suas credenciais!" });
        }

    };
    
    async componentDidMount() {
        const token = await AsyncStorage.getItem("@OlhoFake:token");
        const usuario = JSON.parse(await AsyncStorage.getItem("@OlhoFake:usuario"));
        if (token && usuario) {
            const { navigate } = this.props.navigation;
            navigate('MainScreen');
        }
    }

    render() {

        return (
            <Container>

                <Header androidStatusBarColor="#573ea8" style={{ backgroundColor: '#7159C1' }}>
                    <Title>Login</Title>
                </Header>
                <View>

                    <Form style={{ alignItems: 'center' }}>
                        <Item floatingLabel style={{ marginTop: 100 }}>
                            <Icon active name='person' />
                            <Input
                                placeholder='Login'
                                autoCapitalize='none'
                                onChangeText={(login) => this.setState({ login })}
                                value={this.state.login}
                                autoCorrect={false}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Icon active name='lock' />
                            <Input
                                placeholder='Senha'
                                autoCapitalize='none'
                                secureTextEntry={true}
                                onChangeText={(senha) => this.setState({ senha })}
                                value={this.state.senha}
                                autoCorrect={false}
                            />
                        </Item>

                        {this.state.errorMessage.length !== 0 && <Text style={styles.error}>{this.state.errorMessage}</Text>}

                        <Button style={{ marginTop: 50 }} full onPress={this.logar}>
                            <Text>Entrar</Text>
                        </Button>

                        <Button transparent style={{ marginTop: 50 }} onPress={this.cadastro}>
                            <Text>Criar uma conta</Text>
                        </Button>

                    </Form>
                </View>
            </Container >

        );
    }
}