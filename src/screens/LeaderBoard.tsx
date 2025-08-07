// import React from 'react';
// import { View, FlatList } from 'react-native';
// import { Card, Text, useTheme } from 'react-native-paper';
// import useIdeaStore from '../utils/useIdeaStore';

// const Leaderboard = () => {
//   const { ideas } = useIdeaStore();
//   const theme = useTheme();

//   // Sort ideas by votes (or score as fallback)
//   const sortedIdeas = [...ideas].sort((a, b) => {
//     const aVotes = a.like ?? 0;
//     const bVotes = b.like ?? 0;
//     return bVotes - aVotes;
//   }).slice(0, 5);

//   const getBadge = (index) => {
//     switch (index) {
//       case 0: return '🥇';
//       case 1: return '🥈';
//       case 2: return '🥉';
//       default: return '';
//     }
//   };

//   const renderItem = ({ item, index }) => {
//     const gradient = [theme.colors.primary, theme.colors.secondary ?? theme.colors.primary];
//     return (
//       <Card
//         key={item.id}
//         style={{
//           marginVertical: 10,
//           marginHorizontal: 16,
//           elevation: 4,
//           backgroundColor: theme.dark ? '#1c1c1e' : '#fff',
//         }}
//       >
//         <Card.Content>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text
//               variant="titleLarge"
//               style={{
//                 fontFamily: 'Montserrat-Bold',
//                 fontSize: 18,
//                 marginRight: 8,
//               }}
//             >
//               {getBadge(index)}
//             </Text>
//             <View style={{ flex: 1 }}>
//               <Text
//                 variant="titleLarge"
//                 style={{ fontFamily: 'Montserrat-Bold', fontSize: 18 }}
//               >
//                 {item.startupName}
//               </Text>
//               <Text style={{ fontFamily: 'Montserrat-Regular', color: theme.colors.onSurface }}>
//                 {item.tagline}
//               </Text>
//             </View>
//           </View>

//           <View style={{ marginTop: 10 }}>
//             <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14 }}>
//               Votes: {item.like}
//             </Text>
//             <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14 }}>
//               Score: {item.response.score}/100
//             </Text>
//           </View>
//         </Card.Content>
//       </Card>
//     );
//   };

//   return (
//     <FlatList
//       data={sortedIdeas}
//       keyExtractor={(item) => item.id}
//       renderItem={renderItem}
//       ListHeaderComponent={
//         <Text
//           variant="headlineMedium"
//           style={{
//             margin: 16,
//             fontFamily: 'Montserrat-Bold',
//             textAlign: 'center',
//           }}
//         >
//           🚀 Top Startup Ideas
//         </Text>
//       }
//     />
//   );
// };

// export default Leaderboard;




import React from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import useIdeaStore from '../utils/useIdeaStore';
import { LinearGradient } from 'expo-linear-gradient';

const Leaderboard = () => {
    const { ideas } = useIdeaStore();
    const theme = useTheme();

    // Sort top 5 ideas by likes
    const sortedIdeas = [...ideas].sort((a, b) => (b.like ?? 0) - (a.like ?? 0)).slice(0, 5);

    const getBadge = (index) => {
        switch (index) {
            case 0: return '🥇';
            case 1: return '🥈';
            case 2: return '🥉';
            default: return '🎉';
        }
    };

    const renderItem = ({ item, index }) => {
        const gradientColors = [
            theme.colors.primary,
            theme.colors.secondary ?? theme.colors.primary,
        ];

        return (
            <Card
                key={item.id}
                style={{
                    marginVertical: 10,
                    marginHorizontal: 16,
                    elevation: 4,
                    borderRadius: 16,
                    overflow: "hidden",
                }}
            >
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.8, y: 1 }}
                    style={{
                        padding: 16, justifyContent: 'center', alignItems: 'center'
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {/* Badge */}
                        <Text
                            style={{
                                fontFamily: "Montserrat-Bold",
                                fontSize: 50,
                                marginRight: 12,
                                color: theme.colors.onPrimary,
                            }}
                        >
                            {getBadge(index)}
                        </Text>

                        {/* Startup Info */}
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontFamily: "Montserrat-Bold",
                                    fontSize: 18,
                                    color: theme.colors.onPrimary,
                                }}
                            >
                                {item.startupName}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Montserrat-Regular",
                                    fontSize: 14,
                                    color: theme.colors.onPrimary,
                                    marginTop: 2,
                                }}
                                numberOfLines={1}
                            >
                                {item.tagline}
                            </Text>
                        </View>
                        {/* Votes and Score */}
                        <View
                            style={{
                                marginTop: 12,
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Montserrat-SemiBold",
                                    fontSize: 14,
                                    color: theme.colors.onPrimary,
                                }}
                            >
                                Votes: {item.like}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Montserrat-SemiBold",
                                    fontSize: 14,
                                    color: theme.colors.onPrimary,
                                }}
                            >
                                Score: {item.response?.score ?? 0}/100
                            </Text>
                        </View>
                    </View>


                </LinearGradient>
            </Card>
        );
    };


    return (
        <SafeAreaView style={{ paddingTop: 30 }}>

            <FlatList
                data={sortedIdeas}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListHeaderComponent={
                    <Text
                        variant="headlineMedium"
                        style={{
                            margin: 16,
                            fontFamily: 'Montserrat-Bold',
                            textAlign: 'center',
                            color: theme.colors.primary,
                        }}
                    >
                        Top Startup Ideas
                    </Text>
                }
            />
            {ideas.length <= 0 &&
                <Text variant="titleLarge" style={[styles.title, { color: theme.colors.backdrop, fontFamily: 'Montserrat-Bold' }]}>
                    No StartUp Idea Available
                </Text>
            }
        </SafeAreaView>

    );
};

export default Leaderboard;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
})
