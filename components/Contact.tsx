export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Let's Build Something Amazing Together
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Ready to discuss DevOps opportunities, collaboration on cloud-native projects, 
          or share insights about containerization and infrastructure automation.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-4">📧</div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-gray-300">your.email@example.com</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-4">💼</div>
            <h3 className="font-semibold mb-2">LinkedIn</h3>
            <p className="text-gray-300">Connect professionally</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl mb-4">🐙</div>
            <h3 className="font-semibold mb-2">GitHub</h3>
            <p className="text-gray-300">View my DevOps projects</p>
          </div>
        </div>
        
        <div className="bg-indigo-600 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">🚀 Currently Available</h3>
          <p className="text-indigo-100">
            Seeking DevOps Engineer opportunities starting May 2026 | 
            Open to internships and entry-level positions in cloud-native environments
          </p>
        </div>
      </div>
    </section>
  );
}