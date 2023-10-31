import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';

const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const MemoryGame = () => {
  const initialCards = [
    { id: 1, value: 'A' },
    { id: 2, value: 'B' },
    { id: 3, value: 'C' },
    { id: 4, value: 'D' },
    { id: 5, value: 'A' },
    { id: 6, value: 'B' },
    { id: 7, value: 'C' },
    { id: 8, value: 'D' },
  ];

  const [cards, setCards] = useState(shuffleArray(initialCards));
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (selected.length === 2) {
      const [firstCard, secondCard] = selected;
      if (firstCard.value === secondCard.value) {
        setMatched([...matched, firstCard.id, secondCard.id]);
        setScore(score + 1);
      }
      setTimeout(() => {
        setSelected([]);
      }, 1000);
    }
  }, [selected]);

  useEffect(() => {
    if (matched.length === initialCards.length) {
      // Game over logic
      Alert.alert('Game Over', `Your score is ${score}`, [{ text: 'Restart', onPress: resetGame }]);
    }
  }, [matched]);

  const resetGame = () => {
    setCards(shuffleArray(initialCards));
    setSelected([]);
    setMatched([]);
    setTimer(0);
    setScore(0);
  };

  const handleCardPress = (card) => {
    if (selected.length < 2 && !matched.includes(card.id)) {
      setSelected([...selected, card]);
    }
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selected.includes(item) || matched.includes(item.id)
          ? { backgroundColor: 'green' }
          : null,
      ]}
      onPress={() => handleCardPress(item)}
      disabled={selected.length === 2 || matched.includes(item.id)}
    >
      <Text style={styles.cardText}>
        {selected.includes(item) || matched.includes(item.id) ? item.value : '?'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Timer: {timer} seconds</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <FlatList
        data={cards}
        numColumns={4}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 80,
    margin: 5,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MemoryGame;
