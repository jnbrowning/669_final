import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './data/Reducer';
import LogInNavigation from './navigation/LogInNavigation';

const store = configureStore({
  reducer: rootReducer, 
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <LogInNavigation />
      </NavigationContainer>
    </Provider>
  );
}