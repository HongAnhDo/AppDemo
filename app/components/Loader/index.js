import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';
const Loader = props => {
    const {
        loading,
        ...attributes
    } = props;
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            backD
            visible={loading}
            style={[styles.container, styles.horizontal]}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        size="large"
                        color="blue"
                        animating={loading} />
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    modalBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor:'#00000040'

    },

    activityIndicatorWrapper: {
        width: 80,
        height: 80,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }

});
export default Loader;