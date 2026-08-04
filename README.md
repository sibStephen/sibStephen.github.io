# Sibu Stephen Portfolio — React

Modern React/Vite portfolio for `https://sibustephen.me`.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The optimized site is generated in `dist/`.

## GitHub Pages deployment

This project includes a GitHub Actions workflow that builds and publishes the Vite output. In the repository settings, set **Pages → Source** to **GitHub Actions**. The custom domain is preserved through `public/CNAME`.

## Editing content

Most portfolio content is stored in `src/data/portfolio.js`.

AI-discovery and indexing files are stored in `public/`, including:

- `.well-known/ai-catalog.json`
- `llms.txt`
- `llms-full.txt`
- `profile.json`
- `robots.txt`
- `sitemap.xml`

## July 2026 portfolio update

The React source now includes the profile imagery, Medium and social links, education, and licenses/certifications. After extracting the project, run:

```bash
npm install
npm run dev
```

For production:

```bash
npm run build
```
## Compiled version and where the code live and deployment script lives - 

Branch master = source code                                      
Branch gh-pages = live compiled site

## Deploying to gh-pages

After code is pushed to master, run the following code to publish youir changes  -

npm run build
npx gh-pages -d dist
 
The generated site will be placed in `dist/`.
