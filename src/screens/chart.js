import React from 'react';
import { StyleSheet, ScrollView, StatusBar, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

const App = () => {
    const widthAndHeight = 250;
    const series = [30, 25, 20, 25];
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50'];
    const tags = ['Food', 'Transport', 'Cloths', 'Education'];
    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <StatusBar hidden={false} />
                {/* <Text style={styles.title}>Basic</Text> */}
                <PieChart
                    style={{ marginTop: 40 }}
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                />
                <View style={styles.row}>
                    <View>

                        {sliceColor.map((item) =>
                            <View style={[styles.circle, { backgroundColor: item }]}>
                                <Text style={{ color: 'black' }}>asd</Text>
                            </View>
                        )}
                    </View><View>

                        {tags.map((item) =>
                            <View style={{ height: 50, marginLeft: 10, margin: 10, paddingTop: 15 }}>
                                <Text style={{ color: 'black', fontWeight: '700' }}>{item}</Text>
                            </View>
                        )}
                    </View><View>

                        {series.map((item) =>
                            <View style={{ height: 50, marginLeft: 10, margin: 10, paddingTop: 15 }}>
                                <Text style={{ color: 'black', fontWeight: '700' }}>{item}%</Text>
                            </View>
                        )}
                    </View>






                </View>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    row: {
        flex: 1,
        // backgroundColor: 'green',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        margin: 10,
    },
    circle: {
        margin: 10,
        borderRadius: 100,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center', height: 50,
        color: 'red',
        padding: 21,
        borderRadius: 100
    }
});

export default App;
