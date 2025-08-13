# WhatsApp Business API Integration Setup

This guide explains how to set up the WhatsApp Business API integration using Meta's Cloud API.

## Prerequisites

1. **Meta Business Account** - Create at [business.facebook.com](https://business.facebook.com)
2. **WhatsApp Business Account** - Add WhatsApp product to your Meta Business account
3. **Facebook App** - Create a new app in the Meta Developers dashboard
4. **WhatsApp Business Phone Number** - Verified business phone number

## Step 1: Meta Business Setup

### 1.1 Create Facebook App
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create a new app → Business → App Name: "Pisos Pró WhatsApp"
3. Add WhatsApp product to your app

### 1.2 WhatsApp Business API Setup
1. In your app dashboard, go to WhatsApp → Getting Started
2. Add your business phone number
3. Verify the phone number via SMS/call
4. Note down your:
   - **Phone Number ID**
   - **Business Account ID**
   - **Temporary Access Token**

### 1.3 Generate Permanent Access Token
1. Go to WhatsApp → Configuration
2. Create a System User in your Business Manager
3. Generate a permanent access token with `whatsapp_business_messaging` permissions

## Step 2: Environment Configuration

Add these variables to your `.env` file:

```bash
# WhatsApp Business API Configuration
WHATSAPP_ACCESS_TOKEN=your_permanent_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_custom_verify_token
WHATSAPP_APP_SECRET=your_app_secret

# Optional: OpenAI for AI features
OPENAI_API_KEY=your_openai_api_key

# Redis for conversation state (optional, uses memory if not provided)
REDIS_URL=redis://localhost:6379
```

## Step 3: Webhook Configuration

### 3.1 Set Webhook URL
1. In WhatsApp → Configuration
2. Set Webhook URL: `https://your-domain.com/api/whatsapp/webhook`
3. Set Verify Token: Use the same value as `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
4. Subscribe to webhook fields:
   - `messages`
   - `message_deliveries` (optional)
   - `message_reads` (optional)

### 3.2 Webhook Verification
Your webhook will be automatically verified when you save the configuration.

## Step 4: Database Setup

Run the Prisma migration to create WhatsApp tables:

```bash
npx prisma migrate dev --name add-whatsapp-integration
npx prisma generate
```

## Step 5: Testing

### 5.1 Test Webhook
1. Send a message to your WhatsApp Business number
2. Check your application logs for webhook events
3. Verify messages are saved in the database

### 5.2 Test Chatbot Flow
1. Start a conversation with your business number
2. Follow the chatbot prompts
3. Complete a quote request flow
4. Check the admin dashboard at `/admin/whatsapp`

## Step 6: Message Templates (Optional)

For marketing messages outside the 24-hour window, create message templates:

1. Go to WhatsApp → Message Templates
2. Create templates for:
   - Welcome messages
   - Quote confirmations
   - Follow-up messages

## Chatbot Features

### Main Menu Options
- 📋 Request Quote
- 🏠 View Services  
- 📸 View Portfolio
- 💬 Talk to Human
- ❓ FAQ

### Quote Collection Flow
1. **Project Type Selection** - Interactive list menu
2. **Room Size Input** - Natural language processing
3. **Timeline Selection** - Button options
4. **Budget Range** - List menu selection
5. **Photo Upload** - Optional media handling
6. **Contact Information** - Name and email collection
7. **Quote Generation** - Automatic quote creation in database

### Advanced Features
- Natural language understanding
- Media file handling (photos, documents)
- Conversation state management
- Human handoff capability
- Admin dashboard for conversation management
- Integration with existing quote system

## Admin Dashboard

Access the WhatsApp admin dashboard at:
- `/admin/whatsapp` - List all conversations
- `/admin/whatsapp/[id]` - View individual conversation details

## API Endpoints

- `POST /api/whatsapp/webhook` - Receive WhatsApp webhooks
- `GET /api/whatsapp/webhook` - Webhook verification
- `POST /api/whatsapp/send` - Send messages programmatically

## Troubleshooting

### Common Issues

1. **Webhook Not Working**
   - Verify your webhook URL is accessible via HTTPS
   - Check that verify token matches exactly
   - Ensure your server responds with 200 status

2. **Messages Not Sending**
   - Verify access token permissions
   - Check phone number ID is correct
   - Ensure recipient number is in correct format (+country code)

3. **Database Errors**
   - Run `npx prisma generate` after schema changes
   - Verify DATABASE_URL connection string
   - Check that migrations have been applied

### Debug Mode
Add these logs to debug webhook events:

```typescript
console.log('Webhook payload:', JSON.stringify(body, null, 2))
```

## Production Considerations

1. **Rate Limits** - Meta enforces rate limits on API calls
2. **Message Templates** - Required for messages outside 24-hour window
3. **Business Verification** - Complete Meta Business verification for higher limits
4. **Error Handling** - Implement robust error handling and retry logic
5. **Monitoring** - Set up monitoring for webhook failures and API errors

## Support

For issues with this integration:
1. Check Meta Developer documentation
2. Review WhatsApp Business API guidelines
3. Test with Meta's webhook testing tools
4. Monitor application logs for errors