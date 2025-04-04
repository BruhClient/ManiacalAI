CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"summary" text NOT NULL,
	"content" text,
	"userId" text NOT NULL,
	"pdfUrl" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "plan" "user_role" DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "projectsLeft" integer DEFAULT 4 NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;