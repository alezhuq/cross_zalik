import { Text, View } from "react-native";
import React from "react";

const Header = () => {
    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "700",
                    paddingTop: 40,
                }}
            >
                Виконав студент групи КН-32 Кутрик Олег
            </Text>
        </View>
    );
};

export default Header;
