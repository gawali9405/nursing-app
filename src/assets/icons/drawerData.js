import { Ionicons } from "@expo/vector-icons"; 

// Drawer menu items in the new sequence
export const drawerItems = [
    {
        label: "Offline Downloads",
        icon: <Ionicons name="cloud-download-outline" />,
        screen: "OfflineDownloads",
        isNew: true
    },
    {
        label: "Free Material",
        icon: <Ionicons name="folder-outline" />,
        screen: "FreeMaterial"
    },
    {
        label: "Edit Profile",
        icon: <Ionicons name="person-circle-outline" />,
        screen: "EditProfile"
    },
    {
        label: "Settings",
        icon: <Ionicons name="settings-outline" />,
        screen: "Settings"
    },
    {
        label: "Privacy Policy",
        icon: <Ionicons name="shield-checkmark-outline" />,
        screen: "PrivacyPolicy"
    },
    {
        label: "How to use the App",
        icon: <Ionicons name="help-circle-outline" />,
        screen: "Tutorial",
    },
    {
        label: "Help and Support",
        icon: <Ionicons name="help-buoy-outline" />,
        screen: "HelpSupport",
        isNew: true
    },
];

// Logout item for the drawer
export const logoutItem = {
    label: "Logout",
    icon: <Ionicons name="log-out-outline" />,
    screen: "Logout"
}