import { Activity, Database, FileStack, Users } from "lucide-react";
import StatCard from "../commonComponents/statCard";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Quizzes",
      value: "2,846",
      icon: <FileStack className="w-6 h-6" />,
      description: "Total number of quizzes"
    },
    {
      title: "Total Questions",
      value: "2045",
      icon: <Database className="w-6 h-6" />,
      description: "Total Questions in Database"
    },
    {
      title: "Active Quizes",
      value: "1,245",
      icon: <Activity className="w-6 h-6" />,
      description: "Total Active Quizes"
    },
    {
      title: "Total Users",
      value: "12,845",
      icon: <Users className="w-6 h-6" />,
      description: "Total Users"
    },
  ];

  return (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} index={index} />
      ))}
    </div>
  );
};

export default DashboardStats;