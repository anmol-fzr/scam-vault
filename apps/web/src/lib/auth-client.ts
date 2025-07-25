import { createAuthClient } from "better-auth/react";
import { organizationClient, apiKeyClient } from "better-auth/client/plugins"
import { envs } from "@/utils/envs";
import type { Organization as Org } from 'better-auth/plugins/organization'

interface Organization extends Org {
  logo: string
}

export const authClient = createAuthClient({
  baseURL: envs.SERVER_URL,
  plugins: [
    organizationClient(),
    apiKeyClient()
  ]
});

const {
  signOut, signIn,
  organization, useListOrganizations, useActiveOrganization,
  apiKey
} = authClient

export {
  signIn, signOut,
  organization, useListOrganizations, useActiveOrganization,
  apiKey
}

export type { Organization }
