import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const ColorMatchingGame = () => {
  const initialColors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange',
    'pink',
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange',
    'pink',
  ];

  const [colors, setColors] = useState(shuffleArray(initialColors));
  const [selectedColor, setSelectedColor] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer === 0) return;

    const timerId = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      // Game over logic
      alert(`Game Over! Your score: ${score}`);
      // Reset the game
      setColors(shuffleArray(initialColors));
      setSelectedColor(null);
      setMatchedPairs([]);
      setMoves(0);
      setScore(0);
      setTimer(60); // Adjust the timer duration as needed
    }
  }, [timer]);

  const handleColorPress = (color, index) => {
    if (selectedColor === null) {
      setSelectedColor({ color, index });
    } else if (selectedColor.index !== index) {
      setMoves(moves + 1);
      if (selectedColor.color === color) {
        setMatchedPairs([...matchedPairs, selectedColor.color]);
        setScore(score + 2);
      }
      setSelectedColor(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Time Left: {timer} seconds</Text>
      <Text>Moves: {moves}</Text>
      <Text>Score: {score}</Text>
      <View style={styles.grid}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorTile,
              selectedColor && selectedColor.index === index ? { backgroundColor: color } : null,
              matchedPairs.includes(color) ? { backgroundColor: 'white' } : null,
            ]}
            onPress={() => handleColorPress(color, index)}
            disabled={matchedPairs.includes(color) || timer === 0}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorTile: {
    width: 80,
    height: 80,
    margin: 5,
    backgroundColor: 'gray',
  },
});

export default ColorMatchingGame;
