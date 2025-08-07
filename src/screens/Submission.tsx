import React, { use, useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Animated, Easing, View } from 'react-native';
import { Text, TextInput, Button, useTheme, Card } from 'react-native-paper';
import useIdeaStore from '../utils/useIdeaStore';


const AIResponse = ({ score, explanation, animation }) => {
    const { colors } = useTheme();

    const clampedScore = Math.min(Math.max(score, 0), 100); // Clamp between 0–100
    const doneWidth = `${clampedScore}%`;
    const remainingWidth = `${100 - clampedScore}%`;

    return (
        <Animated.View style={[styles.responseContainer, { transform: [{ translateY: animation }] }]}>
            <Card style={styles.card}>
                <Card.Content>


                    <Text variant="titleLarge" style={[styles.title, { color: colors.primary, textAlign: 'left' }]}>
                        Startup Evaluation
                    </Text>

                    <Text style={[styles.scoreText, { color: colors.primary }]}>
                        Score: <Text style={styles.scoreValue}>{clampedScore}/100</Text>
                    </Text>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressDone, { width: doneWidth }]} />
                        <View style={[styles.progressRemaining, { width: remainingWidth }]} />
                    </View>
                    <Text style={[styles.explanation, { color: colors.primary }]}>
                        {explanation}
                    </Text>
                </Card.Content>
            </Card>
        </Animated.View>
    );
};


const Submission = () => {
    const [startupName, setStartupName] = useState('');
    const [tagline, setTagline] = useState('');
    const [description, setDescription] = useState('');
    const { colors } = useTheme();
    const apiKey = process.env.EXPO_PUBLIC_GROQ_KEY;
    const apiEndpoint = process.env.EXPO_PUBLIC_GROQ_ENDPOINT;
    const [evaluation, setEvaluation] = useState(null);
    const slideAnim = useRef(new Animated.Value(-200)).current; // Start above the screen
    const { setIdea, ideas } = useIdeaStore();

    useEffect(() => {
        if (evaluation) {
            showResponse();
        }
    }, [evaluation]);

    useEffect(() => {
        console.log('Ideas updated:', ideas);
    }, [ideas])

    const showResponse = () => {
        // Animate down when evaluation is set
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const handleSubmit = async () => {
        // Validate inputs
        if (!startupName || !tagline || !description) {
            console.log('Please fill all fields');
            return;
        }

        console.log('Submitted:', { startupName, tagline, description });

        try {

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'llama3-70b-8192', // or whichever model you're using
                    messages: [
                        {
                            role: 'system',
                            content: `You are a startup evaluator. Return only a valid JSON object with two keys: "score" and "explanation".

                            - "score" must be a number between 1 and 100 based on the viability of the idea in current market conditions.
                            - "explanation" must be exactly 20 words.
                            - Do not include anything outside the JSON object.

                            Your response should reflect deep understanding of current startup trends and market needs.`,
                        },
                        {
                            role: 'user',
                            content: `Startup Name: ${startupName}\nTagline: ${tagline}\nDescription: ${description}\nGive it a score from 1 to 100 and explain why.`,
                        },
                    ],
                    // response_format: "json",
                    temperature: 0.7,
                    max_tokens: 256,
                }),
            });

            const data = await response.json();
            console.log("first : ", data.choices[0].message.content);

            const parsed = JSON.parse(data.choices[0].message.content); // FIXED
            console.log("second:", parsed);

            setEvaluation(parsed);
            setIdea([...ideas, {
                id: Date.now().toString(),
                startupName,
                tagline,
                description,
                response: parsed,
                like: 0,
            }])
            if (parsed) {
                console.log('Startup Evaluation:', parsed);
            } else {
                console.error('Invalid response format:', data);
            }
        } catch (error) {
            console.error('Error contacting GROQ API:', error);
        }
    };


    return (
        <ScrollView contentContainerStyle={{ backgroundColor: colors.background, flex: 1, marginHorizontal: 20, justifyContent: "center" ,marginTop:30}}>
            <Text variant="titleLarge" style={[styles.title, { color: colors.primary, fontFamily: 'Montserrat-Bold' }]}>
                Idea Submission
            </Text>

            <TextInput
                label="Startup Name"
                value={startupName}
                onChangeText={setStartupName}
                style={styles.input}
                mode="outlined"
                onChange={(e) => setStartupName(e.nativeEvent.text)}
                contentStyle={{ fontFamily: 'Montserrat-Medium' }}
            />
            <TextInput
                label="Tagline"
                value={tagline}
                onChangeText={setTagline}
                style={styles.input}
                mode="outlined"
                onChange={(e) => setTagline(e.nativeEvent.text)}
                contentStyle={{ fontFamily: 'Montserrat-Medium' }}
            />

            <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline

                numberOfLines={4}
                onChange={(e) => setDescription(e.nativeEvent.text)}
                mode="outlined"
                contentStyle={{ fontFamily: 'Montserrat-Medium' }}
            />

            <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
                labelStyle={{ fontFamily: 'Montserrat-SemiBold' }}
            >
                Submit
            </Button>

            {evaluation && (
                <AIResponse score={evaluation.score} explanation={evaluation.explanation} animation={slideAnim} />
            )}

        </ScrollView>
    );
};

export default Submission;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
    },

    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
    },
    responseContainer: {
        marginTop: 20,
        padding: 20,
        borderRadius: 12,
    },

    card: {
        elevation: 4,
    },
    progressContainer: {
        flexDirection: 'row',
        height: 8,
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
    },
    progressDone: {
        backgroundColor: '#69139bff',
        height: '100%',
    },
    progressRemaining: {
        backgroundColor: '#E0E0E0',
        height: '100%',
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    scoreText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        marginBottom: 6,
    },
    scoreValue: {
        fontWeight: '600',
    },
    explanation: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
    },

});
