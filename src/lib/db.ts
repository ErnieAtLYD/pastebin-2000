import { kv } from "@vercel/kv";
import { Paste } from "@/types/paste";

interface DbUser {
  username: string;
  password: string;
}

export { kv };

// Helper functions for common operations
export async function createPaste(
  id: string,
  content: string,
  expiresAt: string | null,
  userId: string | null,
  isPrivate: boolean
) {
  await kv.hset(`paste:${id}`, {
    content,
    created_at: Date.now(),
    expires_at: expiresAt,
    user_id: userId,
    is_private: isPrivate,
  });

  if (expiresAt) {
    await kv.expireat(
      `paste:${id}`,
      Math.floor(new Date(expiresAt).getTime() / 1000)
    );
  }

  await kv.zadd("pastes_by_date", { score: Date.now(), member: id });
}


export async function getPaste(id: string) {
  return kv.hgetall(`paste:${id}`) as Promise<Paste | null>;
}

export async function getRecentPastes(limit: number) {
  const pasteIds = (await kv.zrange("pastes_by_date", 0, limit - 1, {
    rev: true,
  })) as string[];
  const pastes = await Promise.all(
    pasteIds.map(async (id) => {
      const paste = await getPaste(id);
      if (!paste) return null;
      return { ...paste, preview: paste.content.substring(0, 100) };
    })
  );
  return pastes.filter(
    (paste): paste is NonNullable<typeof paste> =>
      paste !== null && !paste.is_private
  );
}

export async function createUser(username: string, hashedPassword: string) {
  await kv.hset(`user:${username}`, {
    username,
    password: hashedPassword,
  });
}

export async function getUser(username: string): Promise<DbUser | null> {
  return kv.hgetall(`user:${username}`) as Promise<DbUser | null>;
}
