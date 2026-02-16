import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  StyleSheet,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/layout/ScreenWrapper";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: 'white',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5250C4',
    padding: 8,
    borderRadius: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  userEmail: {
    color: '#6B7280',
    marginBottom: 8,
  },
  membershipBadge: {
    backgroundColor: '#5250C4',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  membershipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  viewAllText: {
    color: '#5250C4',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5250C4',
    marginBottom: 4,
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 12,
  },
  divider: {
    height: 48,
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    color: '#1F2937',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FEE2E2',
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default function Profile({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    membership: "Premium",
    testsTaken: 12,
    correctAnswers: 85,
    rank: "Gold"
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser({
        name: "Sandip Gawali",
        email: "sandip@example.com",
        membership: "Premium",
        testsTaken: 12,
        correctAnswers: 85,
        rank: "Gold"
      });
      setLoading(false);
    }, 1000);
  }, []);

  const menuItems = [
    { icon: "person-outline", label: "Edit Profile", screen: "EditProfile" },
    { icon: "book-outline", label: "My Tests", screen: "MyTests" },
    { icon: "trophy-outline", label: "Achievements", screen: "Achievements" },
    { icon: "settings-outline", label: "Settings", screen: "Settings" },
    { icon: "help-circle-outline", label: "Help & Support", screen: "Help" },
    { icon: "information-circle-outline", label: "About Us", screen: "About" },
  ];

  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
  };

  return (
    <ScreenWrapper title="Profile" loading={loading}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../../assets/icon.png")}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.membershipBadge}>
            <Text style={styles.membershipText}>{user.membership} Member</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Your Progress</Text>
            <Text style={styles.viewAllText}>View All</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.testsTaken}</Text>
              <Text style={styles.statLabel}>Tests Taken</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.correctAnswers}%</Text>
              <Text style={styles.statLabel}>Correct Answers</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.rank}</Text>
              <Text style={styles.statLabel}>Rank</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && { borderBottomWidth: 0 }
              ]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuItemIcon}>
                <Ionicons name={item.icon} size={18} color="#5250C4" />
              </View>
              <Text style={styles.menuItemText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}