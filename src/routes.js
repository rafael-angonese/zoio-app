import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import MainScreen from './components/MainScreen';
import ImageDescribe from './components/ImageDescribe';
import Sobre from './components/Sobre';
import Configuracao from './components/Configuracao';


import SideMenu from './components/SideMenu/SideMenu';

const Stack = createStackNavigator({
    MainScreen: {
        screen: MainScreen,
        navigationOptions: {
            header: null,
        }
    },
    ImageDescribe: {
        screen: ImageDescribe,
        navigationOptions: {
            headerTitle: 'Descrição',
            style: {
                backgroundColor: '#573ea8'
            }
        }
    },
});

const Drawer = createDrawerNavigator({
    MainScreen: {
        screen: Stack,
    },
    Sobre: {
        screen: Sobre,
    },
    Configuracao: {
        screen: Configuracao,
    }
}, {
    contentComponent: SideMenu,
    drawerWidth: 300
});

const Routes = createAppContainer(
    createSwitchNavigator({
        Login: {
            screen: Login,
        },
        Cadastro: {
            screen: Cadastro,
        },
        MainScreen: {
            screen: Drawer,
        },
    })
);

export default Routes;