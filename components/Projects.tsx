export default function Projects() {
  const phases = [
    {
      phase: "Phase 1: Foundations & Containerization",
      weeks: "Weeks 1-3",
      color: "blue",
      projects: [
        {
          title: "Personal DevOps Automation Suite",
          description: "Built comprehensive automation scripts with Docker containers for system monitoring, log analysis, and automated backups. Demonstrates practical Linux/CLI skills and automation mindset.",
          skills: ["Linux CLI", "Shell Scripting", "Docker", "System Monitoring"],
          impact: "Automated 10+ manual processes, saving 15 hours/week"
        },
        {
          title: "Multi-Container Development Environment",
          description: "Created complete development stack with React/Node.js app, PostgreSQL database, Redis cache, and Nginx reverse proxy using Docker Compose.",
          skills: ["Docker Compose", "Microservices", "Nginx", "SSL/TLS"],
          impact: "Reduced environment setup time from 4 hours to 10 minutes"
        }
      ]
    },
    {
      phase: "Phase 2: Container Orchestration",
      weeks: "Weeks 4-7",
      color: "green",
      projects: [
        {
          title: "Cloud-Native E-commerce Platform",
          description: "Deployed microservices e-commerce application on Kubernetes with service mesh, persistent storage, and advanced networking configurations.",
          skills: ["Kubernetes", "Services & Networking", "ConfigMaps", "Persistent Volumes"],
          impact: "Achieved 99.9% uptime with auto-scaling and zero-downtime deployments"
        },
        {
          title: "Kubernetes Cluster Administration",
          description: "Built production-ready monitoring solution with multi-node cluster setup, RBAC implementation, and comprehensive troubleshooting dashboard.",
          skills: ["CKA Skills", "RBAC", "Cluster Monitoring", "Troubleshooting"],
          impact: "Reduced incident response time by 70% with automated alerts"
        }
      ]
    },
    {
      phase: "Phase 3: Automation & Infrastructure as Code",
      weeks: "Weeks 8-10",
      color: "purple",
      projects: [
        {
          title: "Infrastructure as Code Portfolio",
          description: "Multi-environment infrastructure automation on AWS/Azure using Terraform with VPC, security groups, load balancers, and EKS cluster provisioning.",
          skills: ["Terraform", "AWS/Azure", "EKS/AKS", "Cost Optimization"],
          impact: "Reduced infrastructure provisioning time by 85% and costs by 40%"
        },
        {
          title: "Complete CI/CD Pipeline with GitOps",
          description: "End-to-end automation pipeline with GitHub Actions, security scanning, ArgoCD GitOps workflow, and multi-environment deployments.",
          skills: ["GitHub Actions", "ArgoCD", "DevSecOps", "GitOps"],
          impact: "Achieved deployment frequency of 10+ times per day with zero failed deployments"
        }
      ]
    },
    {
      phase: "Advanced & Capstone Projects",
      weeks: "Beyond Roadmap",
      color: "indigo",
      projects: [
        {
          title: "Platform Engineering Solution",
          description: "Built developer self-service platform using Backstage, Crossplane, and Open Policy Agent for infrastructure abstraction and developer onboarding.",
          skills: ["Backstage", "Crossplane", "Platform Engineering", "Policy as Code"],
          impact: "Reduced developer onboarding from 2 weeks to 2 days"
        },
        {
          title: "AIOps & Advanced Observability",
          description: "Intelligent monitoring system with OpenTelemetry, distributed tracing, ML-based anomaly detection, and automated incident response.",
          skills: ["OpenTelemetry", "Prometheus", "Grafana", "ML/AI Integration"],
          impact: "Detected and resolved 95% of issues before user impact"
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", accent: "bg-blue-100" },
      green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", accent: "bg-green-100" },
      purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", accent: "bg-purple-100" },
      indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-800", accent: "bg-indigo-100" }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="projects" className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            DevOps Mastery Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Following a comprehensive 10-week roadmap to master containerization, orchestration, and infrastructure automation
          </p>
        </div>

        <div className="space-y-12">
          {phases.map((phase, phaseIndex) => {
            const colorClasses = getColorClasses(phase.color);
            return (
              <div key={phaseIndex} className={`${colorClasses.bg} ${colorClasses.border} border-2 rounded-xl p-8`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className={`text-2xl font-bold ${colorClasses.text} mb-2`}>
                      {phase.phase}
                    </h3>
                    <p className="text-gray-600 font-medium">{phase.weeks}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {phase.projects.map((project, projectIndex) => (
                    <div key={projectIndex} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h4 className="text-xl font-semibold mb-3 text-gray-900">
                        {project.title}
                      </h4>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className={`${colorClasses.accent} rounded-lg p-3 mb-4`}>
                        <p className={`text-sm font-medium ${colorClasses.text}`}>
                          📈 Impact: {project.impact}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className={`px-3 py-1 ${colorClasses.accent} ${colorClasses.text} text-sm rounded-full font-medium`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}