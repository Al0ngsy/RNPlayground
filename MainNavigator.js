import HomePage from "./components/HomePage"
import LocationGetter from "./components/LocationGetter"
import SavingDatas from "./components/SavingDatas"
import { createAppContainer, createStackNavigator } from "react-navigation"

const MainNavigator = createStackNavigator(
    {
        Home: HomePage,
        Location: LocationGetter,
        SaveDatas: SavingDatas
    },
    {
        initialRouteName: "Home"
    }
)
export default createAppContainer(MainNavigator)