import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Mentorship from '../screens/mentorship/Mentorship';
import MentorBooking from '../screens/mentorship/MentorBooking';

const Stack = createStackNavigator();

function MentorshipStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MentorshipList" 
        component={Mentorship}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="MentorBooking" 
        component={MentorBooking}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

export default MentorshipStack;
