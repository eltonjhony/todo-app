import React, { Component } from 'react'
import { View, Text, ListView, Keyboard, AsyncStorage, ActivityIndicator } from 'react-native'

import Header from '../components/header'
import Footer from '../components/footer'
import Row from '../components/row'
import AppStyles from '../styles/AppStyles'

const filterItems = (filter, items) => {
    return items.filter((item) => {
        if (filter === "ALL" ) return true;
        if (filter === "COMPLETED" ) return item.complete;
        if (filter === "ACTIVE" ) return !item.complete;
    });
}

export default class App extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            value: "",
            items: [],
            filter: "ALL",
            loading: true,
            datasource: ds.cloneWithRows([])
        }

        this.handleToggleComplete = this.handleToggleComplete.bind(this)
        this.setSource = this.setSource.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this)
        this.handleOnRemove = this.handleOnRemove.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
        this.handleClearComplete = this.handleClearComplete.bind(this)
    }

    componentWillMount() {
        AsyncStorage.getItem("items").then((json) => {
            try {
                const items = JSON.parse(json);
                this.setSource(items, items, { loading: false });
            } catch (e) {
                this.setState({
                    loading: false
                })
            }
        });
    }

    setSource(items, itemsDatasource, otherState = {}) {
        this.setState({
            items,
            datasource: this.state.datasource.cloneWithRows(itemsDatasource),
            ...otherState
        })
        AsyncStorage.setItem("items", JSON.stringify(items));
    }

    handleToggleComplete(key, complete) {
        const newItems = this.state.items.map((item) => {
            if (item.key !== key) return item;
            return {
                ...item,
                complete
            }
        })
        this.setSource(newItems, filterItems(this.state.filter, newItems));
    }

    handleToggleAllComplete() {
        const complete = !this.state.allComplete;
        const newItems = this.state.items.map((item) => ({
            ...item,
            complete
        }));
        this.setSource(newItems, filterItems(this.state.filter, newItems), { allComplete: complete })
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
        this.setSource(newItems, filterItems(this.state.filter, newItems), { value: "" })
    }

    handleOnRemove(key) {
        const newItems = this.state.items.filter((item) => {
            return item.key !== key;
        })
        this.setSource(newItems, filterItems(this.state.filter, newItems));
    }

    handleFilter(filter) {
        this.setSource(this.state.items, filterItems(filter, this.state.items), { filter })
    }

    handleClearComplete() {
        const newItems = filterItems("ACTIVE", this.state.items);
        this.setSource(newItems, filterItems(this.state.filter, newItems));
    }

    render() {
        return (
            <View style={AppStyles.STYLES.container}>
                <Header 
                    value={this.state.value}
                    onAddItem={this.handleAddItem}
                    onToggleAllComplete={this.handleToggleAllComplete}
                    onChange={(value) => this.setState({ value })}/>
                <View style={AppStyles.STYLES.content}>
                    <ListView 
                        style={AppStyles.STYLES.list}
                        enableEmptySections
                        dataSource={this.state.datasource}
                        onScroll={Keyboard.dismiss}
                        renderRow={({ key, ...row }) => {
                            return (
                                <Row key={key}
                                    text={row.text}
                                    complete={row.complete}
                                    onRemove={() => this.handleOnRemove(key)}
                                    onComplete={(complete) => this.handleToggleComplete(key, complete)} />
                            )
                        }}
                        renderSeparator={(sectionId, rowId) => {
                            return (
                                <View key={rowId} style={AppStyles.STYLES.separator} />
                            )
                        }}
                        />
                </View>
                <Footer
                    count={filterItems("ACTIVE", this.state.items).length}
                    filter={this.state.filter}
                    onClearComplete={this.handleClearComplete}
                    onFilter={this.handleFilter}/>
                {this.state.loading && <View style={AppStyles.STYLES.indicator}>
                    <ActivityIndicator
                        animating
                        size="large">
                    </ActivityIndicator>
                </View>}
            </View>
        )
    }
}