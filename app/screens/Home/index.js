import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/loginAction';
import { handleLoadListArticles } from '../../requests';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../../components/Loader';
import styles from './StyleFormLogin';
import { actionStopRefreshArticles } from '../../redux/actions/homeAction';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listArticles: [],
            isLoading: true
        }
    }
    async handleLoginAction(event) {
        await AsyncStorage.removeItem("accessToken");
        this.props.logout();
    }

    async componentDidMount() {
        try {
            let data = await handleLoadListArticles();
            this.setState({ listArticles: data, isLoading: false });
        } catch (e) {
            this.setState({ isLoading: false });

        }
    }

    static async getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isRefresh) {
            var data = [];
            try {
                data = await handleLoadListArticles();
            } catch (e) {
                console.log("refresh error: " + e)
            }

            nextProps.actionStopRefreshArticles();
            return {
                listArticles: data,
                isLoading: false
            }

        }
        return null;
    }


    _handleAddArticle() {
        this.props.navigation.navigate("Đăng bài");
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "80%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "10%"
                }}
            />
        );
    }


    static navigationOptions = {
        title: 'Details',
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Loader loading={this.state.isLoading} />
                <FlatList
                    data={this.state.listArticles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    maxToRenderPerBatch={10}
                    style={{ flex: 1 }}
                    extraData={this.state}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this._handleAddArticle.bind(this)}
                    style={styles.touchableOpacityStyle}>
                    <Icon
                        size={40}
                        name="add"
                        color="white"
                        style={styles.floatingButtonStyle}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author + "   Created : " + item.createdTime}</Text>
            <Text>{item.content}</Text>
        </View>
    </TouchableOpacity>
);

const renderItem = ({ item }) => {
    return (
        <Item
            item={item}
        />
    );
};

export default connect(state => ({
    isRefresh: state.homeReducer.refreshArticles
}), {
    logout,
    actionStopRefreshArticles
})(HomeScreen);