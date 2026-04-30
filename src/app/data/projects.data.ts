export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  links?: { label: string; href: string }[];
  role?: string;
  organization?: string;
  timeframe?: string;
  teamSize?: number;
  highlight?: boolean;
  status?: 'live' | 'wip' | 'archived';
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  outcomes?: string[];
  report?: {
    title: string;
    description: string;
    downloadHref?: string;
    pages: { src: string; alt: string }[];
  };
}

const plantBotReportPages = Array.from({ length: 11 }, (_, index) => {
  const pageNumber = index + 1;

  return {
    src: `/reports/plantbot-phase3/page-${pageNumber}.jpg`,
    alt: `PlantBot Phase III report page ${pageNumber}`
  };
});

export const projects: Project[] = [
  {
    slug: 'nm-android-watch-app',
    title: 'Android Watch Financial Companion App',
    description:
      'A native Android Watch application developed at Northwestern Mutual that allows authenticated users to view high-level financial summaries such as net worth, cash flow, and investments directly from their smartwatch.',
    tech: [
      'Kotlin',
      'Jetpack Compose',
      'Material Design',
      'Android',
      'REST APIs'
    ],
    image: '/nmlogo.jpg',
    highlight: true,
    status: 'archived',
    role: 'Mobile App Engineer I',
    organization: 'Northwestern Mutual',
    timeframe: 'May 2023 – Present',
    teamSize: 2,
    longDescription:
      'This project focused on extending an existing mobile financial platform to wearable devices. Working on a small, fast-moving team, I helped design and implement an Android Watch experience that securely surfaces essential financial information in a glanceable, intuitive format. Emphasis was placed on authentication flow validation, device pairing detection, and usability on constrained screen sizes.',
    features: [
      'Smartwatch UI built with Jetpack Compose and Material Design',
      'Secure authentication flow integrated with paired mobile device',
      'Detection of connected phone and app installation state',
      'Navigation for net worth, cash flow, and investment summaries'
    ],
    challenges: [
      'Designing usable financial interfaces on small screens',
      'Managing state between watch and paired mobile device',
      'Ensuring reliability when connectivity is intermittent'
    ],
    outcomes: [
      'Successfully shipped wearable extension alongside core mobile app',
      'Improved accessibility of financial insights for on-the-go users',
      'Strengthened experience in mobile architecture and UI systems'
    ]
  },

  {
    slug: 'manufacturing-data-analysis-tool',
    title: 'Manufacturing Data Analysis Application',
    description:
      'An internal data analysis tool built during an internship to clean, normalize, and analyze manufacturing production data, enabling engineers to identify trends and inefficiencies.',
    tech: [
      'Python',
      'Pandas',
      'NumPy',
      'Tkinter',
      'SQLite'
    ],
    image: 'mtimotion.png',
    status: 'archived',
    role: 'Information Systems Intern',
    organization: 'PST (Precision Screw Thread)',
    timeframe: 'May 2022 – Aug 2022',
    teamSize: 2,
    longDescription:
      'This application ingested raw production data directly from manufacturing systems and transformed it into a structured, readable format. The tool was designed in close collaboration with manufacturing engineers to ensure the resulting metrics aligned with operational needs and could support future expansion.',
    features: [
      'Automated data cleaning and normalization pipelines',
      'GUI-based reporting interface for non-technical users',
      'Local SQLite database for report persistence',
      'API layer designed for future extensibility'
    ],
    challenges: [
      'Normalizing inconsistent machine-generated data',
      'Designing tools usable by engineers with varied technical backgrounds',
      'Balancing performance with clarity in data presentation'
    ],
    outcomes: [
      'Enabled faster analysis of production trends',
      'Reduced manual data processing effort',
      'Provided foundation for future manufacturing analytics tools'
    ]
  },
  {
    slug: 'esp32-plant-monitoring',
    title: 'ESP32 IoT Plant Monitoring & Watering System',
    description:
      'An IoT system combining embedded programming and web dashboards to monitor plant health and automate watering with remote control.',
    tech: [
      'C++',
      'ESP32',
      'TypeScript',
      'Express.js',
      'Socket.io'
    ],
    image: '/projects/esp32-plant.jpg',
    status: 'wip',
    role: 'Embedded / Full-Stack Developer',
    timeframe: '2024 – Present',
    longDescription:
      'This project explores end-to-end IoT system design, from low-level sensor integration to real-time web visualization. The ESP32 collects environmental data and streams updates to a web dashboard that supports both monitoring and control.',
    features: [
      'Real-time sensor data streaming',
      'Automated and manual watering controls',
      'WebSocket-based live dashboard',
      'Time-lapse plant growth capture'
    ],
    challenges: [
      'Power optimization for embedded devices',
      'Wireless reliability in home environments',
      'Sensor calibration over time'
    ],
    outcomes: [
      'Stable long-running IoT deployment',
      'Hands-on experience with embedded systems',
      'Reusable architecture for future IoT projects'
    ],
    report: {
      title: 'PlantBot Phase III Project Report',
      description:
        'Combined research and implementation report for the mobile-friendly remote plant monitoring and watering prototype.',
      downloadHref: '/reports/plantbot-phase3/plantbot-phase3-report.docx',
      pages: plantBotReportPages
    }
  },
];
