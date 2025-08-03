import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Database, 
  Globe, 
  Cpu, 
  Hash, 
  FileCode, 
  Zap,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentLanguage: string;
}

const languages = [
  { id: 'python', name: 'Python', icon: Code2, color: 'text-blue-400' },
  { id: 'javascript', name: 'JavaScript', icon: FileCode, color: 'text-yellow-400' },
  { id: 'typescript', name: 'TypeScript', icon: FileCode, color: 'text-blue-300' },
  { id: 'java', name: 'Java', icon: Cpu, color: 'text-orange-400' },
  { id: 'cpp', name: 'C++', icon: Hash, color: 'text-blue-300' },
  { id: 'c', name: 'C', icon: Hash, color: 'text-gray-400' },
  { id: 'csharp', name: 'C#', icon: Hash, color: 'text-purple-400' },
  { id: 'go', name: 'Go', icon: Zap, color: 'text-cyan-400' },
  { id: 'rust', name: 'Rust', icon: Cpu, color: 'text-orange-300' },
  { id: 'php', name: 'PHP', icon: Globe, color: 'text-purple-300' },
  { id: 'ruby', name: 'Ruby', icon: FileCode, color: 'text-red-400' },
  { id: 'kotlin', name: 'Kotlin', icon: Cpu, color: 'text-orange-500' },
];

function Sidebar({ isOpen, currentLanguage }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium">Languages</h3>
        </div>
      </div>

      {/* Language List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {languages.map((language) => {
            const IconComponent = language.icon;
            const isActive = currentLanguage === language.id;
            
            return (
              <Link
                key={language.id}
                to={`/compiler/${language.id}`}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <IconComponent className={`h-5 w-5 ${isActive ? 'text-white' : language.color}`} />
                <span className="font-medium">{language.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-700">
        <Link
          to="/"
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <Code2 className="h-4 w-4" />
          <span className="text-sm">Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;