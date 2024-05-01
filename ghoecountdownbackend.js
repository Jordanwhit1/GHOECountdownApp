import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
    //Sets the date
  const [date, setDate] = useState(new Date());
  //sets the homecoming date
  const [homecomingDate, setHomecomingDate] = useState(new Date('2024-10-19T00:00:00.000Z'));  //Initiates the countdown state
  const [countdown, setCountdown] = useState('');
  //
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const calculateCountdown = () => {
      const currentTime = new Date().getTime();
      const homecomingTime = homecomingDate.getTime();
      const difference = homecomingTime - currentTime;
        //Math to calculate the days, hours, minutes and seconds
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      //calculate how far in specific intervals for notififcations 
        if (difference > 0) {
          const sixMonthsAway = new Date(homecomingTime - 6 * 30 * 24 * 60 * 60 * 1000);
          const twoMonthsAway = new Date(homecomingTime - 2 * 30 * 24 * 60 * 60 * 1000);
          const oneMonthAway = new Date(homecomingTime - 30 * 24 * 60 * 60 * 1000);
          const twoWeeksAway = new Date(homecomingTime - 2 * 7 * 24 * 60 * 60 * 1000);
          const oneWeekAway = new Date(homecomingTime - 7 * 24 * 60 * 60 * 1000);
          const dayOf = new Date(homecomingTime - 24 * 60 * 60 * 1000);
      
          if (difference > 6 * 30 * 24 * 60 * 60 * 1000) {
            PushNotification.localNotificationSchedule({
              message: 'Homecoming is 6 months away!',
              date: sixMonthsAway,
            });
          }
      
          if (difference > 2 * 30 * 24 * 60 * 60 * 1000 && difference <= 6 * 30 * 24 * 60 * 60 * 1000) {
            PushNotification.localNotificationSchedule({
              message: 'Homecoming is 2 months away!',
              date: twoMonthsAway,
            });
          }
      
          if (difference > 30 * 24 * 60 * 60 * 1000 && difference <= 2 * 30 * 24 * 60 * 60 * 1000) {
            PushNotification.localNotificationSchedule({
              message: 'Homecoming is 1 month away!',
              date: oneMonthAway,
            });
          }
      
          if (difference > 2 * 7 * 24 * 60 * 60 * 1000 && difference <= 30 * 24 * 60 * 60 * 1000) {
            PushNotification.localNotificationSchedule({
              message: 'Homecoming is 2 weeks away!',
              date: twoWeeksAway,
            });
          }
      
          if (difference > 7 * 24 * 60 * 60 * 1000 && difference <= 2 * 7 * 24 * 60 * 60 * 1000) {
            PushNotification.localNotificationSchedule({
              message: 'Homecoming is 1 week away!',
              date: oneWeekAway,
            });
          }
      
          if (difference > 24 * 60 * 60 * 1000 && difference <= 7 * 24 * 60 * 60 * 1000) {
            PushNotification.localNotificationSchedule({
              message: 'Homecoming is tomorrow!',
              date: dayOf,
            });
          }
        }, [homecomingDate]);

        }

     }  

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [homecomingDate]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setHomecomingDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <Text onPress={showDatepicker}>Select Homecoming Date</Text>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text>{countdown}</Text>
    </View>
  );
};

export default App;