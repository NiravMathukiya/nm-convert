# 🏆 NM-convertor

A tool for converting a custom Tailwind-like JSON configuration file into a global CSS file. Built to address the absence of options in Tailwind v4 configurations and the time-consuming process of manually writing configurations.

## Run Directly

```bash
npx nm-convert ./inputfilename.json ./outputfileName.css
```

##

## 📦 Installation (Run Globally)

### 1️⃣ Install the Package

```bash
npm install -g nm-convert
```

### 2️⃣ Run the command with that files Name

```bash
npx nm-convert ./inputfilename.json ./outputfileName.css
```

# Example

inputfilename.json

```json
{
  "colors": {
    "primary": { "500": "#1D4ED8", "DEFAULT": "#1D4ED8" }
  },
  "fontSize": {
    "sm": "14px",
    "md": "16px",
    "lg": "18px",
    "xl": "20px"
  },
  "spacing": {
    "sm": "10px",
    "md": "20px",
    "lg": "30px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px"
  },
  "boxShadow": {
    "sm": "0 1px 2px rgba(0,0,0,0.05)",
    "md": "0 4px 6px rgba(0,0,0,0.1)"
  },
  "transition": {
    "duration": "0.3s",
    "ease": "ease-in-out"
  }
}
```

outputfileName.css

```css
/* Generated CSS from JSON configuration */

.bg-primary-500 {
  background-color: #1d4ed8;
}
.text-primary-500 {
  color: #1d4ed8;
}
.border-primary-500 {
  border-color: #1d4ed8;
}
.ring-primary-500 {
  box-shadow: 0 0 0 3px #1d4ed8;
}

.bg-primary {
  background-color: #1d4ed8;
}
.text-primary {
  color: #1d4ed8;
}
.border-primary {
  border-color: #1d4ed8;
}
.ring-primary {
  box-shadow: 0 0 0 3px #1d4ed8;
}

.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-sm {
  border-radius: 4px;
}

.rounded-md {
  border-radius: 8px;
}

.rounded-lg {
  border-radius: 12px;
}

.text-sm {
  font-size: 14px;
}

.text-md {
  font-size: 16px;
}

.text-lg {
  font-size: 18px;
}

.text-xl {
  font-size: 20px;
}

.transition-duration {
  transition: 0.3s;
}

.transition-ease {
  transition: ease-in-out;
}
```

## 🚀 Features

- ✅ **Automatic generation of utility classes** from a Tailwind-like JSON config
- ✅ **Generates global CSS** with custom properties for colors, spacing, typography, etc.
- ✅ **Customizable output**, ensuring flexibility with your project
- ✅ **Helps in faster development** by eliminating the need to manually write utility classes

---

# Hi, I'm Nirav Mathukiya! 👋

I'm Nirav Mathukiya, a full-stack developer passionate about building web applications with Next.js , React.js, Node.js, Express, and MongoDB. Currently 🚀

🔹 Tech Stack: React.js | Node.js | Express | MongoDB | postgreSQL | Next.js

💡 Always exploring new technologies and working on exciting projects! Let's connect and collaborate.

📫 Reach me at: [LinkedIn](https://www.linkedin.com/in/nirav-mathukiya007)

---

## 🛠 Skills

- HTML
- CSS
- JavaScript
- React
- Tailwind
- Node.js
- Express
- MongoDB
- postgreSQL
- Next.js

---

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nirav-mathukiya007/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=X&logoColor=white)](https://x.com/developer_io_)
[![Github](https://img.shields.io/badge/Github-1DA1F2?style=for-the-badge&logo=github&logoColor=black)](https://github.com/NiravMathukiya)
