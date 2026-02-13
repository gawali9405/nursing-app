import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import ScreenWrapper from "../../components/layout/ScreenWrapper";

export default function ExamList() {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setExams(["AIIMS", "RRB", "NORCET", "ESIC"]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <ScreenWrapper title="Exam List" loading={loading}>
      {exams.map((exam, index) => (
        <Text key={index} className="text-gray-800 text-lg mb-2">
          {exam}
        </Text>
      ))}
    </ScreenWrapper>
  );
}