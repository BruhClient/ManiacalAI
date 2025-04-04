CREATE TYPE "public"."user_plan" AS ENUM('free', 'basic', 'premium');--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "plan" SET DATA TYPE user_plan;