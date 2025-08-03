import React from 'react';
import { Terminal, AlertCircle, CheckCircle } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  isRunning: boolean;
}

function OutputPanel({ output, isRunning }: OutputPanelProps) {
  const hasError = output.toLowerCase().includes('error') || 
                   output.toLowerCase().includes('exception') ||
                   output.toLowerCase().includes('compilation errors') ||
                   output.toLowerCase().includes('runtime errors');
  const isSuccess = output.length > 0 && !hasError && !isRunning;

  return (
    <div className="flex-1 bg-gray-900 flex flex-col">
      {/* Status Bar */}
      {output && (
        <div className={`px-4 py-2 text-xs flex items-center space-x-2 border-b border-gray-700 ${
          hasError ? 'bg-red-900 text-red-200' : 
          isSuccess ? 'bg-green-900 text-green-200' : 
          'bg-blue-900 text-blue-200'
        }`}>
          {hasError ? (
            <AlertCircle className="h-3 w-3" />
          ) : isSuccess ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <Terminal className="h-3 w-3" />
          )}
          <span>
            {hasError ? 'Execution Error' : 
             isSuccess ? 'Execution Successful' : 
             'Program Output'}
          </span>
        </div>
      )}
      
      {/* Output Content */}
      <div className="flex-1 p-4 overflow-auto">
        {isRunning ? (
          <div className="flex items-center space-x-3 text-blue-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            <span className="text-sm">Compiling and executing code...</span>
          </div>
        ) : output ? (
          <pre className={`font-mono text-sm whitespace-pre-wrap leading-relaxed ${
            hasError ? 'text-red-300' : 'text-gray-200'
          }`}>
            {output}
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Terminal className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-sm text-center">
              Click "Run" to execute your code<br />
              Real-time execution results will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;