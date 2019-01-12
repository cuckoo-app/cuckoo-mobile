import React, { Component } from 'react'
// this will be used to make your Android hardware Back Button work
import { Platform, BackHandler } from 'react-native'
import { Provider, connect } from 'react-redux'
// import { addNavigationHelpers } from 'react-navigation'
// this is your root-most navigation stack that can nest
// as many stacks as you want inside it
import { NavigationStack } from './navigation/nav_reducer'
// this is a plain ol' store
// same as const store = createStore(combinedReducers)
import store from './store'

// this creates a component, and uses magic to bring the navigation stack
// into all your components, and connects it to Redux
// don't mess with this or you won't get
// this.props.navigation.navigate('somewhere') everywhere you want it
// pro tip: that's what addNavigationHelpers() does
// the second half of the critical logic is coming up next in the nav_reducers.js file
class App extends Component {
    // when the app is mounted, fire up an event listener for Back Events
    // if the event listener returns false, Back will not occur (note that)
    // after some testing, this seems to be the best way to make
    // back always work and also never close the app
    componentWillMount() {
        if (Platform.OS !== 'android') return
        BackHandler.addEventListener('hardwareBackPress', () => {
            const { dispatch } = this.props
            dispatch({ type: 'Navigation/BACK' })
            return true
        })
    }

    // when the app is closed, remove the event listener
    componentWillUnmount() {
        if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress')
    }

    render() {
        // slap the navigation helpers on (critical step)
        const { dispatch, nav } = this.props
        const navigation = {
            dispatch,
            state: nav
        }
        return <NavigationStack navigation={navigation} />
    }
}

// nothing crazy here, just mapping Redux state to props for <App />
// then we create your root-level component ready to get all decorated up
const mapStateToProps = ({ nav }) => ({ nav })
const RootNavigationStack = connect(mapStateToProps)(App)

const Root = () => (
    <Provider store={store}>
        <RootNavigationStack />
    </Provider>
)

export default Root
