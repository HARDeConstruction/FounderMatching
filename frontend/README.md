**How to Run Frontend Demo Locally**

### Prerequisites

Before running the demo locally, ensure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later) or Yarn (v1.x or later)

### Steps to Run the Demo

1. **Clone the Repository**

   Clone the project repository from GitHub to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd <project-directory>
   ```

3. **Set Up Environment Variables**

   The project requires specific environment variables to function correctly. Start by creating a `.env.local` file from the `.env.example` template:

   ```bash
   cp .env.example .env.local
   ```

   Open the newly created `.env.local` file and add the required values:

   ```plaintext
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
   CLERK_SECRET_KEY=<your-clerk-secret-key>
   ```

   You can obtain these keys from your Clerk account. Ensure they are accurate for the application to work properly.

4. **Install Dependencies**

   Install all the necessary dependencies using npm or Yarn:

   ```bash
   npm install
   ```

   Or, if you prefer Yarn:

   ```bash
   yarn install
   ```

5. **Run the Development Server**

   Start the development server:

   ```bash
   npm run dev
   ```

   Or, if you're using Yarn:

   ```bash
   yarn dev
   ```

6. **Access the Application**

   Open your web browser and navigate to:

   ```
   http://localhost:3000
   ```

   This will display the demo application locally.

### Notes

- If you encounter any issues, make sure all dependencies are installed correctly.
- Ensure the `.env.local` file contains valid values for all required environment variables.
- For additional configurations or troubleshooting, refer to the project documentation or consult the project's issue tracker.
