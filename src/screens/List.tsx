import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, ToastAndroid } from 'react-native';
import { Card, Text, Button, IconButton, Chip, useTheme } from 'react-native-paper';
import useIdeaStore from '../utils/useIdeaStore';

const List = () => {
    const { ideas, setIdea, liked, setlikedidea } = useIdeaStore();
    const [expandedIds, setExpandedIds] = useState([]);
    const [sortBy, setSortBy] = useState('rating'); // 'rating' or 'votes'
    const theme = useTheme();

    const toggleExpanded = (id) => {
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const sortedIdeas = [...ideas].sort((a, b) => {
        return sortBy === 'rating'
            ? b.response.score - a.response.score
            : b.like - a.like;
    });

    const UpVote = (id) => {
        // Logic to handle upvote
        if (liked.includes(id)) {
            console.log(`Idea with id: ${id} is already liked`);
            // add toast 
            ToastAndroid.show("Already Liked",2000)
            return;
        }

        setlikedidea([...liked, id]);
        console.log(`Upvoted idea with id: ${id}`);

        // first find the idea by id
        const ideaIndex = ideas.findIndex((idea) => idea.id === id);
        if (ideaIndex !== -1) {
            const updatedIdeas = [...ideas];
            updatedIdeas[ideaIndex].like += 1; // Increment the like count
            setIdea(updatedIdeas); // Update the store with the new ideas array
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView
                style={{
                    flex: 1,
                    padding: 16,
                    paddingTop: 30,
                    backgroundColor: theme.colors.background,
                }}
            >

                {/* Sort Toggle */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginVertical: 12,
                    }}
                >
                    <Chip
                        mode="outlined"
                        selected={sortBy === 'rating'}
                        onPress={() => setSortBy('rating')}
                        style={{ marginRight: 8 }}
                        textStyle={{ fontFamily: 'Montserrat-SemiBold' }}
                    >
                        Rating
                    </Chip>
                    <Chip
                        mode="outlined"
                        selected={sortBy === 'votes'}
                        onPress={() => setSortBy('votes')}
                        textStyle={{ fontFamily: 'Montserrat-SemiBold' }}
                    >
                        Votes
                    </Chip>
                </View>

                {/* Cards */}
                {sortedIdeas.map((idea) => {
                    const isExpanded = expandedIds.includes(idea.id);

                    return (
                        <Card
                            key={idea.id}
                            style={{
                                marginBottom: 20,
                                borderRadius: 16,
                                elevation: 3,
                            }}
                            mode="elevated"
                        >
                            <Card.Title
                                title={idea.startupName}
                                subtitle={idea.tagline}
                                titleStyle={{
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: 18,
                                }}
                                subtitleStyle={{
                                    fontFamily: 'Montserrat-Regular',
                                    color: theme.colors.outline,
                                }}
                                right={(props) => (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginRight: 12,
                                        }}
                                    >
                                        <IconButton icon="star" iconColor="#facc15" size={20} />
                                        <Text
                                            style={{
                                                fontFamily: 'Montserrat-Bold',
                                                fontSize: 16,
                                            }}
                                        >
                                            {idea.response.score} / 100
                                        </Text>
                                    </View>
                                )}
                            />

                            {isExpanded && (
                                <Card.Content style={{ paddingTop: 0, paddingBottom: 8 }}>
                                    <Text
                                        style={{
                                            marginTop: 4,
                                            fontFamily: 'Montserrat-Regular',
                                            fontSize: 14,
                                            color: theme.colors.onBackground,
                                        }}
                                    >
                                        {idea.response.explanation}
                                    </Text>
                                </Card.Content>
                            )}

                            <Card.Actions
                                style={{
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 12,
                                    paddingBottom: 12,
                                }}
                            >
                                <Button
                                    mode="outlined"
                                    onPress={() => toggleExpanded(idea.id)}
                                    labelStyle={{
                                        fontFamily: 'Montserrat-SemiBold',
                                        fontSize: 13,
                                    }}
                                >
                                    {isExpanded ? 'Hide' : 'Read More'}
                                </Button>

                                <Button
                                    icon="thumb-up-outline"
                                    mode="contained-tonal"
                                    onPress={() => UpVote(idea.id)}
                                    labelStyle={{
                                        fontFamily: 'Montserrat-SemiBold',
                                        fontSize: 13,
                                    }}
                                    contentStyle={{ paddingHorizontal: 12 }}
                                >
                                    {idea.like}
                                </Button>
                            </Card.Actions>
                        </Card>
                    );
                })}
            </ScrollView>
        </SafeAreaView>

    );
};

export default List;
