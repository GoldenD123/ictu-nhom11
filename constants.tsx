import { Job } from "./types";

export const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer (React)",
    company: "TechVision Global",
    location: "TP. Hồ Chí Minh",
    salary: "2,500$ - 4,000$",
    description:
      "Chúng tôi tìm kiếm chuyên gia React để xây dựng hệ thống dashboard phức tạp.",
    requirements: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    tags: ["Remote", "Frontend", "Senior"],
    logo: "https://picsum.photos/seed/tech/200",
  },
  {
    id: "2",
    title: "Fullstack Developer (Node.js/React)",
    company: "Fintech Solutions",
    location: "Hà Nội",
    salary: "1,500$ - 2,500$",
    description:
      "Phát triển các ứng dụng ví điện tử và cổng thanh toán bảo mật cao.",
    requirements: ["Node.js", "React", "PostgreSQL", "AWS"],
    tags: ["Fullstack", "Fintech", "Office"],
    logo: "https://picsum.photos/seed/fin/200",
  },
  {
    id: "3",
    title: "Junior UI/UX Designer",
    company: "Creative Labs",
    location: "Đà Nẵng",
    salary: "800$ - 1,200$",
    description:
      "Thiết kế giao diện người dùng cho các dự án thương mại điện tử quốc tế.",
    requirements: ["Figma", "Adobe XD", "Prototyping"],
    tags: ["Design", "Junior", "Hybrid"],
    logo: "https://picsum.photos/seed/design/200",
  },
  {
    id: "4",
    title: "Data Scientist (Machine Learning)",
    company: "AI Research Hub",
    location: "Hà Nội",
    salary: "3,000$ - 5,000$",
    description:
      "Xây dựng các mô hình dự đoán hành vi người dùng bằng Python và PyTorch.",
    requirements: ["Python", "PyTorch", "SQL", "Big Data"],
    tags: ["AI", "Data", "High Salary"],
    logo: "https://picsum.photos/seed/ai/200",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Cloud Scale Inc",
    location: "Remote",
    salary: "2,000$ - 3,500$",
    description: "Quản lý hạ tầng Kubernetes và CI/CD pipeline.",
    requirements: ["Docker", "Kubernetes", "Terraform", "Jenkins"],
    tags: ["DevOps", "Remote", "Cloud"],
    logo: "https://picsum.photos/seed/cloud/200",
  },
];
