
import { StyleSheet, Platform } from 'react-native'

export default class AppStyles {
    static STYLES = StyleSheet.create({
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
        },
        indicator: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,.2)"
        }
    });
}

