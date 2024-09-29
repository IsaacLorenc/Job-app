import {
  clients_logo_facebook,
  clients_logo_google,
  clients_logo_linkedin,
  clients_logo_youtube,
  logo_facebook,
  logo_twitter,
  logo_instagram,
  logo_google,
  socials_logo_facebook,
  socials_logo_instagram,
  socials_logo_twitter,
} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
    link: "/",
  },
  {
    id: "jobs",
    title: "Jobs",
    link: "/jobs",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: clients_logo_facebook,
    altText: "Facebook Logo",
  },
  {
    id: "client-2",
    logo: clients_logo_google,
    altText: "Google Logo",
  },
  {
    id: "client-3",
    logo: clients_logo_youtube,
    altText: "Youtube Logo",
  },
  {
    id: "client-4",
    logo: clients_logo_linkedin,
    altText: "Linkedin Logo",
  },
];

export const featuredCompanies = [
  {
    id: "company-1",
    logo: logo_facebook,
    title: "Facebook",
    type: "Social Network",
  },
  {
    id: "company-2",
    logo: logo_twitter,
    title: "Twitter",
    type: "Social Network",
  },
  {
    id: "company-3",
    logo: logo_instagram,
    title: "Instagram",
    type: "Social Network",
  },
  {
    id: "company-4",
    logo: logo_google,
    title: "Google",
    type: "Technology",
  },
];

export const socialNav = [
  {
    id: 'social-1',
    title: 'Facebook',
    icon: socials_logo_facebook,
    link: 'http://facebook.com/'
  },
  {
    id: 'social-2',
    title: 'Twitter',
    icon: socials_logo_twitter,
    link: 'http://twitter.com/'
  },
  {
    id: 'social-3',
    title: 'Instagram',
    icon: socials_logo_instagram,
    link: 'http://instagram.com/'
  },
]