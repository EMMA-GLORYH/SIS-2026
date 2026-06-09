export function getSupportEmails() {
  return process.env.NEXT_PUBLIC_SUPPORT_EMAILS
    ? process.env.NEXT_PUBLIC_SUPPORT_EMAILS.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean)
    : [];
}

export function isSupportUser(email?: string | null) {
  return !!email && getSupportEmails().includes(email.toLowerCase());
}
