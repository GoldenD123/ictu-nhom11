
import { Job } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer (React)',
    company: 'TechFlow Solutions',
    logo: 'https://picsum.photos/seed/techflow/100/100',
    location: 'Hà Nội, VN',
    salary: '$2000 - $3500',
    type: 'Full-time',
    description: 'Chúng tôi đang tìm kiếm một kỹ sư Frontend dày dạn kinh nghiệm với React và TypeScript để xây dựng các sản phẩm AI tiên tiến.',
    requirements: ['5+ years React', 'TypeScript expertise', 'Tailwind CSS', 'Next.js'],
    postedAt: '2 giờ trước',
    category: 'IT - Phần mềm'
  },
  {
    id: '2',
    title: 'Product Designer (UI/UX)',
    company: 'CreativePulse',
    logo: 'https://picsum.photos/seed/creative/100/100',
    location: 'TP. Hồ Chí Minh, VN',
    salary: 'Thỏa thuận',
    type: 'Remote',
    description: 'Tham gia đội ngũ thiết kế của chúng tôi để tạo ra những trải nghiệm người dùng tuyệt vời nhất cho thị trường toàn cầu.',
    requirements: ['Figma mastery', 'Portfolio required', 'User Research', 'Prototyping'],
    postedAt: '5 giờ trước',
    category: 'Thiết kế'
  },
  {
    id: '3',
    title: 'Backend Developer (Node.js/Go)',
    company: 'FastScale Inc',
    logo: 'https://picsum.photos/seed/fastscale/100/100',
    location: 'Đà Nẵng, VN',
    salary: '$1500 - $2800',
    type: 'Full-time',
    description: 'Xây dựng hệ thống microservices hiệu năng cao phục vụ hàng triệu người dùng.',
    requirements: ['Node.js', 'PostgreSQL', 'Docker', 'Go is a plus'],
    postedAt: '1 ngày trước',
    category: 'IT - Phần mềm'
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    company: 'GreenGrowth',
    logo: 'https://picsum.photos/seed/green/100/100',
    location: 'Hà Nội, VN',
    salary: '$800 - $1200',
    type: 'Part-time',
    description: 'Phát triển các chiến dịch marketing số và quản lý cộng đồng cho thương hiệu bền vững.',
    requirements: ['Digital Marketing', 'SEO', 'Content Writing', 'Analytics'],
    postedAt: '3 ngày trước',
    category: 'Marketing'
  }
];

export const CATEGORIES = [
  'Tất cả',
  'IT - Phần mềm',
  'Thiết kế',
  'Marketing',
  'Kinh doanh',
  'Tài chính',
  'Nhân sự'
];
