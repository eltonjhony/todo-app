import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import FooterStyles from '../styles/FooterStyles'

export default class Footer extends Component {
    render() {
        const { filter } = this.props;
        return (
            <View style={FooterStyles.STYLES.container}>
                <Text>{this.props.count} count</Text>
                <View style={FooterStyles.STYLES.filters}>
                    <TouchableOpacity style={[FooterStyles.STYLES.filter, filter === "ALL" && FooterStyles.STYLES.selected]}
                                      onPress={() => this.props.onFilter("ALL")}>
                        <Text>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[FooterStyles.STYLES.filter, filter === "ACTIVE" && FooterStyles.STYLES.selected]}
                                      onPress={() => this.props.onFilter("ACTIVE")}>
                        <Text>Active</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[FooterStyles.STYLES.filter, filter === "COMPLETED" && FooterStyles.STYLES.selected]}
                                      onPress={() => this.props.onFilter("COMPLETED")}>
                        <Text>Completed</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.props.onClearComplete}>
                    <Text>Clear Completed</Text>
                </TouchableOpacity>
            </View>
        )
    }
}