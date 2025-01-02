import { Brain, Users, Share2, Trophy, Shield, CreditCard } from "lucide-react";
import coreVlaues from "../../../assets/images/coreValues.png"

const CoreValues = () => {
    const values = [
      {
        icon: <Brain className="w-8 h-8 text-purple-400" />,
        title: "Knowledge Growth",
        description: "Create and participate in quizzes that expand your knowledge across various domains"
      },
      {
        icon: <Users className="w-8 h-8 text-yellow-400" />,
        title: "Community Learning",
        description: "Connect with other quiz enthusiasts and share your knowledge through interactive quizzes"
      },
      {
        icon: <Share2 className="w-8 h-8 text-blue-400" />,
        title: "Easy Sharing",
        description: "Share your created quizzes instantly with friends or the wider community"
      },
      {
        icon: <Trophy className="w-8 h-8 text-purple-400" />,
        title: "Competitive Spirit",
        description: "Track progress on the scoreboard and compete with others globally"
      },
    
    ];
  
    return (
        <div className="bg-purple-800">
      <div className="container mx-auto px-4 py-16 bg-purple-800">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="lg:w-1/2 hidden sm:block">
            <img 
              src={coreVlaues}
              alt="Core Values Illustration"
              className="rounded-lg shadow-2xl w-full h-auto border border-gray-800"
            />
          </div>
  
          {/* Right Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-8 text-white tracking-wide">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg border border-gray-800 bg-purple-950 hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-purple-900/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-lg bg-gray-900/50">{value.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-200">{value.title}</h3>
                      <p className="text-sm text-gray-400">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default CoreValues;