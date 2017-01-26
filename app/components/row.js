import React, { Component } from 'react'
import { View, Text, Switch, TouchableOpacity } from 'react-native'

import RowStyles from '../styles/RowStyles'

export default class Row extends Component {
    render() {
        const { complete } = this.props;
        return (
            <View style={RowStyles.STYLES.container}>
                <Switch 
                    onValueChange={this.props.onComplete}
                    value={complete}
                />
                <View style={RowStyles.STYLES.textWrap}>
                    <Text style={[RowStyles.STYLES.text, complete && RowStyles.STYLES.complete ]}>
                        {this.props.text}</Text>
                </View>
                <TouchableOpacity onPress={this.props.onRemove}>
                    <Text style={RowStyles.STYLES.destroy}>X</Text>
                </TouchableOpacity>
            </View>
        )
    }
}