# Quick Start Checklist

## ✅ Complete Setup in 5 Minutes

Follow these steps to get the application running:

### Terminal 1: Database Setup
```powershell
cd backend
npm install
npm run seed
npm run dev
```
✅ Backend running on http://localhost:5000

### Terminal 2: Frontend Start
```powershell
cd frontend
npm install
npm start
```
✅ Frontend running on http://localhost:3000

### Terminal 3: Testing (Optional)
```
# Test API
curl http://localhost:5000/api/health
# Should return: {"status":"ok"}
```

## 🎯 Quick Test Scenarios

### Customer Journey (2 min)
1. [ ] Go to http://localhost:3000
2. [ ] Search for "Headphones"
3. [ ] Click on product
4. [ ] Add 2 to cart
5. [ ] Go to cart
6. [ ] Checkout
7. [ ] Fill form and place order
8. [ ] See success page with Order ID

### Admin Journey (2 min)
1. [ ] Go to http://localhost:3000/admin/login
2. [ ] Email: admin@retail.com
3. [ ] Password: admin123
4. [ ] Click "Dashboard"
5. [ ] View stats and low stock items
6. [ ] Click "Manage Products"
7. [ ] Click "Create Product"
8. [ ] Fill form and save
9. [ ] Click "Manage Orders"
10. [ ] Click "View" on any order
11. [ ] Change status to "Processing"

## 📊 Expected Results

### Database
- ✅ MongoDB database seeded (products, orders, admin users)
- ✅ 8 sample products seeded
- ✅ 1 admin user created
- ✅ 1 sample order created

### Frontend
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth navigation
- ✅ Cart persists in localStorage
- ✅ Admin portal protected with login

### Backend
- ✅ API responses in JSON
- ✅ Authentication working with JWT
- ✅ File upload for product images
- ✅ Stock management working

## 🔑 Important Files

| File | Purpose |
|------|---------|
| backend/src/index.js | Server entry point |
| frontend/src/App.js | React router setup |
| backend/src/seed.js | Database seeding |
| backend/.env | Backend configuration |
| frontend/.env | Frontend API URL |

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| npm not found | Install Node.js from nodejs.org |
| Port 3000 in use | Kill process: npx kill-port 3000 |
| Port 5000 in use | Kill process: npx kill-port 5000 |
| Database error | Clear MongoDB data and reseed |
| CORS error | Check backend is running on 5000 |
| Can't login | Verify admin@retail.com / admin123 |

## 📝 File Locations

### Backend Files
- Controllers: backend/src/controllers/
- Routes: backend/src/routes/
- Database: backend/src/utils/database.js
- Middleware: backend/src/middleware/auth.js
- Uploads: backend/uploads/

### Frontend Files
- Pages: frontend/src/pages/
- Components: frontend/src/components/
- Context: frontend/src/context/CartContext.js
- API: frontend/src/utils/api.js
- Main: frontend/src/App.js

## 🚀 Next Steps

After successful setup:
1. [ ] Change admin password (security)
2. [ ] Add your own product images
3. [ ] Customize styling with Tailwind
4. [ ] Add email notifications
5. [ ] Setup payment integration
6. [ ] Deploy to production

## 💡 Pro Tips

- Use Postman to test API endpoints
- Use React DevTools to debug components
- Use MongoDB Compass to view data
- Check console logs for errors
- Use Tailwind Intellisense extension in VS Code

## 📞 Need Help?

See these files for more info:
- `README.md` - Complete documentation
- `SETUP_GUIDE.md` - Detailed setup guide
- `backend/package.json` - Available scripts
- `frontend/package.json` - Available scripts

---

**You're all set! Happy coding!** 🎉
