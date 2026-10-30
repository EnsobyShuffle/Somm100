CREATE TABLE `checkins` (
	`user_id` text NOT NULL,
	`check_date` text NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `check_date`)
);
--> statement-breakpoint
CREATE TABLE `learning_settings` (
	`user_id` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `learning_videos` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`topic` text NOT NULL,
	`platform` text NOT NULL,
	`creator` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `study_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`study_date` text NOT NULL,
	`seconds` integer NOT NULL,
	`updated_at` text NOT NULL
);
