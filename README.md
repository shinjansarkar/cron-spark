# ⏰ Cron Job Helper

Cron Job Helper is a simple and intuitive web app built with **HTML, CSS, and JavaScript (React + Tailwind + shadcn/ui)** that helps developers quickly build, understand, and apply cron expressions.  
It provides **ready-to-use templates** (like "Every 5 minutes", "Daily at Midnight", etc.) as well as a **custom cron builder** for advanced scheduling.

---

## 🚀 Why Cron Job Helper?

Managing **cron jobs** can be confusing, especially for beginners:
- Cron syntax is **tricky** (`0 0 * * *` vs `*/5 * * * *`).
- Developers often forget which field means **minute/hour/day/month/week**.
- Small mistakes can break automation workflows.

**Cron Job Helper solves this problem** by:
- Offering **predefined templates** for common schedules.
- Allowing **custom cron expression generation** with a friendly UI.
- Making it easy to **copy & paste cron strings** into your system.

---

## 📅 What is Cron?

**Cron** is a time-based job scheduler available in Unix-like operating systems.  
It allows you to run commands, scripts, or tasks automatically at specific times and intervals.

Examples:
- Run backups every night at midnight.
- Check server health every 5 minutes.
- Send weekly reports on Sunday evening.

---

## 🛠️ Features

- ✅ **Quick Templates** (Every 5 minutes, Hourly, Daily, Weekly, Monthly).
- ✅ **Custom Cron Builder** with minute/hour/day/month/day-of-week selectors.
- ✅ **One-click Apply** → instantly generate cron expressions.
- ✅ **Copy & Paste** final cron string.
- ✅ **Clean, modern UI** built with React + Tailwind + shadcn/ui.
- ✅ **Responsive**: works on desktop and mobile.

---

## 📂 When To Use

You should use **Cron Job Helper** when:
- You need to **schedule repetitive tasks** (backups, cleanup jobs, monitoring).
- You’re working with **servers** (Linux/Unix) that rely on cron jobs.
- You want a **human-friendly way** to build cron expressions.
- You want to avoid mistakes in manual cron writing.

---

## 📋 Usage Examples

- **Every 5 Minutes** → `*/5 * * * *`  
  Run server health check every 5 minutes.

- **Daily at Midnight** → `0 0 * * *`  
  Trigger backup every night at 12:00 AM.

- **Weekdays at 9 AM** → `0 9 * * 1-5`  
  Send team reports Monday to Friday at 9:00 AM.

- **Weekly on Sunday (6 PM)** → `0 18 * * 0`  
  Cleanup logs every Sunday at 6 PM.

- **Monthly on 1st** → `0 0 1 * *`  
  Run billing cycle on the 1st of every month.

- **Hourly** → `0 * * * *`  
  Restart service every hour on the hour.

---

## ⚡ How to Use

1. Open the app in your browser.
2. Choose a **Quick Template** or build your own cron schedule.
3. Click **Apply** → the cron string is generated.
4. Copy it into your system:
   ```bash
   crontab -e
   ```
5. Paste your cron expression, save, and exit.

---

## 🧑‍💻 Tech Stack

- **Frontend:** React, TailwindCSS, shadcn/ui, Lucide Icons
- **Language:** TypeScript
- **Deployment:** Vercel / Netlify (or any static hosting)

---


## 📜 License

This project is open-source under the [MIT License](LICENSE).

---

## 🙌 Contributing

Contributions are welcome!  
If you have ideas, feel free to **open an issue** or **submit a pull request**.
