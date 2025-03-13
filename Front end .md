Step 1: Update Your System

sudo apt update && sudo apt upgrade -y

Step 2: Install Node.js and npm

You can install Node.js and npm using the following command:

sudo apt install nodejs npm -y

Step 3: Verify Installation

After installation, check if Node.js and npm are properly installed:

node -v
npm -v

You should see version numbers printed on the terminal.
Step 4: Install nvm (Recommended)

Ubuntu’s default Node.js version might be outdated. To install the latest version, use Node Version Manager (nvm):

curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc

Then, install the latest Node.js version:

nvm install --lts
nvm use --lts

Verify:

node -v
npm -v

Step 5: Proceed with Frontend Setup

Once Node.js and npm are installed, follow these steps to set up your frontend:

npx create-next-app@latest bike-service-frontend
cd bike-service-frontend
npm install axios tailwindcss @shadcn/ui
npx tailwindcss init -p
npm run dev

Then, open your browser and go to:
➡ http://localhost:3000



npx create-react-app bestservice-frontend
cd bestservice-frontend
npm install axios react-router-dom
npm start
