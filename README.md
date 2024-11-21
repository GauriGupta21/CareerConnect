# **CareerConnect**

CareerConnect is a job portal web application designed to bridge the gap between job seekers and employers. This platform enables users to search for jobs, apply online, and manage their applications, while employers can post job openings and manage candidate applications.

<br>

## **Features**

### **Job Seekers**
- Register and create a profile.
- Search and filter job opportunities.
- Apply for jobs directly through the platform.
- Track the status of job applications.

### **Employers**
- Register and manage a company profile.
- Post job openings with detailed descriptions.
- View and manage applications for posted jobs.

### **General**
- Secure authentication and authorization.
- Admin dashboard for managing users and content.
- Responsive design for seamless usage across devices.

<br>

## **Technologies Used**

### **Frontend**
- HTML, CSS, JavaScript
- React.js (for UI components and state management)

### **Backend**
- Node.js (for server-side logic)
- Express.js (for RESTful API development)
- MongoDB (for data storage)

### **Other Tools**
- JWT (for secure user authentication)
- Multer (for handling file uploads)
- OpenAI API (for advanced features, e.g., cover letter generation)

<br>

## **Setup and Installation**

### **Prerequisites**
1. Node.js (version 16 or above)
2. MongoDB (running locally or on the cloud)
3. Git
4. A `.env` file with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key

## **Steps to Run Locally**

### Clone the repository:
```bash
git clone https://github.com/GauriGupta21/CareerConnect.git
cd CareerConnect

<br>
Install dependencies for both frontend and backend:
# Navigate to the backend folder
cd backend
npm install

# Navigate to the frontend folder
cd ../frontend
npm install
