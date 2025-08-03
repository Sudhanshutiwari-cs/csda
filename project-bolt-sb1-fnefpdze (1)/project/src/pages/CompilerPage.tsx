import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Code2, 
  Play, 
  Square, 
  RotateCcw, 
  Settings, 
  Share2, 
  Home,
  ChevronRight,
  Maximize2,
  Copy,
  Download
} from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';
import Sidebar from '../components/Sidebar';
import { codeExecutionService } from '../services/codeExecutionService';

function CompilerPage() {
  const { language } = useParams<{ language: string }>();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [memory, setMemory] = useState<number>(0);

  useEffect(() => {
    // Set default code based on language
    setCode(getDefaultCode(language || 'python'));
    setOutput('');
    setExecutionTime(0);
    setMemory(0);
  }, [language]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Executing code...');
    
    try {
      const startTime = Date.now();
      const result = await codeExecutionService.executeCode({
        language: language || 'python',
        code: code
      });
      
      const endTime = Date.now();
      const actualExecutionTime = endTime - startTime;
      
      if (result.error) {
        setOutput(`Error:\n${result.error}`);
      } else {
        let outputText = result.output;
        if (result.executionTime || result.memory) {
          outputText += `\n\n--- Execution Stats ---`;
          if (result.executionTime) {
            outputText += `\nExecution Time: ${result.executionTime}ms`;
          }
          if (result.memory) {
            outputText += `\nMemory Used: ${(result.memory / 1024).toFixed(2)} KB`;
          }
          outputText += `\nTotal Time: ${actualExecutionTime}ms`;
        }
        setOutput(outputText);
      }
      
      setExecutionTime(result.executionTime || actualExecutionTime);
      setMemory(result.memory || 0);
    } catch (error) {
      setOutput(`Execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleClear = () => {
    setOutput('');
    setExecutionTime(0);
    setMemory(0);
  };

  const handleReset = () => {
    setCode(getDefaultCode(language || 'python'));
    setOutput('');
    setExecutionTime(0);
    setMemory(0);
  };

  const getLanguageDisplayName = (lang: string) => {
    const names: { [key: string]: string } = {
      python: 'Python',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      java: 'Java',
      cpp: 'C++',
      c: 'C',
      csharp: 'C#',
      go: 'Go',
      rust: 'Rust',
      php: 'PHP',
      ruby: 'Ruby',
      kotlin: 'Kotlin'
    };
    return names[lang] || lang;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            <Code2 className="h-5 w-5" />
          </button>
          
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-blue-400 hover:text-blue-300 flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-500" />
            <span className="text-gray-300">{getLanguageDisplayName(language || '')}</span>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-3 py-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
          
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors font-medium"
          >
            {isRunning ? (
              <Square className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} currentLanguage={language || 'python'} />

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-300">main.{getFileExtension(language || 'python')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <CodeEditor
              language={language || 'python'}
              value={code}
              onChange={setCode}
            />
          </div>

          {/* Output Panel */}
          <div className="w-1/3 border-l border-gray-700 flex flex-col">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">Output</span>
                {(executionTime > 0 || memory > 0) && (
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    {executionTime > 0 && (
                      <span>{executionTime}ms</span>
                    )}
                    {memory > 0 && (
                      <span>{(memory / 1024).toFixed(1)}KB</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleClear}
                  className="text-xs text-gray-400 hover:text-white hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <OutputPanel output={output} isRunning={isRunning} />
          </div>
        </div>
      </div>
    </div>
  );
}

function getDefaultCode(language: string): string {
  const defaultCodes: { [key: string]: string } = {
    python: `# Online Python compiler (interpreter)
# Write Python 3 code in this online editor and run it.

print("Hello, World!")

# Example: Variables and basic operations
name = "CodeRunner"
version = 1.0

print(f"Welcome to {name} v{version}")

# Example: Functions
def greet(name):
    return f"Hello, {name}!"

print(greet("Python Developer"))`,

    javascript: `// Online JavaScript compiler
// Write JavaScript code in this online editor and run it.

console.log("Hello, World!");

// Example: Variables and basic operations
const name = "CodeRunner";
const version = 1.0;

console.log(\`Welcome to \${name} v\${version}\`);

// Example: Functions
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("JavaScript Developer"));`,

    typescript: `// Online TypeScript compiler
// Write TypeScript code in this online editor and run it.

interface User {
    name: string;
    version: number;
}

function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

function main(): void {
    console.log("Hello, World!");
    
    // Example: Variables with types
    const app: User = {
        name: "CodeRunner",
        version: 1.0
    };
    
    console.log(\`Welcome to \${app.name} v\${app.version}\`);
    
    // Example: Functions
    console.log(greet("TypeScript Developer"));
}

main();`,

    java: `// Online Java compiler
// Write Java code in this online editor and run it.

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Example: Variables and basic operations
        String name = "CodeRunner";
        double version = 1.0;
        
        System.out.println("Welcome to " + name + " v" + version);
        
        // Example: Methods
        System.out.println(greet("Java Developer"));
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,

    cpp: `// Online C++ compiler
// Write C++ code in this online editor and run it.

#include <iostream>
#include <string>

using namespace std;

string greet(string name) {
    return "Hello, " + name + "!";
}

int main() {
    cout << "Hello, World!" << endl;
    
    // Example: Variables and basic operations
    string name = "CodeRunner";
    double version = 1.0;
    
    cout << "Welcome to " << name << " v" << version << endl;
    
    // Example: Functions
    cout << greet("C++ Developer") << endl;
    
    return 0;
}`,

    c: `// Online C compiler
// Write C code in this online editor and run it.

#include <stdio.h>
#include <string.h>

void greet(char* name) {
    printf("Hello, %s!\\n", name);
}

int main() {
    printf("Hello, World!\\n");
    
    // Example: Variables and basic operations
    char name[] = "CodeRunner";
    double version = 1.0;
    
    printf("Welcome to %s v%.1f\\n", name, version);
    
    // Example: Functions
    greet("C Developer");
    
    return 0;
}`,

    php: `<?php
// Online PHP compiler
// Write PHP code in this online editor and run it.

echo "Hello, World!\\n";

// Example: Variables and basic operations
$name = "CodeRunner";
$version = 1.0;

echo "Welcome to $name v$version\\n";

// Example: Functions
function greet($name) {
    return "Hello, $name!";
}

echo greet("PHP Developer") . "\\n";

// Example: Arrays
$languages = ["PHP", "JavaScript", "Python"];
foreach ($languages as $lang) {
    echo "- $lang\\n";
}
?>`,

    ruby: `# Online Ruby compiler
# Write Ruby code in this online editor and run it.

puts "Hello, World!"

# Example: Variables and basic operations
name = "CodeRunner"
version = 1.0

puts "Welcome to #{name} v#{version}"

# Example: Methods
def greet(name)
    "Hello, #{name}!"
end

puts greet("Ruby Developer")

# Example: Arrays and iteration
languages = ["Ruby", "Python", "JavaScript"]
languages.each { |lang| puts "- #{lang}" }`,

    kotlin: `// Online Kotlin compiler
// Write Kotlin code in this online editor and run it.

fun greet(name: String): String {
    return "Hello, \$name!"
}

fun main() {
    println("Hello, World!")
    
    // Example: Variables and basic operations
    val name = "CodeRunner"
    val version = 1.0
    
    println("Welcome to \$name v\$version")
    
    // Example: Functions
    println(greet("Kotlin Developer"))
    
    // Example: Lists
    val languages = listOf("Kotlin", "Java", "Scala")
    languages.forEach { println("- \$it") }
}`,

    go: `// Online Go compiler
// Write Go code in this online editor and run it.

package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    fmt.Println("Hello, World!")
    
    // Example: Variables and basic operations
    name := "CodeRunner"
    version := 1.0
    
    fmt.Printf("Welcome to %s v%.1f\\n", name, version)
    
    // Example: Functions
    fmt.Println(greet("Go Developer"))
}`,

    rust: `// Online Rust compiler
// Write Rust code in this online editor and run it.

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("Hello, World!");
    
    // Example: Variables and basic operations
    let name = "CodeRunner";
    let version = 1.0;
    
    println!("Welcome to {} v{}", name, version);
    
    // Example: Functions
    println!("{}", greet("Rust Developer"));
}`,

    csharp: `// Online C# compiler
// Write C# code in this online editor and run it.

using System;

class Program {
    static string Greet(string name) {
        return $"Hello, {name}!";
    }
    
    static void Main() {
        Console.WriteLine("Hello, World!");
        
        // Example: Variables and basic operations
        string name = "CodeRunner";
        double version = 1.0;
        
        Console.WriteLine($"Welcome to {name} v{version}");
        
        // Example: Methods
        Console.WriteLine(Greet("C# Developer"));
    }
}`
  };

  return defaultCodes[language] || defaultCodes.python;
}

function getFileExtension(language: string): string {
  const extensions: { [key: string]: string } = {
    python: 'py',
    javascript: 'js',
    typescript: 'ts',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    csharp: 'cs',
    go: 'go',
    rust: 'rs',
    php: 'php',
    ruby: 'rb',
    kotlin: 'kt'
    swift: 'main.swift',
    perl: 'main.pl',
    lua: 'main.lua',
    r: 'main.r'
  };
  return extensions[language] || 'txt';
}

function getLanguageDisplayName(lang: string): string {
  const names: { [key: string]: string } = {
    python: 'Python',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    csharp: 'C#',
    go: 'Go',
    rust: 'Rust',
    php: 'PHP',
    ruby: 'Ruby',
    kotlin: 'Kotlin'
  };
  return names[lang] || lang;
}

export default CompilerPage;