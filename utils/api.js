import { AsyncStorage } from 'react-native'

const DECK_KEY = 'Flashcards'

export function getDecks() {
  return AsyncStorage.getItem(DECK_KEY)
    .then(JSON.parse)
    .then(()=> {
      return {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
    })
}

export function getDeck(title) {
  return getDecks()
    .then(decks=> decks[title])
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getDeck(title)
    .then(deck=> {
      deck.questions = [...deck.questions, card]
      return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({
        [title]: deck
      }))
    })
}
