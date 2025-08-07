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
        // chnage font of the bottom navigation text
        />
    );
};

export default Home;
