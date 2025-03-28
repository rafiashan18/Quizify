import { Activity, Brain, CheckCircle, Database, FileStack, Layers, Lightbulb, PenSquare, PlayCircle, Share2, ShieldCheck, Trophy, Users } from "lucide-react";

  export const adminDashboardStats = [
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
  
  export const MostPlayedQuizesData = {
    labels: ['Quiz A', 'Quiz B', 'Quiz C', 'Quiz D', 'Quiz E', 'Quiz F', 'Quiz G'],
    datasets: [
      {
        label: 'Times Played',
        data: [1250, 980, 860, 720, 650, 520, 480],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)', // Purple
          'rgba(59, 130, 246, 0.8)', // Blue
          'rgba(245, 158, 11, 0.8)', // Yellow
          'rgba(236, 72, 153, 0.7)', // Pink
          'rgba(147, 51, 234, 0.8)', // Purple
          'rgba(59, 130, 246, 0.8)', // Blue
          'rgba(245, 158, 11, 0.8)', // Yellow
        ],
        borderColor: [
          'rgb(126, 34, 206)', // Darker Purple
          'rgb(37, 99, 235)', // Darker Blue
          'rgb(202, 138, 4)', // Darker Yellow
          'rgb(219, 39, 119)', // Darker Pink
          'rgb(126, 34, 206)', // Darker Purple
          'rgb(37, 99, 235)', // Darker Blue
          'rgb(202, 138, 4)', // Darker Yellow
        ],
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: [
          'rgba(147, 51, 234, 1)', // Purple
          'rgba(59, 130, 246, 1)', // Blue
          'rgba(245, 158, 11, 1)', // Yellow
          'rgba(236, 72, 153, 1)', // Pink
          'rgba(147, 51, 234, 1)', // Purple
          'rgba(59, 130, 246, 1)', // Blue
          'rgba(245, 158, 11, 1)', // Yellow
        ],
      }
    ]
  };
  
  export const purchaseData = {
    labels: ['Science', 'History', 'Math', 'Language', 'Tech'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#8b5cf6', // Purple
          '#3b82f6', // Blue
          '#eab308', // Yellow
          '#c8a3ff', // Light Purple
          '#ff69b4', // Light Pink
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      }
    ]
  };



   export const monthlySignupData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'New Users',
          data: [45, 62, 78, 95, 110, 132, 145, 155, 168, 172, 180, 210],
          backgroundColor: 'rgba(139, 92, 246, 0.6)', // Very light purple with transparency
          borderColor: '#8b5cf6',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Active Users',
          data: [40, 55, 65, 85, 95, 110, 125, 140, 150, 155, 160, 185],
          backgroundColor: 'rgba(59, 130, 246, 0.5)', // Very light blue with transparency
          borderColor: '#3b82f6',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
      ]
    };


    export const coreValues = [
      {
        icon: <Brain className="w-8 h-8 text-purple-400" />,
        title: "Knowledge Growth",
        description: "Create and participate in quizzes that expand your knowledge across various domains"
      },
      {
        icon: <CheckCircle className="w-8 h-8 text-green-400" />,
        title: "Accuracy Tracking",
        description: "Monitor your quiz performance with detailed accuracy insights and progress tracking"
      },
      {
        icon: <Layers className="w-8 h-8 text-orange-400" />,
        title: "Categories",
        description: "Explore quizzes across multiple categories to match your learning interests"
      },
      {
        icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
        title: "Verified Content",
        description: "Ensure high-quality learning with quizzes curated and reviewed by experts"
      },
    ];
    


import about1 from "../assets/images/about-1.png";
import about2 from "../assets/images/about-2.jpg";
import about3 from "../assets/images/about-3.jpg";
import about4 from "../assets/images/about-4.jpg";


export const ImageGalleryData = [
  {
    src: about1,
    alt: "Gallery image 1",
    className: "h-40 w-64 sm:h-64 sm:w-96",
    delay: "100",
    visible: true 
  },
  {
    src: about2,
    alt: "Gallery image 2",
    className: "h-40 w-64 sm:h-48 sm:w-72 mt-4 sm:mt-0",
    delay: "200",
    visible: true
  },
  {
    src: about3,
    alt: "Gallery image 3",
    className: "h-48 w-80 sm:h-64 sm:w-96",
    delay: "300",
    visible: false 
  },
  {
    src: about4,
    alt: "Gallery image 4",
    className: "h-40 w-64 sm:h-48 sm:w-72",
    delay: "400",
    visible: false 
  }
];


export const FeaturesData = [
  {
    title: "Diverse Quiz Categories",
    icon: <PenSquare size={32} />,
    description: "Explore a wide range of quiz topics, from general knowledge and entertainment to niche subjects. Users can choose quizzes that match their interests and expand their knowledge while enjoying an engaging experience. The platform ensures that everyone can find something that piques their curiosity.",
    isDark: true
  },
  {
    title: "Instant Feedback & Scoring",
    icon: <PlayCircle size={32} />,
    description: "Get immediate feedback on your answers with real-time scoring. Users can instantly see whether they answered correctly and receive explanations for the correct answers, enhancing the learning experience. This feature ensures continuous improvement and better knowledge retention.",
    isDark: false
  },
  {
    title: "Difficulty Levels",
    icon: <Trophy size={32} />,
    description: "Choose between easy, medium, and hard levels to match your expertise. Users can start with simpler quizzes and gradually move to more challenging ones as they improve their knowledge. This structured approach keeps users engaged and encourages them to push their limits.",
    isDark: false
  },
  {
    title: "Premium Quizzes",
    icon: <Users size={32} />,
    description: "Access exclusive premium quizzes designed for in-depth knowledge testing. These quizzes offer advanced-level questions and unique challenges that require critical thinking and subject mastery. Users can purchase these quizzes to gain access to high-quality, curated content.",
    isDark: true
  }
];




import cat1 from '../assets/icons/art-and-literature.svg'
import cat2 from '../assets/icons/geography.svg'
import cat3 from '../assets/icons/history.svg'
import cat4 from '../assets/icons/languages.svg'
import cat5 from '../assets/icons/science-and-nature.svg'
import cat6 from '../assets/icons/sports.svg'
import cat7 from '../assets/icons/trivia.svg'
import allCat from '../assets/icons/all.png'

export const categoryData = [
  {
    category: "all",
    image: allCat,
    displayName: "All Categories"
  },
  {
    category: "Art",
    image: cat1,
    displayName: "Art & Literature"
  },
  {
    category: "Geography",
    image: cat2,
    displayName: "Geography"
  },
  {
    category: "History",
    image: cat3,
    displayName: "History"
  },
  {
    category: "Languages",
    image: cat4,
    displayName: "Languages"
  },
  {
    category: "Science",
    image: cat5,
    displayName: "Science & Nature"
  },
  {
    category: "Sports",
    image: cat6,
    displayName: "Sports"
  },
  {
    category: "Trivia",
    image: cat7,
    displayName: "Trivia"
  }
];


