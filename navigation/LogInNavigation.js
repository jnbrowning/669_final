import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from "../screens/LogIn";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const LogInNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='LogIn' screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="LogIn"
                component={LogIn}
                />
            <Stack.Screen screenOptions={{ headerShow: false }}
                name="User"
                component={TabNavigator}
        />
        </Stack.Navigator>
    )
}
export default LogInNavigation ;