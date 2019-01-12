// NavigationActions is super critical
import { NavigationActions, createStackNavigator } from 'react-navigation'
// these are literally whatever you want, standard components
// but, they are sitting in the root of the stack
import Splash from '../components/Auth/Splash'
import SignUp from '../components/Auth/SignupForm'
import SignIn from '../components/Auth/LoginForm'
import ForgotPassword from '../components/Auth/ForgotPassword'
// this is an example of a nested view, you might see after logging in
import BasicJobScreen from '../components/BasicJobScreen' // index.js file

const WeLoggedIn = createStackNavigator({
    LandingPad: {             // if you don't specify an initial route,
        screen: BasicJobScreen     // the first-declared one loads first
    }
}, {
    headerMode: 'none',
    initialRouteName: 'LandingPad' // if you had 5 components in this stack,
})                               // this one would load when you do
                                 // this.props.navigation.navigate('WeLoggedIn')

// notice we are exporting this one. this turns into <RootNavigationStack />
// in your src/App.js file.
export const NavigationStack = createStackNavigator({
    Splash: {
        screen: Splash
    },
    Signup: {
        screen: SignUp
    },
    Login: {
        screen: SignIn
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
    WeLoggedIn: {
        screen: WeLoggedIn  // Notice how the screen is a StackNavigator
    }                       // now you understand how it works!
}, {
    headerMode: 'none'
})

// this is super critical for everything playing nice with Redux
// did you read the React-Navigation docs and recall when it said
// most people don't hook it up correctly? well, yours is now correct.
// this is translating your state properly into Redux on initialization
const INITIAL_STATE = NavigationStack.router.getStateForAction(NavigationActions.init())

// this is pretty much a standard reducer, but it looks fancy
// all it cares about is "did the navigation stack change?"
// if yes => update the stack
// if no => pass current stack through
export default (state = INITIAL_STATE, action) => {
    const nextState = NavigationStack.router.getStateForAction(action, state)

    return nextState || state
}
