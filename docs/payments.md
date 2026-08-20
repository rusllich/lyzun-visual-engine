# MORPH payments

MORPH supports two direct-client payment providers at the architecture level:

- NOWPayments for crypto checkout.
- Payoneer Checkout for hosted card/local-method checkout once the MORPH Payoneer Checkout merchant environment is activated and credentials are issued.

## Server-only environment

NOWPayments:

```text
NOWPAYMENTS_API_KEY=
NOWPAYMENTS_IPN_SECRET=
```

Payoneer Checkout:

```text
PAYONEER_MERCHANT_CODE=
PAYONEER_PAYMENT_TOKEN=
PAYONEER_STORE_CODE=
PAYONEER_LIST_ENDPOINT=
```

Shared:

```text
SUPABASE_SERVICE_ROLE_KEY=
MORPH_PUBLIC_URL=https://<production-domain>
```

`PAYONEER_LIST_ENDPOINT` is intentionally environment-provided rather than hardcoded. Payoneer issues separate test/live merchant credentials and the production Checkout endpoint must match the activated merchant environment.

## Rules

- Never prefix provider secrets with `NEXT_PUBLIC_`.
- Checkout creation is owner/admin authenticated.
- NOWPayments IPN is accepted only after `x-nowpayments-sig` HMAC-SHA512 verification.
- Payoneer uses server-side HTTPS Basic authentication with merchant code + payment token; credentials never enter browser code.
- Payoneer hosted checkout is based on a server `LIST` payment session and the returned `redirect.url`.
- Verified deposit changes the project payment state to `deposit_paid`.
- Verified final balance changes it to `paid_in_full`.
- Payment verification does not automatically transfer ownership; owner approval remains a separate release gate.
- Refunds, payouts and transfers are not implemented as autonomous actions.
