const { cpSync, copyFileSync } = require('fs');
const { resolve, join } = require('path');

const arguments = process.argv.slice(2);
if (arguments[0] !== '-d' && arguments.length < 2) {
	console.error('wrong arguments -d destination path');
	process.exit(1);
}

const destination = resolve(arguments[1]);
console.log('copy main into', destination);
copyFileSync(join(__dirname, '..', 'main.js'), join(destination, 'main.js'));
console.log('copy ui-overlay', destination);
cpSync(join(__dirname, '..', 'src', 'ui-overlay', 'dist'), join(destination, 'ui'), {recursive: true});
