import React, { Component } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'

export default class Row extends Component {
    render() {
        const { complete } = this.props;
        return (
            <View style={styles.container}>
                <Switch 
                    onValueChange={this.props.onComplete}
                    value={complete}
                />
                <View style={styles.textWrap}>
                    <Text style={[styles.text, complete && styles.complete ]}>
                        {this.props.text}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"  
    },
    textWrap: {
        flex: 1,
        marginHorizontal: 10,

    },
    complete: {
        textDecorationLine: "line-through"
    },
    text: {
        fontSize: 24,
        color: "#4d4d4d",

    }
});