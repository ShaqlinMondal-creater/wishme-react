export type DemoCustomerRow = {
  id: number
  name: string
  email: string
  mobile: string
  plan: string
  wishes: number
  status: 'Active' | 'Inactive'
  joined: string
}

export type DemoWishRow = {
  id: string
  title: string
  customer: string
  recipient: string
  template: string
  status: 'Published' | 'Draft' | 'Scheduled'
  opens: string
}

export const demoAdminStats = {
  customers: 128,
  wishes: 86,
  published: 41,
  openLinks: 9,
}

export const demoAdminCustomers: DemoCustomerRow[] = [
  {
    id: 101,
    name: 'Arjun Mehta',
    email: 'arjun@wishme.demo',
    mobile: '+91 98765 43210',
    plan: 'Signature',
    wishes: 2,
    status: 'Active',
    joined: '12 Aug 2026',
  },
  {
    id: 102,
    name: 'Kabir Shah',
    email: 'kabir@wishme.demo',
    mobile: '+91 98200 11422',
    plan: 'Keepsake',
    wishes: 1,
    status: 'Active',
    joined: '4 Sep 2026',
  },
  {
    id: 103,
    name: 'Meera Iyer',
    email: 'meera@wishme.demo',
    mobile: '+91 98111 77890',
    plan: 'WishMe+',
    wishes: 3,
    status: 'Active',
    joined: '21 Jul 2026',
  },
  {
    id: 104,
    name: 'Sana Qureshi',
    email: 'sana@wishme.demo',
    mobile: '+91 99000 22661',
    plan: 'Signature',
    wishes: 0,
    status: 'Inactive',
    joined: '2 Jun 2026',
  },
]

export const demoAdminWishes: DemoWishRow[] = [
  {
    id: 'w-midnight',
    title: 'Midnight Toast',
    customer: 'Arjun Mehta',
    recipient: 'Riya',
    template: 'Midnight Toast',
    status: 'Published',
    opens: 'Open 72 hours',
  },
  {
    id: 'w-ananya',
    title: 'For Ananya',
    customer: 'Kabir Shah',
    recipient: 'Ananya',
    template: 'Golden Hour',
    status: 'Draft',
    opens: 'Not published',
  },
  {
    id: 'w-aarav',
    title: 'Rakhi for Aarav',
    customer: 'Meera Iyer',
    recipient: 'Aarav',
    template: 'Sacred Thread',
    status: 'Scheduled',
    opens: '14 Aug · 09:00',
  },
  {
    id: 'w-letter',
    title: 'A letter at dusk',
    customer: 'Meera Iyer',
    recipient: 'Amma',
    template: 'Quiet Letter',
    status: 'Published',
    opens: 'Closed',
  },
]
