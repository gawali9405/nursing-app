import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import ScreenWrapper from "../../components/layout/ScreenWrapper";

export default function Mentorship() {
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMentors(["Dr. Sharma", "Prof. Mehta", "Ms. Gupta"]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <ScreenWrapper title="Mentorship" loading={loading}>
      {mentors.map((mentor, index) => (
        <Text key={index} className="text-gray-800 text-lg mb-2">
          {mentor}
        </Text>
      ))}
    </ScreenWrapper>
  );
}