import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Supplies a predictable reviewer account and populated-notes state.
// Upsert and the count check make repeated `npm run db:seed` calls safe.
async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@notes.local" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@notes.local",
      passwordHash: await hash("DemoPassword123!", 12),
    },
  });

  if ((await prisma.note.count({ where: { userId: user.id } })) === 0) {
    await prisma.note.createMany({
      data: [
        { userId: user.id, title: "Product ideas", content: "Capture the next set of product improvements." },
        { userId: user.id, title: "Weekly planning", content: "Plan priorities and team updates for the week." },
        { userId: user.id, title: "Reading list", content: "Books and articles to read later this year." },
      ],
    });
  }
}

main().finally(() => prisma.$disconnect());
