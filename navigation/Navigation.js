//allows navigation stack to exist within tabbed navigation
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Friends from "../screens/Friends";
import FriendsAdd from "../screens/FriendsAdd";
import FriendsDetail from "../screens/FriendsDetail";

import Gifts from "../screens/Gifts";
import GiftDetail from "../screens/GiftDetail";
import GiftAdd from "../screens/GiftAdd";

import GiftLists from "../screens/GiftLists";
import GiftListDetail from "../screens/GiftListDetail";
import GiftListAdd from "../screens/GiftListAdd";

const Stack = createNativeStackNavigator();

const GiftListScreenNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="GiftList"
                component={GiftLists}
                />
            <Stack.Screen 
                name="GiftListDetail"
                component={GiftListDetail}
            />
            <Stack.Screen 
                name="GiftListAdd"
                component={GiftListAdd}
            />
        </Stack.Navigator>
    )
}

export {GiftListScreenNavigator};

const FriendScreenNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Friends"
                component={Friends}
                />
            <Stack.Screen 
                name="FriendsDetail"
                component={FriendsDetail}
                />
            <Stack.Screen
                name="FriendsAdd"
                component={FriendsAdd}
                />
        </Stack.Navigator>
    )
}

export {FriendScreenNavigator};

const GiftScreenNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Gifts"
                component={Gifts}
                />
            <Stack.Screen
                name="GiftDetail"
                component={GiftDetail}
                />
            <Stack.Screen
                name='GiftAdd'
                component={GiftAdd}
                />
        </Stack.Navigator>
    )
}

export {GiftScreenNavigator};