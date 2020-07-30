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

    async componentDidUpdate(prevProps) {
        console.debug("componentDidUpdate", prevProps.isRefresh);

        if (this.props.isRefresh != prevProps.isRefresh) {
            console.debug("componentDidUpdate", "refresh app");
            let data = await handleLoadListArticles();
            this.setState({ listArticles: data })
            prevProps.actionStopRefreshArticles();
        }

    }

    _handleAddArticle() {
        this.props.navigation.navigate("CreateArticle");
    }

    renderSeparator = () => {
        return (
            <View
                style={styles.separator}
            />
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Loader loading={this.state.isLoading} />
                <FlatList
                    data={this.state.listArticles}
                    extraData={this.state}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    maxToRenderPerBatch={10}
                    style={{ flex: 1 }}
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
            <Text style={styles.textContent}>{item.content}</Text>
        </View>
    </TouchableOpacity>
);

const renderItem = ({ item }) => {
    return (
        <Item item={item} />
    );
};

export default connect(state => ({
    isRefresh: state.homeReducer.refreshArticles
}), {
    logout,
    actionStopRefreshArticles
})(HomeScreen);