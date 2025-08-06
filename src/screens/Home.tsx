// import { StyleSheet, View } from 'react-native';
// import { Button, Text } from 'react-native-paper';
// import { BottomNavigation } from 'react-native-paper';

// export function Home() {
//   return (
//     <View style={styles.container}>
//       <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
//         Press me
//       </Button>
//       <Text variant="headlineMedium" style={{ color: 'black',textAlign:'center' }}>Welcome to the Home Screen!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 10,
//   },
// });

import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import Submission from './Submission';
import List from './List';
import LeaderBoard from './LeaderBoard';




const Home = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'listing', title: 'Ideas', focusedIcon: 'format-list-bulleted' },
        { key: 'leaderboard', title: 'Leaderboard', focusedIcon: 'trophy' },
        { key: 'submission', title: 'Submit', focusedIcon: 'plus-box', unfocusedIcon: 'plus-box-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        submission: Submission,
        listing: List,
        leaderboard: LeaderBoard,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default Home;
