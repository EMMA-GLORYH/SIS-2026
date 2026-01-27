// app/types/service.ts

export interface Service {
  /** The display title of the service */
  title: string;

  /** Short description of the service for overview cards */
  description: string;

  /** URL slug for routing (used in /services/[slug]) */
  slug: string;

  //Option color for cards
  accentColor?:string;
}
