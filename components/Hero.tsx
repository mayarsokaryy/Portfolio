export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 max-w-4xl">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Mayar
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            DevOps Engineer • Cloud-Native Specialist
          </p>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <p className="text-gray-600 mb-4">
            Mastering containerization, orchestration, and infrastructure automation through a 
            <span className="font-semibold text-indigo-600"> comprehensive 10-week DevOps roadmap</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Docker & Kubernetes</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">Infrastructure as Code</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">CI/CD & GitOps</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full">Platform Engineering</span>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <a
            className="px-6 py-3 rounded-lg border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 font-medium"
            href="#projects"
          >
            View DevOps Projects
          </a>
          <a
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 font-medium shadow-lg"
            href="#contact"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </section>
  );
}