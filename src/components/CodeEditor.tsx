@@ .. @@
       {/* Line numbers */}
       <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 border-r border-gray-700 flex flex-col text-xs text-gray-500 pt-4">
         {value.split('\n').map((_, index) => (
           <div key={index} className="h-[21px] flex items-center justify-end pr-2">
             {index + 1}
           </div>
         ))}
       </div>
-      
-      <style jsx>{`
-        .language-python .keyword { color: #ff7b72; }
-        .language-python .string { color: #a5d6ff; }
-        .language-python .comment { color: #8b949e; }
-        .language-javascript .keyword { color: #ff7b72; }
-        .language-javascript .string { color: #a5d6ff; }
-        .language-html .tag { color: #7ee787; }
-        .language-css .property { color: #79c0ff; }
-        .language-sql .keyword { color: #ff7b72; }
-      `}</style>
     </div>
   );
 }