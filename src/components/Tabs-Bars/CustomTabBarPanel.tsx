import { Octicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const PRIMARY_COLOR = "#fefefe";
const SECONDARY_COLOR = "#FF941A";
const UNREMARKABLE_COLOR = "#bfbfbf";

export const CustomTabBarPanel: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={[styles.tabItem, { backgroundColor: isFocused ? SECONDARY_COLOR : "transparent" }]}
          >
            {getIconByRouteName(route.name, isFocused ? PRIMARY_COLOR : SECONDARY_COLOR)}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                className={`font-bold`}
                style={styles.text}
              >
                {label as string}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );

  function getIconByRouteName(routeName: string, color: string) {
    switch (routeName) {
      case "index":
        return <Octicons name="apps" size={24} color={color} />;
      case "history":
        return <Octicons name="hourglass" size={24} color={color} />;
      case "reports":
        return <Octicons name="graph" size={24} color={color} />;
      case "settings":
        return <Octicons name="person" size={24} color={color} />;
      default:
        return <Octicons name="home" size={24} color={color} />;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    backgroundColor: PRIMARY_COLOR,
    borderTopColor: UNREMARKABLE_COLOR,
  },
  tabItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  text: {
    color: PRIMARY_COLOR,
    marginLeft: 8,
    minWidth: 40,
  },
});
