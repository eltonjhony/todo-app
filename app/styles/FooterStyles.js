import { StyleSheet } from 'react-native'

export default class FooterStyles {
    static STYLES = StyleSheet.create({
        container: {
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        filters: {
            flexDirection: "row"
        },
        filter: {
            padding: 8,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "transparent"
        },
        selected: {
            borderColor: "rgba(175,47,47,.2)"
        }
    });
}