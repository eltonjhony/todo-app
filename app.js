import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ListView, Keyboard } from 'react-native'

import Header from './header'
import Footer from './footer'
import Row from './row'

export default class App extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            value: "",
            items: [],
            datasource: ds.cloneWithRows([])
        }
        this.handleToggleComplete = this.handleToggleComplete.bind(this);
        this.setSource = this.setSource.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this)
    }
    setSource(items, itemsDatasource, otherState = {}) {
        this.setState({
            items,
            datasource: this.state.datasource.cloneWithRows(itemsDatasource),
            ...otherState
        })
    }
    handleToggleComplete(key, complete) {
        const newItems = this.state.items.map((item) => {
            if (item.key !== key) return item;
            return {
                ...item,
                complete
            }
        })
        this.setSource(newItems, newItems);
    }
    handleToggleAllComplete() {
        const complete = !this.state.allComplete;
        const newItems = this.state.items.map((item) => ({
            ...item,
            complete
        }));
        this.setSource(newItems, newItems, { allComplete: complete })
    }
    handleAddItem() {
        if (!this.state.value) return;
        const newItems = [
            ...this.state.items, {
                key: Date.now(),
                text: this.state.value,
                complete: false
            }
        ]
        this.setSource(newItems, newItems, { value: "" })
    }
    render() {
        return (
            <View style={styles.container}>
                <Header 
                    value={this.state.value}
                    onAddItem={this.handleAddItem}
                    onToggleAllComplete={this.handleToggleAllComplete}
                    onChange={(value) => this.setState({ value })}/>
                <View style={styles.content}>
                    <ListView 
                        style={styles.list}
                        enableEmptySections
                        dataSource={this.state.datasource}
                        onScroll={() => Keyboard.dimiss()}
                        renderRow={({ key, ...row }) => {
                            return (
                                <Row key={key}
                                    text={row.text}
                                    complete={row.complete}
                                    onComplete={(complete) => this.handleToggleComplete(key, complete)} />
                            )
                        }}
                        renderSeparator={(sectionId, rowId) => {
                            return (
                                <View key={rowId} style={styles.separator} />
                            )
                        }}
                        />
                </View>
                <Footer />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        ...Platform.select({
            ios: {
                paddingTop: 30
            }
        })
    },
    content: {
        flex: 1,
    },
    list: {
        backgroundColor: '#FFF'
    },
    separator: {
        borderWidth: 1,
        borderColor: "#F5F5F5"
    }
});