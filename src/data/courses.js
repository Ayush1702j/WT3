export const COURSES = [
  {
    id: "fs-web",
    title: "Full-Stack Web Development (MERN)",
    category: "Web Development",
    instructor: "Dr. Arvind Kulkarni",
    duration: "12 Weeks (120 Hours)",
    level: "Intermediate",
    baseFee: 6500,
    rating: 4.9,
    seatsLeft: 8,
    prerequisite: "Basic knowledge of HTML, CSS, and fundamental JavaScript.",
    highlights: ["React 18 & Node.js", "MongoDB Atlas Integration", "Cloud Deployment on Vercel"]
  },
  {
    id: "ai-ml",
    title: "Applied AI & Deep Learning with PyTorch",
    category: "Artificial Intelligence",
    instructor: "Prof. Sneha Patil",
    duration: "10 Weeks (100 Hours)",
    level: "Advanced",
    baseFee: 7800,
    rating: 4.8,
    seatsLeft: 5,
    prerequisite: "Proficiency in Python programming, linear algebra, and calculus.",
    highlights: ["Neural Architectures", "Computer Vision & Transformers", "Model Serving via FastAPI"]
  },
  {
    id: "cloud-devops",
    title: "Cloud Architecture & DevOps with AWS & Docker",
    category: "Cloud Computing",
    instructor: "Er. Rajesh Verma",
    duration: "8 Weeks (80 Hours)",
    level: "Intermediate",
    baseFee: 5900,
    rating: 4.9,
    seatsLeft: 12,
    prerequisite: "Familiarity with Linux bash terminal and networking fundamentals.",
    highlights: ["AWS Core Services", "Docker Containerization", "CI/CD Pipeline with GitHub Actions"]
  },
  {
    id: "cyber-sec",
    title: "Ethical Hacking & Network Defense",
    category: "Cybersecurity",
    instructor: "Er. Vikram Deshmukh",
    duration: "8 Weeks (80 Hours)",
    level: "Beginner to Intermediate",
    baseFee: 5400,
    rating: 4.7,
    seatsLeft: 10,
    prerequisite: "Understanding of TCP/IP protocol suite and operating system principles.",
    highlights: ["Vulnerability Assessment", "Burp Suite & Wireshark", "Web Application Security (OWASP Top 10)"]
  }
];

export const VALID_COUPONS = {
  "STUDENT50": { discountPercent: 50, label: "50% Student Scholarship Discount" },
  "EARLYBIRD20": { discountPercent: 20, label: "20% Early Bird Registration Discount" },
  "MITAOE10": { discountPercent: 10, label: "10% Campus Partner Discount" }
};
