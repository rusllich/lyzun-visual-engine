# MORPH payments

Server-only environment variables required for NOWPayments:

```text
NOWPAYMENTS_API_KEY=
NOWPAYMENTS_IPN_SECRET=
SUPABASE_SERVICE_ROLE_KEY=
MORPH_PUBLIC_URL=https://<production-domain>
```

Rules:

- Never prefix these secrets with `NEXT_PUBLIC_`.
- Invoice creation is owner/admin authenticated.
- NOWPayments IPN is accepted only after `x-nowpayments-sig` HMAC-SHA512 verification.
- Verified deposit changes the project payment state to `deposit_paid`.
- Verified final balance changes it to `paid_in_full`.
- Payment verification does not automatically transfer ownership; owner approval remains a separate release gate.
- Refunds, payouts and transfers are not implemented as autonomous actions.
