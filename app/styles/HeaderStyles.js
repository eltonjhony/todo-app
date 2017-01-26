import { StyleSheet } from 'react-native'

export default class HeaderStyles {
    static STYLES = StyleSheet.create({
        header: {
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
        },
        toggleIcon: {
            fontSize: 30,
            color: "#CCC"
        },
        input: {
            flex: 1,
            marginLeft: 16,
            height: 50
        }
    })
}