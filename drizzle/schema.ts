import { pgTable, text, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    category: text("category").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});