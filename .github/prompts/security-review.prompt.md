---
mode: ask
description: "Security review for API endpoints"
---

Lakukan security review pada API ini:

1. **Authentication** — JWT validation? Token expiry? Refresh token flow?
2. **Authorization** — Ownership check? Permission enforcement?
3. **Input Validation** — Semua input divalidasi? Ada whitelist?
4. **SQL Injection** — Parameterized query? ORM usage?
5. **Sensitive Data** — Password hash? Credential exposure? Log exposure?
6. **Rate Limiting** — Ada di auth endpoints? DOS protection?
7. **HTTPS/TLS** — Production harus HTTPS? Redirect HTTP?

Format output:
- 🔴 **Critical** — security risk, block until fixed
- 🟡 **High** — penting untuk production
- 🟢 **Medium/Low** — nice to have
