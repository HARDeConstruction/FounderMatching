// src/data/sampleStartups.ts

import { StartupItem } from "@/types";

export const sampleStartups: StartupItem[] = [
    {
        id: "1",
        name: "NaviAI",
        logoUrl: "/path/to/logo.png",
        stage: "Growth Stage",
        status: "Actively Hiring",
        tagline: "Empowering Innovators with AI",
        statement: "Helping innovators solve their toughest challenges with AI.",
        description: `
          NaviAI offers an adaptable platform with advanced AI tools to empower startups and innovators 
          in tackling unique challenges. Built with flexibility, it enables users to customize solutions 
          for their specific needs. Our mission is to make AI accessible to all, from data scientists 
          to business leaders, enhancing decision-making, optimizing processes, and unlocking growth. 
          NaviAI helps businesses innovate and stay competitive in a digital, AI-driven world.
        `,
        usp: `
          Our platform delivers highly personalized AI-driven solutions that integrate 
          seamlessly into any organization. With an emphasis on flexibility, privacy, and 
          adaptability, NaviAI sets the standard for AI that grows alongside your business.
        `,
        openPositions: [
          "Software Engineer - AI Integration, ",
          "Product Designer - User Experience, ",
          "Data Scientist - Machine Learning Specialist, ",
        ],
        aboutUs: `
        At NaviAI, we are dedicated to pushing the boundaries of artificial intelligence 
        to empower innovators and forward-thinking companies. Our mission is rooted in a passion 
        for creating meaningful and impactful AI solutions that drive measurable success, operational 
        efficiency, and sustainable growth in today's fast-paced, competitive landscape.
      
        Our team of AI experts and industry specialists works closely with clients across a diverse 
        range of industries to develop customized AI experiences that address their unique challenges. 
        We believe in the power of personalization, ensuring that every solution we provide is tailored 
        to fit the distinct needs and goals of each organization. From startups to established enterprises, 
        we focus on helping visionaries harness the potential of AI to transform their businesses.
      
        By partnering with NaviAI, companies can expect not only cutting-edge technology but also a 
        commitment to continuous innovation, trust, and transparency. We are here to guide and support 
        our clients on their journey towards smarter, more data-driven decision-making. Whether it’s 
        through optimizing processes, enhancing customer experiences, or uncovering new growth opportunities, 
        NaviAI stands as a reliable partner in redefining what’s possible with AI.
        `,
      
        team: `
          Our team comprises industry-leading AI researchers, data scientists, and product 
          designers. Together, we bring a diverse set of skills and perspectives to ensure that 
          every solution we develop meets the highest standards of innovation and excellence.
        `,
        jobDescription: `
          - Software Engineer - AI Integration: Responsible for integrating advanced AI models into the platform, ensuring scalability, and delivering a seamless user experience.
          - Product Designer - User Experience: Creates intuitive and user-friendly designs, focusing on making AI tools accessible and enhancing user interaction.
          - Data Scientist - Machine Learning Specialist: Builds and refines machine learning models, providing data-driven insights to address unique challenges faced by startups.
        `,
      },
    {
    id: "2",
    name: "EcoTech",
    logoUrl: "/path/to/ecotech-logo.png",
    stage: "Series A",
    status: "Actively Hiring",
    tagline: "Sustainable Solutions for a Greener Future",
    statement: "Innovating for a sustainable and eco-friendly world.",
    description: `
      EcoTech provides sustainable technology solutions to help companies reduce their carbon footprint and transition to eco-friendly practices. 
      Our products are designed to be both efficient and environmentally conscious, empowering businesses to make a positive impact on the planet.
    `,
    usp: `
      Our unique approach combines advanced technology with sustainable practices to create solutions that benefit both businesses and the environment. 
      We believe in innovation with purpose, driving a future where technology and nature coexist harmoniously.
    `,
    openPositions: [
      "Environmental Scientist - Product Development",
      "Software Engineer - Sustainability Focus",
      "Project Manager - Green Initiatives",
    ],
    aboutUs: `
      EcoTech is on a mission to tackle climate change by providing innovative technology that supports sustainable business practices. 
      Our team of passionate environmentalists, engineers, and technologists work together to build solutions that are effective, scalable, and eco-friendly.
    `,
    team: `
      Our team includes experts in environmental science, engineering, and business strategy, all dedicated to making a difference. 
      We value collaboration, innovation, and a shared commitment to creating a more sustainable world.
    `,
    jobDescription: `
      - Environmental Scientist - Product Development: Work on developing and refining sustainable solutions, ensuring alignment with industry standards and eco-friendly goals.
      - Software Engineer - Sustainability Focus: Build software applications that assist companies in reducing waste and increasing operational efficiency.
      - Project Manager - Green Initiatives: Oversee projects from conception to completion, focusing on sustainable practices and green technology integration.
    `,
  },
  {
    id: "3",
    name: "Healthify",
    logoUrl: "/path/to/healthify-logo.png",
    stage: "Seed Stage",
    status: "Hiring Soon",
    tagline: "Empowering People to Take Charge of Their Health",
    statement: "Revolutionizing health management through technology.",
    description: `
      Healthify is a health-tech startup focused on providing personalized health insights and recommendations. 
      Our platform uses AI to analyze users' health data, offering actionable insights that help individuals manage and improve their well-being.
    `,
    usp: `
      Our technology makes it easy for users to monitor their health and receive tailored advice, improving their quality of life through proactive health management.
      Healthify leverages AI to deliver a unique, data-driven health experience that adapts to each individual.
    `,
    openPositions: [
      "Data Analyst - Health Insights",
      "Mobile Developer - Health App",
      "Product Designer - User Health Interface",
    ],
    aboutUs: `
      Healthify is transforming healthcare by putting health insights in the hands of individuals. 
      Our team is composed of experts in data science, healthcare, and software engineering, all passionate about making a positive impact on people’s health.
    `,
    team: `
      We are a diverse team of data scientists, developers, and healthcare professionals. 
      Together, we are creating technology that empowers users to make informed health decisions.
    `,
    jobDescription: `
      - Data Analyst - Health Insights: Analyze health data to provide valuable insights and improve our AI models for personalized health advice.
      - Mobile Developer - Health App: Develop and enhance our mobile app, making it user-friendly and accessible for a broad audience.
      - Product Designer - User Health Interface: Design intuitive user interfaces that make health information easily understandable and actionable.
    `,
  },
  {
    id: "4",
    name: "FinSave",
    logoUrl: "/path/to/finsave-logo.png",
    stage: "Growth Stage",
    status: "Hiring",
    tagline: "Building the Future of Financial Security",
    statement: "Helping people manage and grow their financial well-being.",
    description: `
      FinSave is a fintech startup that focuses on financial literacy and savings tools for everyday users. 
      We provide smart tools that empower individuals to save more, spend wisely, and build financial security for the future.
    `,
    usp: `
      FinSave stands out for its user-friendly interface and AI-driven financial advice, making it easy for anyone to manage their finances and achieve their goals.
      We focus on personalized insights and practical tools that make financial planning accessible to everyone.
    `,
    openPositions: [
      "Financial Analyst - User Savings Patterns",
      "Backend Developer - FinTech Tools",
      "UX Researcher - Financial Literacy",
    ],
    aboutUs: `
      At FinSave, we are dedicated to helping people take control of their finances. Our team of financial experts, developers, and designers is committed to creating tools that simplify financial management and encourage healthy saving habits.
    `,
    team: `
      Our team is a mix of finance professionals, software engineers, and user experience designers. 
      We work collaboratively to build products that are both effective and user-friendly.
    `,
    jobDescription: `
      - Financial Analyst - User Savings Patterns: Conduct analysis on user savings behavior to improve our product recommendations and financial tools.
      - Backend Developer - FinTech Tools: Build and maintain our backend systems, ensuring data security and efficient financial transactions.
      - UX Researcher - Financial Literacy: Study user behavior and needs to create accessible financial education content and improve user engagement.
    `,
  },
];
