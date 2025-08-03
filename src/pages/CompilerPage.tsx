@@ .. @@
     kotlin: 'kt'
-    swift: 'main.swift',
-    perl: 'main.pl',
-    lua: 'main.lua',
-    r: 'main.r'
+    swift: 'swift',
+    perl: 'pl',
+    lua: 'lua',
+    r: 'r'
   };
   return extensions[language] || 'txt';
 }

-function getLanguageDisplayName(lang: string): string {
-  const names: { [key: string]: string } = {
-    python: 'Python',
-    javascript: 'JavaScript',
-    typescript: 'TypeScript',
-    java: 'Java',
-    cpp: 'C++',
-    c: 'C',
-    csharp: 'C#',
-    go: 'Go',
-    rust: 'Rust',
-    php: 'PHP',
-    ruby: 'Ruby',
-    kotlin: 'Kotlin'
-  };
-  return names[lang] || lang;
-}
-
 export default CompilerPage;