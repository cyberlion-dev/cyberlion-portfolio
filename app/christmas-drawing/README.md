# Christmas Drawing App - Family Gift Exchange 🎄

A React-based web app for managing annual family gift exchanges with AWS cloud storage.

## Features

- Password-protected family access
- Random gift assignment algorithm
- Prevents self-assignments
- Avoids duplicate pairings from past 2 years
- Reveal/hide assignments individually
- Lock/unlock years to prevent accidental deletion
- Full history tracking
- **Cloud sync via AWS** - everyone sees the same drawing!

## Family Members

1. Nicole & Kevin
2. Nathan & Alicia
3. Brittany & Jose
4. Jordan & Emily
5. Chris & Stephanie
6. Zach & Jess

## Architecture

```
Frontend (React/Next.js)
    ↓
Firebase Hosting (Static)
    ↓
AWS API Gateway (REST API)
    ↓
AWS Lambda (Node.js)
    ↓
AWS S3 (JSON Storage)
```

## Setup Instructions

### Option 1: Follow the Guides (Recommended)

1. **First:** Read `AWS_SETUP_GUIDE.md` to set up AWS infrastructure
2. **Then:** Follow `DEPLOYMENT_GUIDE.md` to test and deploy

### Option 2: Quick Start (LocalStorage Mode)

Want to test without AWS first?

1. Open `page.tsx`
2. Change: `const USE_API = true` to `false`
3. Run: `npm run dev`
4. Navigate to: `http://localhost:3000/christmas-drawing`
5. Password: `cyberlion2024`

This will use browser localStorage instead of AWS (data won't sync between devices).

## File Structure

```
app/christmas-drawing/
├── page.tsx              # Main React component
├── api-config.ts         # API configuration
├── lambda/               # AWS Lambda function
│   ├── index.js          # Lambda handler
│   └── package.json      # Lambda dependencies
└── README.md             # This file

AWS_SETUP_GUIDE.md        # Step-by-step AWS setup
DEPLOYMENT_GUIDE.md       # Testing & deployment guide
```

## How It Works

1. **Password Authentication:** Simple password check (`cyberlion2024`)
2. **Generate Drawing:** Admin generates random assignments
3. **Algorithm:**
   - Creates circular gift-giving (A→B→C→...→Z→A)
   - No self-assignments
   - Avoids duplicates from last 2 years
   - Max 1000 attempts to find valid assignment
4. **Storage:** Saves to AWS S3 via Lambda API
5. **Sync:** All family members see the same drawing
6. **Reveal:** Each person can reveal assignments individually (local state)

## AWS Resources Created

- **S3 Bucket:** `christmas-drawing-data` (or your custom name)
- **Lambda Function:** `ChristmasDrawingAPI`
- **API Gateway:** `ChristmasDrawingAPI` (REST API)
- **IAM Role:** `ChristmasDrawingLambdaRole`

## Costs

Everything runs on AWS Free Tier:
- Lambda: 1M requests/month free
- API Gateway: 1M requests/month free (first 12 months)
- S3: 5GB storage, 20K GET requests/month free

**Expected cost:** $0/month for this use case 🎉

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## Configuration

### Change Password

Edit `page.tsx` line 52:
```typescript
const PASSWORD = "cyberlion2024"; // Change this
```

### Add/Remove Families

Edit `page.tsx` lines 42-49:
```typescript
const FAMILIES = [
  "Nicole & Kevin",
  // Add or remove families here
];
```

### Toggle API vs localStorage

Edit `page.tsx` line 53:
```typescript
const USE_API = true; // false = localStorage, true = AWS API
```

## Troubleshooting

### CORS Errors
- Make sure CORS is enabled in API Gateway
- Redeploy API after CORS changes

### 404 Errors
- Check API URL in `api-config.ts`
- Verify `/drawing` resource exists in API Gateway

### 500 Errors
- Check Lambda CloudWatch logs
- Verify environment variables (S3_BUCKET_NAME, AWS_REGION)
- Verify IAM role has S3 permissions

### Data Not Syncing
- Verify `USE_API = true` in `page.tsx`
- Check browser console for API errors
- Verify S3 bucket has `christmas-drawing-history.json`

## Security

- Password is hardcoded (fine for family use)
- CORS should be locked to your domain in production
- S3 bucket is private (Lambda access only)
- No sensitive data stored

## Future Ideas

- Email notifications with assignments (AWS SES)
- AWS Cognito authentication
- Gift budget tracking
- Wish list management
- Mobile app (React Native)

## Learn More

- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda/)
- [API Gateway Docs](https://docs.aws.amazon.com/apigateway/)
- [S3 Docs](https://docs.aws.amazon.com/s3/)
- [Next.js Docs](https://nextjs.org/docs)

---

Made with ❤️ for the Boyce Family

Password: `cyberlion2024` (Ask Jordan!)
