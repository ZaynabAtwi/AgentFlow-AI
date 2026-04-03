const memoryStore = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(key: string, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const current = memoryStore.get(key);

  if (!current || current.expiresAt < now) {
    memoryStore.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  memoryStore.set(key, current);
  return { allowed: true, remaining: limit - current.count };
}
