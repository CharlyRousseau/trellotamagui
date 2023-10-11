import { Tabs } from "expo-router";
import { Image, XStack } from "tamagui";
import { Trello, Bell } from '@tamagui/lucide-icons'
import { Avatar } from 'tamagui'


export default function Layout() {

  return (
    <Tabs>
      <Tabs.Screen
        name="tableaux"
        options={{
          title: "Tableaux",
          tabBarActiveTintColor: 'rgb(110,193, 142)',
          tabBarIcon(props) {
            return (
              <Trello
                {...props}
              />
            );
          },
          headerTitle: () => (
            <XStack alignItems="center" space="$2">
              <Trello />
              <Image
                source={{ width: 160, height: 100, uri: require('../../assets/tamaguiTexte.png') }}
                resizeMode='contain'
              />
            </XStack>

          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarActiveTintColor: 'rgb(110,193, 142)',
          tabBarIcon(props) {
            return (
              <Bell
                {...props}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="compte"
        options={{
          title: "Compte",
          tabBarActiveTintColor: 'rgb(110,193, 142)',
          tabBarIcon(props) {
            return (
              <Avatar circular size="$1.5"  {...props}>
                <Avatar.Image src="http://placekitten.com/200/300" />
              </Avatar>
            );
          },
        }}
      />
    </Tabs>
  );
}
