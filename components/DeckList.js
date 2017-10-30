import React, {Component}                 from 'react'
import {connect}                          from 'react-redux'
import {Constants}                        from 'expo'
import {View, Text}                       from 'react-native'

class DeckList extends Component {

  render() {

    const {decks} = this.props

    return (
      <View style={{flex: 1}}>
        {decks.map(deck=> (
          <View key={deck.title}>
            <Text>{deck.title}</Text>
            <Text>{deck.questions.length}</Text>
          </View>
        ))}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {decks} = state
  return {
    decks: Object.keys(decks).map(key=>decks[key])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadDecks: decks=> dispatch(decksSet(decks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
