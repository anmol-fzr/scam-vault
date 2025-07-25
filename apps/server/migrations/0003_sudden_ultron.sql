ALTER TABLE `scam` RENAME COLUMN "category" TO "category_id";--> statement-breakpoint
DROP INDEX "session_token_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
DROP INDEX "user_phone_number_unique";--> statement-breakpoint
ALTER TABLE `scam` ALTER COLUMN "reported_at" TO "reported_at" text;--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_phone_number_unique` ON `user` (`phone_number`);--> statement-breakpoint
ALTER TABLE `scam` ALTER COLUMN "category_id" TO "category_id" integer NOT NULL REFERENCES category(id) ON DELETE no action ON UPDATE no action;