CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(256) NOT NULL,
	`description` text NOT NULL,
	`parent_category-id` integer,
	FOREIGN KEY (`parent_category-id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `scam` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(256) NOT NULL,
	`description` text NOT NULL,
	`category` text(100) NOT NULL,
	`reported_at` text DEFAULT (CURRENT_TIMESTAMP),
	`source_url` text(512),
	`region` text(100),
	`is_verified` integer DEFAULT false,
	`submitted_by` text(256),
	`reviewed_by` text(256),
	`notes` text
);
