## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Schema evolution

edit schema in `dbschema/default.esdl`
create migration: `edge migration create`
apply migration: `edge migrate`

generate the typescript files for the edgedb schema:

```bash
npx @edgedb/generate edgeql-js
```
