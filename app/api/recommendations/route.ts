interface AssessmentData {
  name: string
  currentField: string
  careerGoal: string
  skills: string
  selectedSkills: string[]
  interests: string[]
  learningStyle: string
  experienceLevel: string
}

interface CareerRecommendation {
  title: string
  badge: string
  description: string
  whyGoodFit: string
  nextSteps: string[]
}

export async function POST(request: Request) {
  try {
    const assessment: AssessmentData = await request.json()

    // Mock recommendations based on user input
    const getMockRecommendations = (): CareerRecommendation[] => {
      const baseRecommendations = [
        {
          title: "Full Stack Developer",
          badge: "High Match",
          description: "Build and maintain both front-end and back-end systems for web applications. Your current skills in development and problem-solving make this an excellent fit.",
          whyGoodFit: "Your technical background and interest in building solutions align perfectly with full-stack development roles.",
          nextSteps: [
            "Complete advanced JavaScript and React courses",
            "Build 2-3 full-stack portfolio projects",
            "Contribute to open-source projects on GitHub",
            "Practice system design and database architecture"
          ]
        },
        {
          title: "Data Analyst",
          badge: "Great Fit",
          description: "Transform raw data into actionable insights using statistical analysis and visualization tools. Your analytical mindset and technical skills are well-suited for this role.",
          whyGoodFit: "Your attention to detail and interest in patterns and analysis match well with data-focused roles.",
          nextSteps: [
            "Learn SQL and data visualization tools like Tableau",
            "Complete data analysis projects with real datasets",
            "Develop statistical analysis skills",
            "Build a portfolio showcasing data storytelling"
          ]
        },
        {
          title: "Product Manager",
          badge: "Good Option",
          description: "Lead product development from conception to launch, working with cross-functional teams to deliver user-centric solutions.",
          whyGoodFit: "Your combination of technical understanding and strategic thinking provides a strong foundation for product management.",
          nextSteps: [
            "Study product management methodologies",
            "Analyze and document user stories for existing products",
            "Develop wireframing and prototyping skills",
            "Gain experience with agile development processes"
          ]
        }
      ]

      // Customize based on user's current field and interests
      if (assessment.currentField.toLowerCase().includes("design") || assessment.interests.some(i => i.toLowerCase().includes("design"))) {
        baseRecommendations[0] = {
          title: "UX Engineer",
          badge: "High Match",
          description: "Bridge the gap between design and development by creating interactive, user-centered interfaces. Your technical skills and design sensibility make this ideal.",
          whyGoodFit: "Your design interests combined with development skills create a unique advantage in UX engineering.",
          nextSteps: [
            "Master UI/UX design principles and tools",
            "Build interactive prototypes with React",
            "Study user research methodologies",
            "Create a portfolio of design-to-code projects"
          ]
        }
      }

      if (assessment.currentField.toLowerCase().includes("data") || assessment.interests.some(i => i.toLowerCase().includes("analytics"))) {
        baseRecommendations[1] = {
          title: "Data Scientist",
          badge: "High Match",
          description: "Apply machine learning and statistical models to solve complex business problems and extract insights from large datasets.",
          whyGoodFit: "Your analytical mindset and technical background provide a strong foundation for data science.",
          nextSteps: [
            "Learn Python for data science (Pandas, NumPy, Scikit-learn)",
            "Study machine learning algorithms and statistics",
            "Complete Kaggle competitions",
            "Build predictive modeling projects"
          ]
        }
      }

      if (assessment.experienceLevel.toLowerCase().includes("beginner")) {
        // Adjust recommendations for beginners
        baseRecommendations.forEach(rec => {
          rec.nextSteps = rec.nextSteps.slice(0, 2) // Fewer steps for beginners
          rec.nextSteps.unshift("Build foundational knowledge through online courses")
        })
      }

      return baseRecommendations
    }

    const recommendations = getMockRecommendations()

    // Simulate API delay (optional - remove for instant response)
    await new Promise(resolve => setTimeout(resolve, 1000))

    return Response.json({
      success: true,
      recommendations,
      assessment,
      demo: true // Indicate this is demo data
    })

  } catch (error) {
    console.error("Recommendations API error:", error)
    
    // Fallback demo data in case of error
    const fallbackRecommendations = [
      {
        title: "Software Developer",
        badge: "High Match",
        description: "Develop and maintain software applications using modern programming languages and frameworks.",
        whyGoodFit: "Your technical skills and problem-solving abilities align well with software development roles.",
        nextSteps: [
          "Master a primary programming language",
          "Build portfolio projects",
          "Learn software development best practices",
          "Practice algorithm and data structure problems"
        ]
      },
      {
        title: "Technical Project Manager",
        badge: "Good Fit",
        description: "Lead technical teams and projects to successful delivery while managing resources and timelines.",
        whyGoodFit: "Your organizational skills and technical understanding make you suitable for project management.",
        nextSteps: [
          "Learn agile methodologies",
          "Develop communication and leadership skills",
          "Understand project management tools",
          "Gain experience in team coordination"
        ]
      },
      {
        title: "DevOps Engineer",
        badge: "Good Option",
        description: "Streamline development and operations processes through automation and infrastructure management.",
        whyGoodFit: "Your interest in systems and processes aligns with DevOps practices.",
        nextSteps: [
          "Learn cloud platforms (AWS, Azure, or GCP)",
          "Study containerization with Docker and Kubernetes",
          "Master CI/CD pipeline development",
          "Understand infrastructure as code"
        ]
      }
    ]

    return Response.json({
      success: true,
      recommendations: fallbackRecommendations,
      demo: true,
      error: "Using demo data due to processing issue"
    })
  }
}
