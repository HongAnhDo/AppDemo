import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Text,
    View
} from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/loginAction';
import { handleLoadListArticles } from '../../requests'
import AsyncStorage from '@react-native-community/async-storage';
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listArticles: []
        }
    }
    async handleLoginAction(event) {
        console.log("handleLoginAction ================");
        await AsyncStorage.removeItem("accessToken");
        this.props.logout();

    }

    async componentDidMount() {
        console.log("========================= call lisst");
        try {
            let data = await handleLoadListArticles();
            this.setState({ listArticles: data });
        } catch (e) {

        }

    }



    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.listArticles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    maxToRenderPerBatch = {10}
                    style ={{flex:1}}
                // extraData={selectedId}
                />
                <Button onPress={this.handleLoginAction.bind(this)} title="Test"> Test</Button>
            </SafeAreaView>
        );
    }
}

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
        </View>
    </TouchableOpacity>
);

const renderItem = ({ item }) => {

    return (
        <Item
            item={item}
        // onPress={() => setSelectedId(item.id)}
        // style={{ backgroundColor }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
    },
});
export default connect(null, {
    logout
})(HomeScreen);