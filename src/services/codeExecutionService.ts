@@ .. @@
       swift: { language: 'swift', version: '5.3.3' },
       perl: { language: 'perl', version: '5.36.0' },
       lua: { language: 'lua', version: '5.4.4' },
-      r: { language: 'r', version: '4.1.1' }
+      r: { language: 'r', version: '4.1.1' },
+      sql: { language: 'sqlite3', version: '3.36.0' }
     };

     return configs[language] || configs.python;