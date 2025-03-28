import React, { useState, useEffect } from "react";
import { Activity, Database, FileStack, Users } from "lucide-react";
import StatCard from "../Common/statCard";
import axios from "axios"; // Make sure to install axios if not already done
import { getAdminDashboardStats } from "../../services/StatsApi";

const DashboardStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getAdminDashboardStats()
        console.log(response)
        // Format the data to match your StatCard component's expected props
        const formattedStats = [
          {
            title: "Total Quizzes",
            value: response.data.totalQuizzes,
            icon: <FileStack className="w-6 h-6" />,
            description: "Total number of quizzes"
          },
          {
            title: "Total Questions",
            value: response.data.totalQuestions,
            icon: <Database className="w-6 h-6" />,
            description: "Total Questions in Database"
          },
          {
            title: "Active Quizes",
            value: response.data.activeQuizzes,
            icon: <Activity className="w-6 h-6" />,
            description: "Total Active Quizes"
          },
          {
            title: "Total Users",
            value: response.data.totalUsers,
            icon: <Users className="w-6 h-6" />,
            description: "Total Users"
          }
        ];
        
        setStats(formattedStats);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Display loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="mt-5 p-4 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} index={index} />
      ))}
    </div>
  );
};

export default DashboardStats;