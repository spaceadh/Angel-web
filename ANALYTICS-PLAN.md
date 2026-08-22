# Analytics Implementation Plan for `/connect/alvin`

This plan outlines how to build a robust, custom analytics tracker for the `/connect/alvin` page to capture detailed visitor metrics and send real-time notifications to Telegram.

## 1. What We Will Track (Data Model)
We will create a database table (likely in your existing Supabase project) to store:
*   **Session ID:** A unique ID for the user's visit.
*   **Timestamp:** When they first landed.
*   **IP Address:** The visitor's network address.
*   **Location:** City, Country (derived from IP).
*   **Device/Browser:** Parsed from the User Agent (e.g., Chrome on Windows, Safari on iOS).
*   **Time on Page (Duration):** Continuously updated in seconds.
*   **Interaction Events (Optional):** Scrolling depth, clicks on key links.

## 2. Real-Time Telegram Notifications
We will integrate a Telegram bot to send a single, comprehensive real-time alert.
*   **Session Summary Alert:** When the session ends (triggered by the exit beacon), send a single message containing the visitor's location, browser, IP, and the total time they spent on the page.

## 3. Frontend Implementation: The Tracker Hook
We will build a custom React hook (e.g., `usePageAnalytics.ts`) to be included in `ConnectPageContent.tsx`.
*   **Initialization:** On mount, it generates a unique session ID and captures browser info.
*   **Heartbeat/Ping Mechanism:** It will send a small background request (a "ping") every few seconds (e.g., every 5s) to update the backend on how long the user has been viewing the page.
*   **Exit Tracking:** It will use `navigator.sendBeacon()` and listen to the `visibilitychange` and `beforeunload` events to ensure we capture the exact moment they close the tab or switch away. To evade ad-blockers, we will name the API endpoint something inconspicuous (e.g., `/api/system/heartbeat` instead of `/api/analytics`).

## 4. Backend Implementation: Next.js API Route
We will create a new API route in `MalaikaWebsite-v2`.
*   **Initial Visit Request:** When a new visit starts, the API will read the `x-forwarded-for` header to get the IP address.
*   **Location Lookup:** We can use Vercel's built-in Edge geolocation headers or a lightweight service like `ip-api` to convert the IP into a City/Country.
*   **Database & Telegram:** Save the initial record to the database, and trigger a Telegram API call (`https://api.telegram.org/bot<TOKEN>/sendMessage`) to notify you.
*   **Update Requests:** When the frontend sends "heartbeats", the API will update the database record for that specific Session ID, incrementing the time spent.

## 5. Database Setup (Supabase)
We will add a new table (e.g., `page_analytics`) to your database to store these records.

```sql
CREATE TABLE page_analytics (
    session_id UUID PRIMARY KEY,
    page_path TEXT NOT NULL,
    ip_address TEXT,
    location_city TEXT,
    location_country TEXT,
    browser TEXT,
    os TEXT,
    device_type TEXT,
    duration_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_ping_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 6. Execution Steps
1.  **Step 1:** Create the Supabase table.
2.  **Step 2:** Set up a Telegram Bot via BotFather and get the Bot Token and your Chat ID. Add these to `.env`.
3.  **Step 3:** Create the Next.js API route to handle incoming data, resolve IPs, save to DB, and send Telegram alerts.
4.  **Step 4:** Create the client-side `usePageAnalytics` hook.
5.  **Step 5:** Integrate the hook into `app/connect/alvin/ConnectPageContent.tsx`.
6.  **Step 6:** Test the flow and verify Telegram messages and DB updates.
