import { Hono } from "hono";

type Env = {
  Bindings: {
    FirebaseAPI: string;
  };
};

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => {
  const firebaseAPI = c.env.FirebaseAPI;
  return c.json({ name: firebaseAPI });
});

export default app;
