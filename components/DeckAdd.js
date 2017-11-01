import React, {Component}              from 'react'
import {View, Text}                    from 'react-native'
import {StyleSheet, Button}            from 'react-native'
import {TextInput}                     from 'react-native'
import {connect}                       from 'react-redux'
import {NavigationActions}             from 'react-navigation'
import {saveDeckTitle}                 from '../utils/api'
import {deckAdd}                       from '../actions'

class DeckAdd extends Component {

  state = {
    text: ''
  }

  submit = ()=> {

    this.props.createDeck(this.state.text)

    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'DeckList'
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          style={styles.button}
          color='black'
          onPress={this.submit}
          title='Submit'
          accessibilityLabel='Create a new deck'
          disabled={this.state.text.trim() === '' || this.props.titles.indexOf(this.state.text.trim()) != -1}
        />
      </View>
    )
  }

}

function mapStateToProps({decks}) {
  return {
    titles: Object.keys(decks)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createDeck: title=> saveDeckTitle(title).then(()=> dispatch(deckAdd(title)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckAdd)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    textAlign: 'center'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    margin: 40,
    width: 250,
    height: 40,
    padding: 8,
  },
  button: {
    padding: 6
  }
})
