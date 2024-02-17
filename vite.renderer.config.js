// Module imports
import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import sassDts from 'vite-plugin-sass-dts'





export default defineConfig({
	publicDir: path.resolve(process.cwd(), 'public'),
	plugins: [
		sassDts(),
		react({ include: /\.jsx$/u }),
	],
})
