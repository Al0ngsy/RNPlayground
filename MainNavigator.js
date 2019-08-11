import HomePage from "./components/HomePage"
import LocationGetter from "./components/LocationGetter"
import { createAppContainer, createStackNavigator } from "react-navigation"

const MainNavigator = createStackNavigator(
    {
        Home: HomePage,
        Location: LocationGetter
    },
    {
        initialRouteName: "Home"
    }
)
export default createAppContainer(MainNavigator)