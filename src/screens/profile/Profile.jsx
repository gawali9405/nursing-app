import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import ScreenWrapper from "../../components/layout/ScreenWrapper";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    setTimeout(() => {
      setUser({ name: "Sandip Gawali", email: "sandip@example.com" });
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <ScreenWrapper title="Profile" loading={loading}>
      <Text className="text-gray-800 text-lg mb-2">Name: {user.name}</Text>
      <Text className="text-gray-800 text-lg">Email: {user.email}</Text>
    </ScreenWrapper>
  );
}