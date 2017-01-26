import { StyleSheet } from 'react-native'

export default class RowStyles {
    static STYLES = StyleSheet.create({
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
        },
        destroy: {
            fontSize: 20,
            color: "#cc9a9a"
        }
    });
}