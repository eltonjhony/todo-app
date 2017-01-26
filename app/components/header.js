import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import HeaderStyles from '../styles/HeaderStyles'

export default class Header extends Component {
    render() {
        return (
            <View style={HeaderStyles.STYLES.header}>
                <TouchableOpacity 
                    onPress={this.props.onToggleAllComplete}>
                    <Text style={HeaderStyles.STYLES.toggleIcon}>{String.fromCharCode(1003)}</Text>
                </TouchableOpacity>
                <TextInput
                    value={this.props.value}
                    onChangeText={this.props.onChange}
                    onSubmitEditing={this.props.onAddItem}
                    placeholder="What needs to be done?"
                    blurOnSubmit={false}
                    returnKeyType="done"
                    style={HeaderStyles.STYLES.input}
                />
            </View>
        )
    }
}