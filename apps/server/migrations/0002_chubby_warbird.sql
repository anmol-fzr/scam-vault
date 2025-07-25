PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_scam` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(256) NOT NULL,
	`description` text NOT NULL,
	`category` integer NOT NULL,
	`reported_at` text DEFAULT (CURRENT_TIMESTAMP),
	`reported_by` text(256),
	`source_url` text(512),
	`region` text(100),
	`is_verified` integer DEFAULT false,
	`reviewed_by` text(256),
	`notes` text,
	FOREIGN KEY (`category`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reported_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_scam`("id", "title", "description", "category", "reported_at", "reported_by", "source_url", "region", "is_verified", "reviewed_by", "notes") SELECT "id", "title", "description", "category", "reported_at", "reported_by", "source_url", "region", "is_verified", "reviewed_by", "notes" FROM `scam`;--> statement-breakpoint
DROP TABLE `scam`;--> statement-breakpoint
ALTER TABLE `__new_scam` RENAME TO `scam`;--> statement-breakpoint
PRAGMA foreign_keys=ON;