import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuestionScreen from '../screens/QuestionScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
    </Stack.Navigator>
  );
}

export default () => <AppNavigator />;
