import { BetterAuthOptions } from 'better-auth';
import { apiKey, organization, admin, openAPI, bearer } from "better-auth/plugins"

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const betterAuthOptions: BetterAuthOptions = {
  /**
   * The name of the application.
   */
  appName: 'scam-vault-api',
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  // emailAndPassword: {
  //   enabled: true,
  //   requireEmailVerification: false,
  // },
  // user: {
  //   changeEmail: {
  //     enabled: true,
  //   }
  // },
  plugins: [
    bearer(),
    openAPI(),
    admin(),
    organization(),
    apiKey({
      apiKeyHeaders: ["sv-api-key"],
      rateLimit: {
        enabled: true,
        timeWindow: 1000 * 60 * 60 * 24, // 1 day
        maxRequests: 1000, // 1000 requests per day
      },
    })
    // phoneNumber({
    //   allowedAttempts: 3,
    //   sendOTP: ({ phoneNumber, code }) => {
    //     console.info({ phoneNumber, code })
    //   },
    //   signUpOnVerification: {
    //     getTempEmail: (phoneNumber) => phoneNumber,
    //     getTempName: (phoneNumber) => phoneNumber
    //   }
    // })
  ],
};
