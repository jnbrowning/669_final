//allows navigation stack to exist within tabbed navigation
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GiftLists from "../screens/GiftLists";
import Friends from "../screens/Friends";

import Gifts from "../screens/Gifts";
import GiftDetail from "../screens/GiftDetail";
import GiftAdd from "../screens/GiftAdd";

const Stack = createNativeStackNavigator();

const GiftListScreenNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="GiftList"
                component={GiftLists}
                />
            {/* <Stack.Screen 
                name="Details"
                component={DetailsScreen}
            />
            <Stack.Screen 
                name="AddContact"
                component={AddContactScreen}
            /> */}
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