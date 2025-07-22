import { Hono } from "hono";

// הגדרת ממשק ה-Environment שכולל את ה-SECRET
interface Env {
  FirebaseAPI: string; // ה-SECRET שיצרת
}

const app = new Hono<{ Bindings: Env }>();

// נתיב קיים
app.get("/api/", (c) => c.json({ name: "michi" }));

// נתיב חדש להצגת ה-SECRET
app.get("/api/secret", (c) => {
  const firebaseApiKey = c.env.FirebaseAPI;
  
  // בדיקה אם ה-SECRET קיים
  if (!firebaseApiKey) {
    return c.json({ error: "FirebaseAPI secret not found" }, 404);
  }
  
  // הצגת ה-SECRET (זהירות - רק לצורכי פיתוח!)
  return c.json({ 
    message: "Firebase API Key retrieved successfully",
    firebaseApiKey: firebaseApiKey,
    // אלטרנטיבה בטוחה יותר - הצגה חלקית
    // firebaseApiKey: firebaseApiKey.substring(0, 10) + "..."
  });
});

// נתיב בטוח יותר שמציג רק חלק מה-SECRET
app.get("/api/secret-safe", (c) => {
  const firebaseApiKey = c.env.FirebaseAPI;
  
  if (!firebaseApiKey) {
    return c.json({ error: "FirebaseAPI secret not found" }, 404);
  }
  
  return c.json({ 
    message: "Firebase API Key (partial)",
    keyPreview: firebaseApiKey.substring(0, 10) + "...",
    keyLength: firebaseApiKey.length
  });
});

export default app;
