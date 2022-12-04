import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GiftListScreenNavigator, FriendScreenNavigator, GiftScreenNavigator} from './Navigation'
import { Feather } from '@expo/vector-icons';  
const Tab = createBottomTabNavigator();

function TabNavigator() {
  
  return(
        <Tab.Navigator initialRouteName='ListTab' screenOptions={{headerShown: false}}>
          <Tab.Screen 
            name='ListTab' 
            component={GiftListScreenNavigator}
            options={{
               tabBarLabel: 'Gift Lists',
                tabBarIcon: ({ color, size }) => (
                    <Feather name="list" size={size} color={color} />
                ),
            }} />
          <Tab.Screen 
            name='FriendTab' 
            component={FriendScreenNavigator} 
            options={{
              tabBarLabel: 'Friends',
               tabBarIcon: ({ color, size }) => (
                <Feather name="users" size={size} color={color}/>),
                }} />
          <Tab.Screen 
            name='GiftTab' 
            component={GiftScreenNavigator} 
            options={{
              tabBarLabel: 'Gifts',
               tabBarIcon: ({ color, size }) => (
                <Feather name="gift" size={size} color={color} />),

           }}  />
        </Tab.Navigator>
  );
}

export default TabNavigator;