import { defineAuth, secret} from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    // Disable email/password and other providers
    email: true,
    // phone: false,
    // Configure OIDC provider for your university SSO
    externalProviders: {
      // google: {
      //   clientId: secret('GOOGLE_CLIENT_ID'),
      //   clientSecret: secret('GOOGLE_CLIENT_SECRET')
      // },
      oidc: [{
        name: 'GeorgiaTech',
        issuerUrl: 'https://sso.gatech.edu/cas/oidc',
        clientId: secret('GT_AUTH_CLIENT_ID'),
        clientSecret: secret('GT_AUTH_CLIENT_SECRET'),
        scopes: ['openid', 'profile', 'email'], // Adjust scopes as needed
        attributeMapping: {
          email: 'email',
          fullname: 'name',
          preferredUsername: 'preferred_username',
          givenName: 'given_name',
          familyName: 'family_name',
          // 'custom:gtAccountEntitlement': 'gtAccountEntitlement',
          // 'custom:gtPersonEntitlement': 'gtPersonEntitlement',
          // 'custom:gtEmplid': 'gtEmplid',
          // 'custom:group': 'group',
          // 'custom:upn': 'upn',
          // 'custom:gtEntitlement': 'gtEntitlement',
        },
      }],
      callbackUrls: [
        'https://signinwithredirect.d30y0c69e47spg.amplifyapp.com/',
        'http://localhost:5173/',
      ],
      logoutUrls: [
        'https://signinwithredirect.d30y0c69e47spg.amplifyapp.com/',
        'http://localhost:5173/',
      ],
    },
  },
});
