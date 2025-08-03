interface ExecutionResult {
  output: string;
  error?: string;
  executionTime?: number;
  memory?: number;
}

interface ExecutionRequest {
  language: string;
  code: string;
  input?: string;
}

class CodeExecutionService {
  private readonly API_BASE_URL = 'https://emkc.org/api/v2/piston';

  private getLanguageConfig(language: string): { language: string; version: string } {
    const configs: { [key: string]: { language: string; version: string } } = {
      python: { language: 'python', version: '3.10.0' },
      javascript: { language: 'javascript', version: '18.15.0' },
      typescript: { language: 'typescript', version: '5.0.3' },
      java: { language: 'java', version: '15.0.2' },
      cpp: { language: 'cpp', version: '10.2.0' },
      c: { language: 'c', version: '10.2.0' },
      csharp: { language: 'csharp', version: '6.12.0' },
      go: { language: 'go', version: '1.16.2' },
      rust: { language: 'rust', version: '1.68.2' },
      php: { language: 'php', version: '8.2.3' },
      ruby: { language: 'ruby', version: '3.0.1' },
      kotlin: { language: 'kotlin', version: '1.8.20' },
      swift: { language: 'swift', version: '5.3.3' },
      perl: { language: 'perl', version: '5.36.0' },
      lua: { language: 'lua', version: '5.4.4' },
      r: { language: 'r', version: '4.1.1' }
    };

    return configs[language] || configs.python;
  }

  async executeCode(request: ExecutionRequest): Promise<ExecutionResult> {
    try {
      const config = this.getLanguageConfig(request.language);
      
      const payload = {
        language: config.language,
        version: config.version,
        files: [
          {
            name: this.getFileName(request.language),
            content: request.code
          }
        ],
        stdin: request.input || '',
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1
      };

      const response = await fetch(`${this.API_BASE_URL}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        output: this.formatOutput(data),
        error: data.compile?.stderr || data.run?.stderr || undefined,
        executionTime: data.run?.runtime || 0,
        memory: data.run?.memory || 0
      };
    } catch (error) {
      console.error('Code execution error:', error);
      return {
        output: '',
        error: `Execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        executionTime: 0,
        memory: 0
      };
    }
  }

  private formatOutput(data: any): string {
    let output = '';
    
    // Add compilation output if exists
    if (data.compile?.stdout) {
      output += `Compilation Output:\n${data.compile.stdout}\n\n`;
    }
    
    // Add runtime output
    if (data.run?.stdout) {
      output += data.run.stdout;
    }
    
    // Add compilation errors
    if (data.compile?.stderr) {
      output += `\nCompilation Errors:\n${data.compile.stderr}`;
    }
    
    // Add runtime errors
    if (data.run?.stderr) {
      output += `\nRuntime Errors:\n${data.run.stderr}`;
    }
    
    return output.trim() || 'No output generated';
  }

  private getFileName(language: string): string {
    const fileNames: { [key: string]: string } = {
      python: 'main.py',
      javascript: 'main.js',
      typescript: 'main.ts',
      java: 'Main.java',
      cpp: 'main.cpp',
      c: 'main.c',
      csharp: 'main.cs',
      go: 'main.go',
      rust: 'main.rs',
      php: 'main.php',
      ruby: 'main.rb',
      kotlin: 'main.kt',
      swift: 'main.swift',
      perl: 'main.pl',
      lua: 'main.lua',
      r: 'main.r'
    };
    
    return fileNames[language] || 'main.txt';
  }

  async getAvailableLanguages(): Promise<any[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/runtimes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch available languages:', error);
      return [];
    }
  }
}

export const codeExecutionService = new CodeExecutionService();
export type { ExecutionResult, ExecutionRequest };