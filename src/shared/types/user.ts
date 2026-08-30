export type User = {
  id: number
  name: string
  email: string
  mobile_no: string | null
  role: string
  dob: string | null
  auth_provider: string
  is_active: boolean
  is_loggedin: boolean
}
