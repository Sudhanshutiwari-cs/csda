import React from 'react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const getLanguageClass = (lang: string) => {
    // Basic syntax highlighting classes
    const classes = {
      python: 'language-python',
      javascript: 'language-javascript',
      java: 'language-java',
      cpp: 'language-cpp',
      c: 'language-c',
      html: 'language-html',
      css: 'language-css',
      sql: 'language-sql',
      go: 'language-go',
      rust: 'language-rust',
      typescript: 'language-typescript',
      csharp: 'language-csharp'
    };
    return classes[lang as keyof typeof classes] || 'language-text';
  };

  return (
    <div className="flex-1 relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-full bg-gray-900 text-gray-100 font-mono text-sm p-4 border-none outline-none resize-none ${getLanguageClass(language)}`}
        style={{
          fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
          lineHeight: '1.5',
          tabSize: 4
        }}
        placeholder={`Start writing ${language} code here...`}
        spellCheck={false}
      />
      
      {/* Line numbers */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 border-r border-gray-700 flex flex-col text-xs text-gray-500 pt-4">
        {value.split('\n').map((_, index) => (
          <div key={index} className="h-[21px] flex items-center justify-end pr-2">
            {index + 1}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .language-python .keyword { color: #ff7b72; }
        .language-python .string { color: #a5d6ff; }
        .language-python .comment { color: #8b949e; }
        .language-javascript .keyword { color: #ff7b72; }
        .language-javascript .string { color: #a5d6ff; }
        .language-html .tag { color: #7ee787; }
        .language-css .property { color: #79c0ff; }
        .language-sql .keyword { color: #ff7b72; }
      `}</style>
    </div>
  );
}

export default CodeEditor;