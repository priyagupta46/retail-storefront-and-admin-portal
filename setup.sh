#!/bin/bash

# Retail System Setup Script for macOS/Linux

echo ""
echo "========================================"
echo "  RetailHub - Full-Stack Setup"
echo "========================================"
echo ""

echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Backend installation failed!"
    exit 1
fi
cd ..

echo ""
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Frontend installation failed!"
    exit 1
fi
cd ..

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Seed the database:"
echo "   cd backend && npm run seed"
echo ""
echo "2. Start the backend (in one terminal):"
echo "   cd backend && npm run dev"
echo ""
echo "3. Start the frontend (in another terminal):"
echo "   cd frontend && npm start"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "Default Admin Credentials:"
echo "  Email: admin@retail.com"
echo "  Password: admin123"
echo ""
