import quiz1 from '../assets/images/QuizImages/quiz1.webp'
import quiz2 from '../assets/images/QuizImages/quiz2.webp'
import quiz3 from '../assets/images/QuizImages/quiz3.webp'
import quiz4 from '../assets/images/QuizImages/quiz4.webp'
import quiz5 from '../assets/images/QuizImages/quiz5.webp'
import quiz6 from '../assets/images/QuizImages/quiz6.webp'
import quiz7 from '../assets/images/QuizImages/quiz7.webp'
import quiz8 from '../assets/images/QuizImages/quiz8.webp'
import quiz9 from '../assets/images/QuizImages/quiz9.jpg'

import cat1 from '../assets/images/categoryIcons/art-and-literature.svg'
import cat2 from '../assets/images/categoryIcons/geography.svg'
import cat3 from '../assets/images/categoryIcons/history.svg'
import cat4 from '../assets/images/categoryIcons/languages.svg'
import cat5 from '../assets/images/categoryIcons/science-and-nature.svg'
import cat6 from '../assets/images/categoryIcons/sports.svg'
import cat7 from '../assets/images/categoryIcons/trivia.svg'
const quizData = {
    allQuizzes: [
        {
            quizId: 1,
            title: "Did You Know About This?",
            category: "Math",
            difficulty: "hard",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            imageUrl: quiz1,
            duration: 10,
            questionCount: 2,
            attempts: 5,
            popularity: 95,
            questions: [
                {
                    questionText: "What is the value of x in the equation: 2x² + 5x - 12 = 0?",
                    options: [
                        "x = -4 or x = 1.5",
                        "x = -3 or x = 2",
                        "x = -2 or x = 3",
                        "x = -1.5 or x = 4"
                    ],
                    correctAnswer: "x = -4 or x = 1.5",
                    questionImage: quiz2
                },
                {
                    questionText: "In a geometric sequence, if a₁ = 2 and r = 3, what is a₄?",
                    options: [
                        "54",
                        "18",
                        "27",
                        "81"
                    ],
                    correctAnswer: "54"
                }
            ]
        },
        {
            quizId: 2,
            title: "Science Trivia",
            category: "Science",
            difficulty: "Medium",
            description: "Pellentesque habitant morbi tristique senectus et netus.",
            imageUrl: quiz8,
            duration: 15,
            questionCount: 3,
            attempts: 3,
            popularity: 80,
            questions: [
                {
                    questionText: "Which element has the highest melting point?",
                    options: [
                        "Tungsten",
                        "Carbon",
                        "Platinum",
                        "Titanium"
                    ],
                    correctAnswer: "Tungsten"
                },
                {
                    questionText: "What is the fastest land animal?",
                    options: [
                        "Cheetah",
                        "Lion",
                        "Gazelle",
                        "Antelope"
                    ],
                    correctAnswer: "Cheetah",
                    questionImage: quiz9
                },
                {
                    questionText: "What is the hardest natural substance on Earth?",
                    options: [
                        "Diamond",
                        "Titanium",
                        "Platinum",
                        "Quartz"
                    ],
                    correctAnswer: "Diamond"
                }
            ]
        },
        {
            quizId: 3,
            title: "History Quiz",
            category: "History",
            difficulty: "Easy",
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
            imageUrl: quiz2,
            duration: 8,
            questionCount: 2,
            attempts: 6,
            popularity: 70,
            questions: [
                {
                    questionText: "Who was the first President of the United States?",
                    options: [
                        "George Washington",
                        "Thomas Jefferson",
                        "John Adams",
                        "Benjamin Franklin"
                    ],
                    correctAnswer: "George Washington"
                },
                {
                    questionText: "In which year did World War II end?",
                    options: [
                        "1945",
                        "1944",
                        "1946",
                        "1943"
                    ],
                    correctAnswer: "1945",
                    questionImage: quiz4
                }
            ]
        },
        {
            quizId: 4,
            title: "Geography Challenge",
            category: "Geography",
            difficulty: "hard",
            description: "At vero eos et accusamus et iusto odio dignissimos ducimus.",
            imageUrl: quiz3,
            duration: 12,
            questionCount: 2,
            attempts: 4,
            popularity: 85,
            questions: [
                {
                    questionText: "Which country is located at the southernmost tip of South America?",
                    options: [
                        "Chile",
                        "Argentina",
                        "Brazil",
                        "Uruguay"
                    ],
                    correctAnswer: "Chile",
                    questionImage: quiz3
                },
                {
                    questionText: "Which desert is the largest hot desert in the world?",
                    options: [
                        "Sahara Desert",
                        "Arabian Desert",
                        "Gobi Desert",
                        "Kalahari Desert"
                    ],
                    correctAnswer: "Sahara Desert"
                }
            ]
        },
        {
            quizId: 5,
            title: "Trivia",
            category: "Technology",
            difficulty: "Medium",
            description: "Test your knowledge of technology with this engaging trivia quiz! From the pioneers of computer science to the latest innovations in tech, this quiz covers a range of topics that will challenge your understanding and spark your curiosity. Perfect for tech enthusiasts and casual learners alike!",
            imageUrl: quiz9,
            duration: 10,
            questionCount: 6, // Updated to reflect the new total number of questions
            attempts: 7,
            popularity: 90,
            questions: [
                {
                    questionText: "Who is considered the father of modern computer science?",
                    options: [
                        "Alan Turing",
                        "Bill Gates",
                        "Steve Jobs",
                        "Charles Babbage"
                    ],
                    correctAnswer: "Alan Turing"
                },
                {
                    questionText: "What does CPU stand for?",
                    options: [
                        "Central Processing Unit",
                        "Computer Processing Unit",
                        "Central Program Utility",
                        "Computer Program Unit"
                    ],
                    correctAnswer: "Central Processing Unit",
                    questionImage: quiz3
                },
                {
                    questionText: "Which company is known for creating the iPhone?",
                    options: [
                        "Samsung",
                        "Apple",
                        "Nokia",
                        "Sony"
                    ],
                    correctAnswer: "Apple"
                },
                {
                    questionText: "What is the main purpose of a web browser?",
                    options: [
                        "To create websites",
                        "To browse the internet",
                        "To store files",
                        "To run applications"
                    ],
                    correctAnswer: "To browse the internet"
                },
                {
                    questionText: "Which of the following is a programming language?",
                    options: [
                        "HTML",
                        "CSS",
                        "JavaScript",
                        "All of the above"
                    ],
                    correctAnswer: "All of the above"
                },
                {
                    questionText: "What does Wi-Fi stand for?",
                    options: [
                        "Wireless Fidelity",
                        "Wireless Field",
                        "Wide Fidelity",
                        "Wireless Frequency"
                    ],
                    correctAnswer: "Wireless Fidelity"
                }
            ]
        },
        {
            quizId: 6,
            title: "Art & Culture Quiz",
            category: "Art",
            difficulty: "Easy",
            description: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
            imageUrl: quiz5,
            duration: 8,
            questionCount: 2,
            attempts: 2,
            popularity: 65,
            questions: [
                {
                    questionText: "Who painted the Mona Lisa?",
                    options: [
                        "Leonardo da Vinci",
                        "Michelangelo",
                        "Raphael",
                        "Vincent van Gogh"
                    ],
                    correctAnswer: "Leonardo da Vinci"
                },
                {
                    questionText: "Which art movement did Andy Warhol represent?",
                    options: [
                        "Pop Art",
                        "Impressionism",
                        "Surrealism",
                        "Cubism"
                    ],
                    correctAnswer: "Pop Art",
                    questionImage: quiz2
                }
            ]
        },
        {
            quizId: 7,
            title: "Literature Challenge",
            category: "Literature",
            difficulty: "Medium",
            description: "Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero.",
            imageUrl: quiz6,
            duration: 11,
            questionCount: 2,
            attempts: 5,
            popularity: 75,
            questions: [
                {
                    questionText: "Who wrote '1984'?",
                    options: [
                        "George Orwell",
                        "Aldous Huxley",
                        "Ray Bradbury",
                        "H.G. Wells"
                    ],
                    correctAnswer: "George Orwell"
                },
                {
                    questionText: "Which novel begins with the line 'Call me Ishmael'?",
                    options: [
                        "Moby Dick",
                        "The Great Gatsby",
                        "Pride and Prejudice",
                        "The Catcher in the Rye"
                    ],
                    correctAnswer: "Moby Dick"
                }
            ]
        },
        {
            quizId: 8,
            title: "Sports Quiz",
            category: "Sports",
            difficulty: "hard",
            description: "Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
            imageUrl: quiz7,
            duration: 14,
            questionCount: 2,
            attempts: 3,
            popularity: 80,
            questions: [
                {
                    questionText: "Which country has won the most FIFA World Cup tournaments?",
                    options: [
                        "Brazil",
                        "Germany",
                        "Italy",
                        "Argentina"
                    ],
                    correctAnswer: "Brazil",
                    questionImage: quiz6
                },
                {
                    questionText: "In which year were the first modern Olympics held?",
                    options: [
                        "1896",
                        "1900",
                        "1892",
                        "1904"
                    ],
                    correctAnswer: "1896"
                }
            ]
        },
        {
            quizId: 9,
            title: "Advanced Algebra",
            category: "Math",
            difficulty: "hard",
            description: "Explore complex algebraic expressions and solve equations.",
            imageUrl: quiz6,
            duration: 12,
            questionCount: 2,
            attempts: 4,
            popularity: 90,
            questions: [
                {
                    questionText: "What is the solution to the system of equations: 2x + y = 7 and 3x - 2y = 4?",
                    options: [
                        "x = 2, y = 3",
                        "x = 3, y = 1",
                        "x = 1, y = 5",
                        "x = 4, y = -1"
                    ],
                    correctAnswer: "x = 2, y = 3"
                },
                {
                    questionText: "Simplify: (x² + 2x + 1) ÷ (x + 1)",
                    options: [
                        "x + 1",
                        "x - 1",
                        "x² + 1",
                        "x + 2"
                    ],
                    correctAnswer: "x + 1"
                }
            ]
        },
        {
            quizId: 10,
            title: "The Art of Renaissance",
            category: "Art",
            difficulty: "easy",
            description: "Discover the beauty of Renaissance art movements.",
            imageUrl: quiz3,
            duration: 10,
            questionCount: 2,
            attempts: 5,
            popularity: 85,
            questions: [
                {
                    questionText: "Who painted the Mona Lisa?",
                    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
                    correctAnswer: "Leonardo da Vinci",
                    questionImage: "quiz4"
                },
                {
                    questionText: "Which period came after the Renaissance?",
                    options: ["Baroque", "Impressionism", "Cubism", "Modernism"],
                    correctAnswer: "Baroque"
                }
            ]
        },
        {
            quizId: 11,
            title: "Impressionism and Beyond",
            category: "Art",
            difficulty: "medium",
            description: "Learn about Impressionism and its influence on modern art.",
            imageUrl: quiz5,
            duration: 10,
            questionCount: 2,
            attempts: 5,
            popularity: 80,
            questions: [
                {
                    questionText: "Who is considered the father of Impressionism?",
                    options: ["Claude Monet", "Edgar Degas", "Pierre-Auguste Renoir", "Paul Cézanne"],
                    correctAnswer: "Claude Monet",
                    questionImage: quiz6
                },
                {
                    questionText: "Which painting is known as the first Impressionist artwork?",
                    options: ["Impression, Sunrise", "Starry Night", "The Persistence of Memory", "Water Lilies"],
                    correctAnswer: "Impression, Sunrise"
                }
            ]
        },
        {
            quizId: 12,
            title: "Abstract Art Movements",
            category: "Art",
            difficulty: "hard",
            description: "Explore the origins and key figures of abstract art.",
            imageUrl: quiz7,
            duration: 10,
            questionCount: 2,
            attempts: 5,
            popularity: 75,
            questions: [
                {
                    questionText: "Who was a pioneer of abstract art?",
                    options: ["Wassily Kandinsky", "Jackson Pollock", "Pablo Picasso", "Salvador Dalí"],
                    correctAnswer: "Wassily Kandinsky",
                    questionImage: "quiz8"
                },
                {
                    questionText: "Which style uses geometric shapes and bright colors?",
                    options: ["Cubism", "Surrealism", "Realism", "Expressionism"],
                    correctAnswer: "Cubism"
                }
            ]
        },
        {
            quizId: 13,
            title: "Baroque and Rococo",
            category: "Art",
            difficulty: "easy",
            description: "Dive into the dramatic world of Baroque and Rococo styles.",
            imageUrl: quiz2,
            duration: 10,
            questionCount: 2,
            attempts: 5,
            popularity: 90,
            questions: [
                {
                    questionText: "Which artist is known for Baroque paintings?",
                    options: ["Caravaggio", "Michelangelo", "Raphael", "Goya"],
                    correctAnswer: "Caravaggio",
                    questionImage: "quiz1"
                },
                {
                    questionText: "What is a characteristic of Rococo art?",
                    options: ["Ornate and playful", "Dark and dramatic", "Minimalist", "Geometric"],
                    correctAnswer: "Ornate and playful"
                }
            ]
        },
        {
            quizId: 14,
            title: "Modern Art Movements",
            category: "Art",
            difficulty: "medium",
            description: "Understand the impact of modern art on contemporary works.",
            imageUrl: quiz6,
            duration: 10,
            questionCount: 2,
            attempts: 5,
            popularity: 88,
            questions: [
                {
                    questionText: "Which movement was pioneered by Picasso?",
                    options: ["Cubism", "Surrealism", "Futurism", "Dadaism"],
                    correctAnswer: "Cubism",
                    questionImage: "quiz9"
                },
                {
                    questionText: "Which artist is associated with Surrealism?",
                    options: ["Salvador Dalí", "Andy Warhol", "Henri Matisse", "Mark Rothko"],
                    correctAnswer: "Salvador Dalí"
                }
            ]
        },
        {
            quizId: 15,
            title: "Postmodern Art Explorations",
            category: "Art",
            difficulty: "hard",
            description: "Delve into the unconventional styles of postmodern art.",
            imageUrl: quiz4,
            duration: 10,
            questionCount: 2,
            attempts: 5,
            popularity: 70,
            questions: [
                {
                    questionText: "Which artist is known for pop art?",
                    options: ["Andy Warhol", "Jean-Michel Basquiat", "Yayoi Kusama", "Keith Haring"],
                    correctAnswer: "Andy Warhol",
                    questionImage: "quiz3"
                },
                {
                    questionText: "What is a key feature of postmodern art?",
                    options: ["Blending styles", "Strict realism", "Classical influences", "Only monochrome colors"],
                    correctAnswer: "Blending styles"
                }
            ]
        }
    ]
    ,
    allCategoryAndImages: [
        {
            category: 'Art',
            image: cat1
        },
        {
            category: 'Geography',
            image: cat2
        },
        {
            category: 'history ',
            image: cat3
        },
        {
            category: 'languages',
            image: cat4
        },
        {
            category: 'Science',
            image: cat5
        },
        {
            category: 'Sports',
            image: cat6
        },
        {
            category: 'Trivia',
            image: cat7
        }
    ]
    ,
    getPopularQuizzes() {
        return this.allQuizzes
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 8);
    },

    getQuizzesByCategory(category) {
        return this.allQuizzes.filter(quiz => quiz.category === category);
    },

    getAllCategories() {
        return Array.from(new Set(this.allQuizzes.map(quiz => quiz.category)));
    },
    getQuiz(quizId) {
        return this.allQuizzes.filter(quiz => quiz.quizId == quizId)
    },
    getAllCategoryAndImages() {
        return this.allCategoryAndImages;
    },
    getQuizByCategoryAndLevel(level, category) {
        return quizData.filter(quiz => quiz.difficulty.toLowerCase() === level.toLowerCase() &&
            quiz.category.toLowerCase() === category.toLowerCase());
    }

};

export default quizData;
