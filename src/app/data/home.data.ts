export interface AboutSection {
  sectionNumber: string;
  title: string;
  paragraphs: string[];
  technologies: string[];
  imagePlaceholder: string;
  imagePath?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  responsibilities: string[];
  isActive?: boolean;
}

export interface ExperienceSection {
  sectionNumber: string;
  title: string;
  experiences: ExperienceItem[];
}

export interface ContactSection {
  sectionLabel: string;
  title: string;
  description: string;
  email: string;
  buttonText: string;
}

export interface HomeData {
  about: AboutSection;
  experience: ExperienceSection;
  contact: ContactSection;
}

export const homeData: HomeData = {
  about: {
    sectionNumber: '01.',
    title: 'About Me',
    paragraphs: [
      'Hello! I’m Noah Nieberle — a Software Engineer with professional experience building mobile applications, data-driven systems, and analytics tools. I currently work as a Mobile App Engineer at Northwestern Mutual while pursuing a Master’s degree in Data Science.',
      'My interest in software started early through self-directed learning and experimentation, eventually leading me to study Software Engineering at the Milwaukee School of Engineering. Since then, I’ve worked across mobile development, data analysis, and embedded systems — always focused on building practical, reliable solutions.',
      'Outside of coursework and professional work, I’ve held leadership roles as a Residential Assistant, competed as an NCAA athlete, and volunteered in STEM outreach through robotics education. These experiences have shaped how I collaborate, communicate, and execute in real-world environments.'
    ],
    technologies: [
      'TypeScript',
      'Kotlin',
      'Python',
      'React / Angular',
      'Node.js',
      'PostgreSQL',
      'Pandas',
      'scikit-learn',
      'Android (Jetpack Compose)'
    ],
    imagePlaceholder: 'noah-nieberle-headshot',
    imagePath: 'noahnieberle.jpg'
  },

  experience: {
    sectionNumber: '02.',
    title: 'Experience',
    experiences: [
      {
        title: 'Mobile App Engineer I',
        company: 'Northwestern Mutual',
        date: 'May 2023 – Present',
        isActive: true,
        responsibilities: [
          'Developed mobile features and extensions for a large-scale financial application used by thousands of clients',
          'Built an Android Watch application enabling authenticated users to view high-level financial summaries on wearable devices',
          'Designed user interfaces using Jetpack Compose and Material Design principles',
          'Worked on device connectivity validation, authentication flows, and reliability for mobile-to-watch communication',
          'Expanded cloud knowledge through company-sponsored AWS Cloud Practitioner preparation'
        ]
      },
      {
        title: 'Information Systems Intern',
        company: 'PST (Precision Screw Thread)',
        date: 'May 2022 – Aug 2022',
        responsibilities: [
          'Developed a Python-based application to analyze and clean manufacturing production data',
          'Collaborated directly with manufacturing engineers to define requirements and validate outputs',
          'Implemented data processing pipelines using Pandas and NumPy',
          'Built a lightweight GUI and persisted reports using SQLite for internal use',
          'Designed an API layer to support future system expansion'
        ]
      },
      {
        title: 'Resident Assistant',
        company: 'Milwaukee School of Engineering',
        date: 'Aug 2022 – Present',
        responsibilities: [
          'Managed and supported a residential floor of approximately 40 students',
          'Resolved conflicts through mediation and clear communication',
          'Planned and executed community-building events',
          'Served as a leadership and academic support resource for first-year students'
        ]
      }
    ]
  },

  contact: {
    sectionLabel: '03. What’s Next?',
    title: 'Get In Touch',
    description:
      'If you’d like to talk about machine learning, software engineering, or anything tech, feel free to reach out.',
    email: 'noahjnieberle@gmail.com',
    buttonText: 'Say Hello'
  }
};
