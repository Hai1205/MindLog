import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/ /g, '-') // Replace spaces with hyphens
        .replace(/[^\w-]+/g, ''); // Remove all non-word characters
}

async function main() {
    const defaultPassword = await hash('123');

    await prisma.like.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.tag.deleteMany({});
    await prisma.user.deleteMany({});

    const users = await Promise.all(
        Array.from({ length: 10 }).map(async () => {
            return await prisma.user.create({
                data: {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    bio: faker.lorem.sentence(),
                    avatar: faker.image.avatar(),
                    password: defaultPassword,
                }
            });
        })
    );

    const userIds = users.map(user => user.id);

    for (let i = 0; i < 50; i++) {
        const title = faker.lorem.sentence();
        await prisma.post.create({
            data: {
                title: title,
                slug: generateSlug(title),
                content: faker.lorem.sentences(2),
                thumbnail: faker.image.urlLoremFlickr({ height: 240, width: 320 }),
                published: true,
                authorId: userIds[Math.floor(Math.random() * userIds.length)],
                comments: {
                    createMany: {
                        data: Array.from({ length: 5 }).map(() => ({
                            content: faker.lorem.sentence(),
                            authorId: userIds[Math.floor(Math.random() * userIds.length)],
                        })),
                    },
                },
            },
        });
    }

    console.log('Seeding completed');
}

main()
    .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        prisma.$disconnect();
        process.exit(0);
    })
    .catch((e) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        prisma.$disconnect();
        console.error(e);
        process.exit(1);
    });

// run command: npx run db:seed