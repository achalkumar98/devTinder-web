
# 🚀 DevTinder – Connect with Developers Like Never Before!
 
 ## 🔥 Overview 
DevTinder is a **developer networking platform** where tech enthusiasts can **connect, chat, and collaborate** based on mutual interest. Inspired by Tinder, it lets users **swipe left to ignore and right to connect**, with real-time chat features powered by **Socket.io**.

🚀 Live Demo: https://dev-tinder-web-flame.vercel.app  
📌 GitHub Repository: [devTinder-frontend](https://github.com/achalkumar98/devTinder-web.git)\
📌 GitHub Repository: [devTinder-backend](https://github.com/achalkumar98/devTinder.git)   


## ✨ Features 

 
✅ **JWT & Cookie-based Authentication** – Secure login and signup.\
✅ **Swipeable Feed** – Browse developer profiles and swipe to connect.\
✅ **Connection Requests** – Accept/reject connection requests easily.\
✅ **Razorpay Payment Gateway integration** – Secure payments with webhook support.\
✅ **Real-time Chat** – Powered by Socket.io with online/offline status.\
✅ **Profile Management** – Edit and update your profile details.



## 🛠 Tech Stack  

**Frontend:** React.js, Redux, Tailwind CSS, DaisyUi  
**Backend:** Node.js, Express.js, MongoDB, Socket.io  
**Authentication:** JWT & Cookies  
**Payments:** Razorpay  


## 📂 Project Structure

```bash
devTinder-web/
│── public/     
│── src/          Frontend (React, Redux, Tailwind CSS, DaisyUi) 
│── .gitignore
│── eslint.config.js 
│── index.html 
│── package-lock.json       
│── package.json
│── vercel.json  
│── vite.config.js
```

## 🏗️ Installation
## Frontend  
### 1️⃣ Clone the repository  
```bash
git clone https://github.com/achalkumar98/devTinder-web.git
cd devTiner-web
```
### 2️⃣ Install dependencies 
```bash
npm install
npm start
```
## Backend
### 1️⃣ Clone the repository 
```bash
git clone https://github.com/achalkumar98/devTinder.git
cd devTiner
```
### 2️⃣ Install dependencies 
```bash
npm install
npm run dev
```
    
## Setup Environment Variables
- Create a `.env` file in both frontend and backend folders.
- Add necessary environment variables as per `.env.example`.
### Backend .env
- `PORT=your_port`
- `MONGO_URI=mongodb+srv:your_mongodb_Uri`
- `JWT_SECRET=your_jwt_secret`
- `CLIENT_ORIGIN=your_frontend_origin`
- `RAZORPAY_KEY_ID=your_razorpay_key_id`
- `RAZORPAY_KEY_SECRET=your_razorpay_key_secret`
- `RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret`
### Frontend .env
- `VITE_BACKEND_URL=your_backend_url`



## 🚀 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.


## 🧠 Upcoming Features (Planned)

💬 **Typing Indicator** – Show when the other user is typing (WhatsApp-style).\
📎 **File Attachments in Chat** – Send and receive images, PDFs, or code snippets.\
🎨 **UI/UX Improvements** – Make the interface sleeker and more interactive.\
🎯 **Daily Match Suggestions** – Algorithmic suggestions based on mutual interests or languages.\
📊 **Activity Stats** – Track profile views, swipe counts, and connection stats.\
🛡️ **Reporting & Blocking** – Allow users to report/block inappropriate behavior.\
🔔 **Push Notifications** – Real-time browser/mobile alerts for messages and connection requests.\
💥 **Unit & Integration Tests** – Improve stability and reliability for production use.
## 📫 Contact

**👨‍💻Author:** [Achal Kumar](https://github.com/achalkumar98)\
**📧Email:** [hackerachal1620@gmail.com](hackerachal1620@gmail.com)