# Integrating your application with Kraikub (Sign in with KU)

There are some popular framework examples waiting for you to discover how your application use Sign in with KU with Kraikub.

| Language | Framework | Note |
| -------- | --------- | ---- |
| NodeJS   | NextJS    |      |
| NodeJS   | Express   |      |
| Python   | FastAPI   |      |
| Go       | Gin       |      |

### Claiming tokens with best practices

Claiming tokens such as `access_token` or `id_token` must be
done in a secure environment and with a secure procedure.
These types of token conatain user's sensitive information and
some important permission accesses. So you should know how to claim it sucurely.

When your users completely sign in on Kraikub, we send you a
`authorization_code` back to your `redirect_uri`. The
`authorization_code` is included as a query string in url so
that it can be obtain by the browser. But once you need to
exchange the `authorization_code` for a n`access_token` or an
`id_token`, you SHOULD NOT do it on client-side (frontend).
Because in a token exchange operation, the `secret` need to
be sent and it is too risk to store or bring a `secret` to
the client (frontend). We recommend you to do it on
server-side (backend) only.

If your are using frontend frameworks such as React or
NextJS, please do a Server-Side Rendering (SSR) on the
exchange route(s). In NextJS, you can simply use
`getServerSideProps` to only exchange tokens on the server.

On the other hand, backend framework like Express, FastAPI or
Gin can be done directly on ther server. And once again, you SHOULD NOT leak your `secret` for any reason!
