import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import preprocess from 'svelte-preprocess';
import replace from "@rollup/plugin-replace";
const production = !process.env.ROLLUP_WATCH;

const packageJson = require('./package.json');

/* https://stackoverflow.com/a/68725785/680372 */
const warnIgnores = {
  'css-unused-selector': {
    capture: /.*"(.*)"$/,
    ignore: [
      /* Highlight */
      /^\.highlight/,

      /* Grid */
      /^\.pad\d+/,
      /^\.sm\d+/,
      /^\.md\d+/,
      /^\.lg\d+/,
      /^\.xg\d+/,
      /^\.all\d+/,
      /^\.row(::after)?/,
      
      /* Elements */
      /^span/,
      /^textarea/,
      /^(a|p|button)[:]/,
      /^(body|html|a|p|pre|nav|div|iframe|button|label||code|ul|li|ol)$/,
      /^(table|thead|tfoot|tbody|td|th|tr)$/,
      /^(form|fieldset)$/,
      /^h[1-6]/,
      /^(a|button) svg$/,
    ]
  }
};


function serve() {
	let server = null;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server !== null) return;
			server = require('child_process').spawn('./server.py', {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});
    
			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
      preprocess: preprocess({
        sass: {
          sourceMap: !production,
          prependData: `@import './styles/global.sass';`
        }
      }),
      // Explicitely ignore warnings
      onwarn: (warning, handler) => {
        const { message, code } = warning;
        const patterns = warnIgnores[code];
        if (patterns != undefined) {
          /* Find the meat. */
          const meat = message.match(patterns.capture);
          if (meat != null) {
            for (var i = 0; i < patterns.ignore.length; i++) {
              if (meat[1].match(patterns.ignore[i]) != null) {
                return;
              }
            }
          }
        }
        handler(warning);
      },
    }),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
   
    // In gh-pages environment, router should offset paths by basePath.
    replace({
      preventAssignment: true,
      basePath: '', 
      appVersion: packageJson.version 
    }),
	],
	watch: {
		clearScreen: false
	}
};
