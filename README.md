# Privacy-Enhanced Email Forwarding with Cloudflare Email Routing

A privacy-focused email forwarding system that works with Cloudflare Email Routing, catch-all feature, and Email Workers. This script gives you access to controled temporary and permanent email addresses, while protecting your primary email from spam and data breaches, as well as abuse of the catch-all feature.

## Features

### 1. Temporary/Expiring Addresses

Create self-expiring email addresses by including an expiration date in the address:

```
anything20240531@yourdomain.org
```

- Automatically forwards emails until May 31, 2024
- Silently drops all emails after the expiration date
- Perfect for:
  - Free trial signups
  - Temporary collaborations
  - One-time purchases
  - Testing services
  - Situations where you want emails to automatically stop after a certain date

### 2. Permanent Forwarding Addresses

Create permanent forwarding addresses with a "passcode" to prevent catch-all abuse:

```
anything99@yourdomain.org
substack99+newsletter@yourdomain.org
```

- Uses a special suffix ("99") to verify legitimate addresses
- Supports the "+" alias feature for better email filtering
- All emails forward to your private address
- Prevents spam through catch-all abuse, requiring your "passcode" to get through

## Benefits

- **Email Isolation**: Each service gets a unique address, making it easy to trace data leaks
- **Temporal Control**: Addresses automatically expire on your schedule
- **Enhanced Privacy**: Your real email address stays completely private
- **Spam Prevention**: Invalid addresses are silently dropped
- **Easy Filtering**: Use the "+" alias feature to organize incoming mail

## Setup Requirements

- Domain configured with Cloudflare account and:
  - Email Routing enabled
  - Catch-all email routing configured
  - Email Workers access
- Destination email address for forwarding

## Installation

1. Set up Email Routing in your Cloudflare dashboard
2. Add and verify the address you intend to forward to
3. Create a new Email Worker
4. Copy, modifiy, and deploy the provided worker code
5. Configure catch-all routing to use your new worker

## Usage Examples

### Temporary Address
```
# For a service you only want emails from until December 31, 2024:
signup20241231@yourdomain.org

# For a 30-day trial starting January 1, 2024:
trial20240131@yourdomain.org
```

### Permanent Address with Filtering
```
# Shopping emails:
shop28@yourdomain.org
shop28+amazon@yourdomain.org
shop28+ebay@yourdomain.org

# Newsletter subscriptions:
news28@yourdomain.org
news28+tech@yourdomain.org
news28+finance@yourdomain.org
```

## Configuration

At the top of the worker code, you'll find configuration variables that need to be customized:

```javascript
// Configuration - Change these values
const VERIFICATION_CODE = "99";      // Your chosen verification code
const DESTINATION_EMAIL = "your-private-email@example.com";
const YOUR_DOMAIN = "yourdomain.com";
```

### Required Changes

1. `VERIFICATION_CODE`: Your chosen pattern for permanent forwarding addresses
   - Default: "99"
   - Example: If set to "99", then `anything99@yourdomain.com` will forward

2. `DESTINATION_EMAIL`: Your private email address where messages will be forwarded
   - Example: `your-private-email@example.com`

3. `YOUR_DOMAIN`: Your Cloudflare-managed domain
   - Example: `yourdomain.com`
