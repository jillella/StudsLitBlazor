# Integrate web components library (StudsLit) with Blazor

Step 1: Create a new directory at the root of your Blazor project, maybe name it `StudsLit`.

Step 2: Inside the StudsLit directory, initialize a new npm project:
```
npm init -y
```

Step 3: Install 'studs-lit' and Vite:
```
npm install studs-lit
npm install --save-dev vite
```

Step 4: In the StudsLit directory, create an index.js file and import your 'studs-lit':
```
import 'studs-lit';
import 'studs-lit/dist/assets/index-db9b21d2.css';
```

Step 5: In the package.json in the StudsLit directory, add a new build script:
```
"scripts": {
  "build": "vite build"
}
```

Step 6: Create `vite.config.js` file in the StudsLit directory:
```
import { resolve } from 'path';

export default {
  build: {
    outDir: resolve(__dirname, '../wwwroot/studs'),
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'MyLib'
    }
  }
}
```

This script tells Vite to build your project and output the result into the wwwroot/studs directory of your Blazor project.

Step 7: Run the build script:
```
npm run build
```
This will create a bundled js and css files in your wwwroot/studs directory.

Step 8: Reference the UMD file and the CSS file in your _Host.cshtml (for server-side Blazor) or index.html (for client-side Blazor):
```
<head>
    ...
    <link rel="stylesheet" href="js/style.css">
    <script src="js/clientapp.umd.js"></script>
    ...
</head>
```

That's it! Now you can manage your JavaScript dependencies separately in the StudsLit directory and use Vite to bundle them.

