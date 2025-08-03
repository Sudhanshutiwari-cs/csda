import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Database, Globe, Cpu, Hash, FileCode, Zap } from 'lucide-react';

const languages = [
  { id: 'python', name: 'Python', icon: Code2, color: 'bg-blue-500', description: 'High-level programming language' },
  { id: 'javascript', name: 'JavaScript', icon: FileCode, color: 'bg-yellow-500', description: 'Dynamic web programming' },
  { id: 'typescript', name: 'TypeScript', icon: FileCode, color: 'bg-blue-700', description: 'Typed JavaScript' },
  { id: 'java', name: 'Java', icon: Cpu, color: 'bg-orange-600', description: 'Object-oriented programming' },
  { id: 'cpp', name: 'C++', icon: Hash, color: 'bg-blue-600', description: 'Systems programming language' },
  { id: 'c', name: 'C', icon: Hash, color: 'bg-gray-600', description: 'Low-level programming' },
  { id: 'csharp', name: 'C#', icon: Hash, color: 'bg-purple-600', description: 'Microsoft .NET framework' },
  { id: 'go', name: 'Go', icon: Zap, color: 'bg-cyan-500', description: 'Fast, compiled language' },
  { id: 'rust', name: 'Rust', icon: Cpu, color: 'bg-orange-700', description: 'Systems programming' },
  { id: 'php', name: 'PHP', icon: Globe, color: 'bg-purple-500', description: 'Server-side scripting' },
  { id: 'ruby', name: 'Ruby', icon: FileCode, color: 'bg-red-600', description: 'Dynamic programming language' },
  { id: 'kotlin', name: 'Kotlin', icon: Cpu, color: 'bg-orange-500', description: 'Modern JVM language' },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Code2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">CodeRunner</h1>
            </div>
            <div className="text-sm text-gray-600">
              Free Online Compiler
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real-Time Code Execution Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Execute code in 12+ programming languages with real-time compilation and output. 
            Powered by secure cloud execution - no installation required!
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {languages.map((language) => {
            const IconComponent = language.icon;
            return (
              <Link
                key={language.id}
                to={`/compiler/${language.id}`}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className={`${language.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {language.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language.description}
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Execution</h3>
            <p className="text-gray-600">Execute code instantly with real compilation and runtime feedback</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cloud-Powered</h3>
            <p className="text-gray-600">Secure cloud execution environment accessible from any browser</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Languages</h3>
            <p className="text-gray-600">Full compiler support for 12+ languages with execution statistics</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;